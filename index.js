const fs = require("fs");
const path = require("path");
const cfonts = require("cfonts");

const logColors = {
  info: "\x1b[34m",
  warn: "\x1b[33m",
  error: "\x1b[31m",
  success: "\x1b[32m",
  reset: "\x1b[0m",
};

function logMessage(type, message) {
  const timestamp = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    timeZone: "Asia/Jakarta",
  });

  const color = logColors[type] || "";
  const label = type.toUpperCase();

  console.log(`${color}[${timestamp}] ${label}${logColors.reset} - ${message}`);
}

class Switcher {
  constructor(config = {}) {
    this.switchFilePath =
      config.switchFile || path.join(__dirname, "switch.txt");
    this.trueStates = this._normalizeArray(config.trueStates || ["TRUE"]);
    this.falseStates = this._normalizeArray(config.falseStates || ["FALSE"]);
    this.handleTrue = config.onTrue;
    this.handleFalse = config.onFalse;
    this.handleInvalid = config.onInvalid;
    this.displayBanner = config.showBanner !== false;
    this.bannerText = config.bannerText || "Switdule";
    this.bannerColors = config.bannerGradient || ["red", "yellow", "green"];

    this._init();
  }

  _normalizeArray(value) {
    return Array.isArray(value)
      ? value.map((v) => v.toUpperCase())
      : [value.toUpperCase()];
  }

  _init() {
    if (this.displayBanner) {
      cfonts.say(this.bannerText, {
        font: "simple3d",
        align: "left",
        gradient: this.bannerColors,
        independentGradient: true,
        transitionGradient: true,
        background: "transparent",
        space: true,
        maxLength: 0,
        letterSpacing: 1,
        lineHeight: 1,
      });
    }

    let currentState;
    try {
      currentState = fs
        .readFileSync(this.switchFilePath, "utf-8")
        .trim()
        .toUpperCase();
      logMessage("info", `Current switch state: "${currentState}"`);
    } catch (err) {
      logMessage("error", `Failed to read switch file: ${err.message}`);
      return;
    }

    if (this.trueStates.includes(currentState)) {
      logMessage("success", `Switch matched TRUE state: "${currentState}"`);
      if (typeof this.handleTrue === "function") {
        this.handleTrue();
      } else {
        logMessage("warn", `No handler for TRUE state.`);
      }
    } else if (this.falseStates.includes(currentState)) {
      logMessage("success", `Switch matched FALSE state: "${currentState}"`);
      if (typeof this.handleFalse === "function") {
        this.handleFalse();
      } else {
        logMessage("warn", `No handler for FALSE state.`);
      }
    } else {
      logMessage(
        "error",
        `Unknown switch state: "${currentState}". Expected one of: ${[
          ...this.trueStates,
          ...this.falseStates,
        ].join(", ")}`
      );
      if (typeof this.handleInvalid === "function") {
        this.handleInvalid(currentState);
      }
    }
  }
}

module.exports = Switcher;
