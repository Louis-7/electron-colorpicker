# Electron Color Picker

## Introduction

A color picker tool built on top of Electron and Angular. It's also a project I use to learn Electron.

### Features

- Pick colors from your screen. (Support multiple screen)
- Copy color text

[![cpgif](https://github.com/Louis-7/electron-colorpicker/blob/master/colorpicker-gif.gif?raw=true)]()

## Development

Read known issues before you getting start.

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

Rebuild Electron modules:

```bash
npm run electron:rebuild-modules
```

 Start development with:

```bash
npm start
```

### Other commands

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

### Known Issues

- When you first time start your development with ```npm run start```, the color picker function will not work as expect. If you start pick color from the screen, it will always stay at "Color pick mode". To solve this problem, use ```win + d``` exit to desktop and open Color Picker window then restart development session with ```ctrl + r```.
