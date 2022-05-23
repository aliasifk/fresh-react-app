#!/usr/bin/env node
import { execSync } from "child_process";

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
};

const folderName = process.argv[2] || "folder";
const craCommand = `npx create-react-app ${folderName}`;

const getReactApp = runCommand(craCommand);
if (!getReactApp) process.exit(-1);
