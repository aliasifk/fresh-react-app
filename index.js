#!/usr/bin/env node
import { execSync } from "child_process";
import fs from "fs";
const folderName = process.argv[2] || ".";

const AppJs = `import React from 'react';
import "./App.css";

export default function App() {
    return <div>Hello World</div>;
}

`;
const IndexJs = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
`;

const IndexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="My cool description" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
`;

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
};

const deleteSrc = () => {
  const ar = ["logo192.png", "logo512.png", "manifest.json", "robots.txt"];
  fs.rmSync(`${folderName}/src`, { recursive: true, force: true });

  ar.forEach((item) => {
    fs.rmSync(`${folderName}/public/${item}`, { force: true });
  });

  fs.writeFile(`${folderName}/public/index.html`, IndexHtml, (err) => {
    if (err) {
      console.error(err);
    }
  });

  fs.mkdirSync(`${folderName}/src`);
  fs.writeFile(`${folderName}/src/App.js`, AppJs, (err) => {
    if (err) {
      console.error(err);
    }
  });

  fs.writeFile(`${folderName}/src/App.css`, "", (err) => {
    if (err) {
      console.error(err);
    }
  });
  fs.writeFile(`${folderName}/src/index.js`, IndexJs, (err) => {
    if (err) {
      console.error(err);
    }
  });
  fs.writeFile(`${folderName}/README.md`, `# ${folderName}`, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

const craCommand = `npx create-react-app ${folderName}`;

const getReactApp = runCommand(craCommand);
if (!getReactApp) process.exit(-1);
deleteSrc();
console.log("Freshly Baked!");
