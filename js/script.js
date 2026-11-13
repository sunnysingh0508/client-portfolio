const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = [...document.querySelectorAll(".nav-links a")];

function closeMenu() {
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Open navigation");
  navLinks?.classList.remove("is-open");
}

menuToggle?.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  navLinks?.classList.toggle("is-open", !isExpanded);
});

navAnchors.forEach((anchor) => anchor.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const resumeLink = document.querySelector(".resume-link");
resumeLink?.addEventListener("click", () => {
  const downloadLink = document.createElement("a");
  downloadLink.href = resumeLink.href;
  downloadLink.download = "Satyam_Priyanshu_Resume.pdf";
  downloadLink.hidden = true;
  document.body.append(downloadLink);
  downloadLink.click();
  downloadLink.remove();
});

const sections = navAnchors
  .map((anchor) => document.querySelector(anchor.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((anchor) => {
        const active = anchor.getAttribute("href") === `#${entry.target.id}`;
        anchor.classList.toggle("is-active", active);
        if (active) anchor.setAttribute("aria-current", "location");
        else anchor.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-30% 0px -55% 0px", threshold: 0 });
  sections.forEach((section) => sectionObserver.observe(section));
}

const revealElements = document.querySelectorAll(".reveal");
if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-revealed"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
}

document.querySelectorAll(".interest-card").forEach((card) => {
  card.setAttribute("aria-pressed", "false");
  card.addEventListener("click", () => {
    const willSelect = !card.classList.contains("is-selected");
    document.querySelectorAll(".interest-card").forEach((item) => {
      item.classList.remove("is-selected");
      item.setAttribute("aria-pressed", "false");
    });
    card.classList.toggle("is-selected", willSelect);
    card.setAttribute("aria-pressed", String(willSelect));
  });
});

const skillData = {
  programming: {
    title: "Programming",
    description: "Core languages for exploring ideas, working with data and building computational foundations.",
    tags: ["Python", "C / C++", "R Programming"]
  },
  ai: {
    title: "AI & Data Science",
    description: "Tools and concepts for preparing data, visualizing patterns and exploring machine-learning methods.",
    tags: ["Machine Learning", "NumPy", "Pandas", "Matplotlib", "Scikit-learn"]
  },
  genetics: {
    title: "Genetics",
    description: "Foundational life-science concepts that help frame computational questions in biological context.",
    tags: ["Genetics", "Molecular Biology", "Cell Biology", "Biochemistry", "DNA / RNA Structure", "Mendelian Genetics"]
  },
  bioinformatics: {
    title: "Bioinformatics",
    description: "Biological databases and sequence-analysis resources for learning to work with genomic information.",
    tags: ["NCBI", "BLAST", "GenBank", "DNA Sequence Analysis", "Computational Genomics"]
  },
  platforms: {
    title: "Platforms",
    description: "Version control and collaboration tools for organizing code and documenting technical work.",
    tags: ["Git", "GitHub"]
  }
};

const skillTabs = [...document.querySelectorAll(".skill-tab")];
const skillTitle = document.querySelector("#skill-detail-title");
const skillCopy = document.querySelector("#skill-detail-copy");
const skillTags = document.querySelector("#skill-tags");
const skillIndex = document.querySelector(".skill-detail-index");

skillTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const skill = skillData[tab.dataset.skill];
    if (!skill) return;
    skillTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    skillTitle.textContent = skill.title;
    skillCopy.textContent = skill.description;
    skillIndex.textContent = `SKILLSET / ${String(skillTabs.indexOf(tab) + 1).padStart(2, "0")}`;
    skillTags.replaceChildren(...skill.tags.map((tag) => {
      const chip = document.createElement("span");
      chip.textContent = tag;
      return chip;
    }));
  });
});

const projectData = {
  sequence: {
    kicker: "PROJECT / 01",
    title: "DNA sequence analysis with Python",
    description: "A learning project using Python and Biopython to explore fundamental sequence properties and make biological data more approachable.",
    features: ["Count and compare A, T, G and C nucleotides.", "Calculate GC content as a basic sequence statistic.", "Process DNA sequences in a reproducible workflow.", "Explore sequence variation as a computational concept."],
    tech: "PYTHON · BIOPYTHON"
  },
  prediction: {
    kicker: "PROJECT / 02",
    title: "Exploring disease prediction with genetic data",
    description: "An exploratory machine-learning project focused on the process of preparing and analyzing biological data—not a validated medical prediction tool.",
    features: ["Prepare and inspect a biological dataset.", "Explore feature selection and classification techniques.", "Use visual analysis to understand patterns and model behavior.", "Frame disease prediction as a learning exercise, not diagnosis."],
    tech: "PYTHON · PANDAS · NUMPY · MATPLOTLIB · SCIKIT-LEARN"
  }
};

const projectDialog = document.querySelector(".project-dialog");
const dialogClose = document.querySelector(".dialog-close");
let dialogTrigger = null;

document.querySelectorAll(".project-open").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projectData[button.dataset.project];
    if (!project || !projectDialog) return;
    dialogTrigger = button;
    document.querySelector("#dialog-kicker").textContent = project.kicker;
    document.querySelector("#dialog-title").textContent = project.title;
    document.querySelector("#dialog-description").textContent = project.description;
    document.querySelector("#dialog-tech").textContent = project.tech;
    const featureList = document.querySelector("#dialog-features");
    featureList.replaceChildren(...project.features.map((feature) => {
      const item = document.createElement("li");
      item.textContent = feature;
      return item;
    }));
    if (typeof projectDialog.showModal === "function") projectDialog.showModal();
  });
});

function closeProjectDialog() {
  projectDialog?.close();
  dialogTrigger?.focus();
}

dialogClose?.addEventListener("click", closeProjectDialog);
projectDialog?.addEventListener("click", (event) => {
  if (event.target === projectDialog) closeProjectDialog();
});
projectDialog?.addEventListener("close", () => dialogTrigger?.focus());

const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") document.body.classList.add("dark-theme");

function updateThemeControl() {
  const isDark = document.body.classList.contains("dark-theme");
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  themeIcon.innerHTML = isDark
    ? '<path d="M20.2 15.2A8.3 8.3 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z"></path>'
    : '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path>';
}
updateThemeControl();
themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  localStorage.setItem("portfolio-theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
  updateThemeControl();
});

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const fields = [
  { input: document.querySelector("#contact-name"), error: document.querySelector("#name-error"), message: "Please enter your name (at least 2 characters)." },
  { input: document.querySelector("#contact-email"), error: document.querySelector("#email-error"), message: "Please enter a valid email address." },
  { input: document.querySelector("#contact-message"), error: document.querySelector("#message-error"), message: "Please enter a message of at least 10 characters." }
];

function fieldIsValid(input) {
  if (input.name === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
  return input.value.trim().length >= Number(input.minLength || 1);
}

fields.forEach(({ input, error, message }) => {
  input.addEventListener("input", () => {
    if (input.getAttribute("aria-invalid") === "true" && fieldIsValid(input)) {
      input.removeAttribute("aria-invalid");
      error.textContent = "";
    } else if (input.getAttribute("aria-invalid") === "true") {
      error.textContent = message;
    }
  });
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  let valid = true;
  fields.forEach(({ input, error, message }) => {
    const fieldValid = fieldIsValid(input);
    input.setAttribute("aria-invalid", String(!fieldValid));
    error.textContent = fieldValid ? "" : message;
    if (!fieldValid && valid) input.focus();
    valid = valid && fieldValid;
  });
  if (!valid) {
    formStatus.textContent = "Please correct the highlighted fields before continuing.";
    formStatus.className = "form-status is-error";
    return;
  }

  const values = new FormData(contactForm);
  const subject = `Portfolio message from ${values.get("name").toString().trim()}`;
  const body = `From: ${values.get("name").toString().trim()} (${values.get("email").toString().trim()})\n\n${values.get("message").toString().trim()}`;
  formStatus.textContent = "Your email app should open with the message ready. Nothing has been sent yet.";
  formStatus.className = "form-status is-success";
  window.location.href = `mailto:satyampriyanshu2@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

const backTop = document.querySelector(".back-top-floating");
const currentYear = document.querySelector("#current-year");
currentYear.textContent = new Date().getFullYear();

function updateScrollUI() {
  const scrolled = window.scrollY > 24;
  header.classList.toggle("is-scrolled", scrolled);
  backTop.classList.toggle("is-visible", window.scrollY > 520);
}
window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();
backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" }));
