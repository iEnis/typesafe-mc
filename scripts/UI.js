import pc from "picocolors";
const colorString = "magenta";
const colorMap = {
  fg: pc.magenta,
  bg: pc.bgMagenta,
  black: pc.black,
  dim: pc.dim,
  bold: pc.bold,
  green: pc.green,
  reset: pc.reset,
  red: pc.red,
  bgRed: pc.bgRed,
  yellow: pc.yellow,
  white: pc.white,
  bgYellow: pc.bgYellow,
  bgWhite: pc.bgWhite
};
const singleColor = (color2, ...text) => colorMap[color2](text.join());
function color(color2, ...text) {
  let returnValue = text.join("");
  if (Array.isArray(color2)) {
    for (const colorItem of color2) {
      returnValue = singleColor(colorItem, returnValue);
    }
    return returnValue;
  } else return colorMap[color2](returnValue);
}
const symbols = {
  done: "\u25C7",
  current: "\u25C6",
  bar: "\u2502",
  topBar: "\u250C",
  bottomBar: "\u2514",
  confirmSelected: "\u25CF",
  confirmUnselected: "\u25CB",
  multiselectSelected: "\u25FC",
  multiselectUnselected: "\u25FB",
  cancel: "\u25A0",
  error: "\u25B2",
  cross: "\u2717",
  check: "\u2713\uFE0E",
  info: "i"
};
function colorSymbol(symbol, ...colors) {
  let returnValue = symbols[symbol];
  for (const colorItem of colors) {
    returnValue = singleColor(colorItem, returnValue);
  }
  return returnValue;
}
const mappings = {
  initial: { symbol: "current", color: "fg", gray: "fg" },
  active: { symbol: "current", color: "fg", gray: "fg" },
  submit: { symbol: "done", color: "green", gray: "dim" },
  cancel: { symbol: "cancel", color: "red", gray: "dim" },
  error: { symbol: "error", color: "yellow", gray: "yellow" }
};
function displayUI(state, message, hint, displayedText, output, error) {
  const data = {
    symbol: mappings[state].symbol,
    color: mappings[state].color,
    gray: mappings[state].gray
  };
  const display = [
    colorSymbol("bar", "dim"),
    `${colorSymbol(data.symbol, data.color)}  ${color("fg", message)}  ${color("dim", hint)}`,
    state === "cancel" ? colorSymbol("bar", "dim") : state === "submit" ? `${colorSymbol("bar", "dim")}  ${color("dim", output)}` : `${displayedText.map((x) => `${colorSymbol("bar", data.gray)}  ${x}`).join("\n")}
${colorSymbol(
      "bottomBar",
      state === "error" ? "yellow" : "fg"
    )}${error && state === "error" ? `  ${color(["bgYellow", "white"], ` ${error} `)}` : ""}`
  ].join("\n");
  return display;
}
export {
  color,
  colorString,
  colorSymbol,
  displayUI,
  symbols
};
