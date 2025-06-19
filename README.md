<p align="center">
    <img width="500" src="img/image.png" alt="switdule">
  </a>
</p>

<div align="center">
  <b>A simple module switcher for switching between different modules in a single directory.</b>
</div>

---

## About

Switdule is a simple package for switching between different modules/projects within a single directory/hosting.

This is very useful if you want to use two or more modules within a single hosting to save costs and resources.

## Features

- Switch modules using only **text file** to make switching modules easier
- The maximum number of modules is **__unlimited__**; *you can customize as many as you want*
- Compatible with `CLI-only` or `GUI-only` hosting
- Modules only require `module.exports`

## Setup
Install the package using NPM:
```bash
npm install github:heliobutterx10/switdule
```
Then, create a new directory named “Modules” to store your modules and paste this code into `index.js` or your main file:
```javascript
const module1 = require(‘./Modules/module1’) // module exported as a function
const module2 = require(‘./Modules/module2’) // module exported as a class
const module3 = require(‘./Modules/module3’) // module exported as an object
const module4 = require(‘./Modules/module4’) // module exported as an object + methods
// replace all modules with your modules
const SwitchHandler = require(‘switdule’);

new SwitchHandler({
  switchFile: ‘./switch.txt’, // replace this with your switch text file
  trueStates: [‘ON’, ‘ENABLE’], // you can add more states here to enable more modules
  falseStates: [‘OFF’, ‘DISABLE’], // you can add more states here to enable more modules
  onTrue: (state) => if (state == ‘ON’) { // example 1
    module1(“Hello World!”)               
  } else if (state == ‘ENABLE’) {         // example 2
    const user = new module2(“heliobutterx10”);
    user.sayHi();
  }, // if trueStates in switchFile match, run the code here
  onFalse: (state) => if (state == ‘OFF’) { // example 3
    console.log(module3.appName);
    console.log(module3.version);
  } else if (state == ‘DISABLE’) {           // example 4
    module4.doSomething();
    console.log(“Status:”, module4.status);
  }, // if the falseStates value in switchFile matches, run the code here
  onInvalid: (value) => console.log(`Invalid switch value: “${value}”`) // if the states value provided in switchFile is invalid, run the code here
});
```
To create a module, your code needs to be exported using [`module.exports`](https://nodejs.org/api/modules.html#moduleexports) and placed in the “Modules” directory, then create logic in `onTrue`, `onFalse`, or `onInvalid` using your module.
### Options
>[!NOTE]
>Options who have a leading question mark (?) are optional and **not required**, however if you want to use them, make sure to remove it!

```javascript
const SwitchHandler = require('switdule');

new SwitchHandler({
switchFile: string,
trueStates: ["true","yes"],
falseStates: ["false","no"],
onTrue: (state) => console.log("true", state),
onFalse: (state) => console.log("false", state),
onInvalid?: (state) => console.log("invalid", state),
showBanner?: boolean,
bannerText?: string,
bannerGradient?: array
});
```
### Contribution

We welcome contributions from everyone! Here's how to contribute this project:
1. **Fork** this repository and **Clone** your fork:
```bash
git clone https://github.com/heliobutterx10/switdule.git
```
2. **Create a new branch** for your feature or fix:
```bash
git checkout -b feature-or-fix
```
3. **Make your changes** and commit with a clear message:
```bash
git commit -m "feat: describe your feature or fix"
```
4. **Push** to your forked repository:
```bash
git push origin feature-or-fix
```
5. **Open a Pull Request** to the `main` branch
- Clearly explain what you changed
- Include screenshots or logs if necessary
- Link related issues (if any)