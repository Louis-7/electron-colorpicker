# Electron Color Picker

## Introduction

A color picker tool built on top of Electron and Angular. It's also a project I use to learn Electron.

## Development

### Requirements
Angular CLI needs Node 10.9 or later. 

If you want to use angular-cli globally:

```bash
npm install -g @angular/cli
```

### Getting Started

Install dependencies with npm :

``` bash
npm install
```

 Start development with:
```bash
npm start
```

To run application in browser:

```bash
npm run electron:serve
```

Then open http://localhost:4200/

### Build

I only tested build process on Windows. For Mac and Linux will update later.

On Windows:

```bash
npm run electron:windows
```

### Known Issue

- When you first time start your development with ```npm run start```, the color picker function will not work as expect. If you start pick color from the screen, it will always stay at "Color pick mode". To solve this problem, restart development session with ```ctrl + r```.

