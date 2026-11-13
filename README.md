# Satyam Priyanshu — Personal Portfolio

A responsive, editorial-style portfolio for a Genetics and Artificial Intelligence undergraduate. Built with semantic HTML, custom CSS, Tailwind CSS utility configuration via the CDN, and vanilla JavaScript.

## Run locally

Open `index.html` in a modern browser. The page uses the Tailwind CSS CDN and Google Fonts; those external services are used when an internet connection is available. The custom stylesheet and JavaScript are local.

## Project structure

```text
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   └── icons/
└── README.md
```

## Features

- Responsive navigation with active-section tracking
- Light/dark theme toggle, saved in local storage
- CSS/JavaScript-generated DNA helix with pause control
- Scroll reveals and reduced-motion support
- Interactive research-interest and skill cards
- Accessible project detail dialogs
- Certificate gallery with full-size views of the supplied Bioinformatix certificates
- Client-side contact validation that prepares an email in the visitor's email app
- No backend, analytics, or framework dependencies

## Resume

The downloadable one-page resume in `assets/resume.pdf` contains only the profile, education, skills, exposure, and project details provided for this portfolio.

## Before publishing

Check that all education details, project descriptions, and profile links are current. The project examples are presented as academic explorations, not clinical or validated tools. For a production deployment, use a Tailwind build step to generate and minify static CSS instead of the CDN development script.
