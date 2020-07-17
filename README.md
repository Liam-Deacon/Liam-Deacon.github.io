# My Portfolio

![Node.js CI](https://github.com/Liam-Deacon/Liam-Deacon.github.io/workflows/Node.js%20CI/badge.svg?branch=dev)

The actual code is on the <a href="https://github.com/Liam-Deacon/Liam-Deacon.github.io/tree/dev"><code>dev</code></a> branch and the <code>dist/</code> folder deployed to <code>master</code> via GitHub Actions CI.

## Developed With

| | Tool |
|-|------|
| <img height="64px" src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt=""/> | Node.js - Javascript runtime. |
| <img height="64px" src="https://upload.wikimedia.org/wikipedia/commons/7/72/Gulp.js_Logo.svg" alt=""/> | Gulp - A javascript task runner for development streams. |
| <img height="64px" src="https://upload.wikimedia.org/wikipedia/commons/9/96/Sass_Logo_Color.svg" alt=""/> | SCSS - A CSS preprocessor metalanguage. |
| <img height="64px" src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_nunjucks_icon_130292.png"/> | Nunjucks - Allows HTML components using templating metalanguage. | 
| <img height="64px" src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg" alt=""/> | Bootstrap - Responsive web framework. | 

### Prequisites

The following software is required on your system:

- Node
- npm

### Install

To get up and running, simply do the following:

```bash
git clone https://github.com/liam-deacon.github.io.git liam-deacon-portfolio
```

Install node modules:

```bash
cd liam-deacon-portfolio
npm install
```

### Build

This app uses SCSS as well as some optimisation steps for producing a production grade website. As such there are a few steps to producing the final site in the `dist/` directory.

To build the application:

```bash
npm run build
```

### Run

To run a development server:

```bash
npm start
```
