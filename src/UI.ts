import type { State } from "@clack/core";
import pc from "picocolors";

export const colorString = "magenta";
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
    bgWhite: pc.bgWhite,
} as const;

type colorList = keyof typeof colorMap;

const singleColor = (color: colorList, ...text: string[]) => colorMap[color](text.join());

export function color(color: colorList | colorList[], ...text: string[]) {
    let returnValue = text.join("");
    if (Array.isArray(color)) {
        for (const colorItem of color) {
            returnValue = singleColor(colorItem, returnValue);
        }
        return returnValue;
    } else return colorMap[color](returnValue);
}

export const symbols = {
    done: "◇",
    current: "◆",
    bar: "│",
    topBar: "┌",
    bottomBar: "└",
    confirmSelected: "●",
    confirmUnselected: "○",
    multiselectSelected: "◼",
    multiselectUnselected: "◻",
    cancel: "■",
    error: "▲",
    cross: "✗",
    check: "✓︎",
    info: "i",
} as const;

type symbolsList = keyof typeof symbols;

export function colorSymbol(symbol: symbolsList, ...colors: colorList[]) {
    let returnValue: string = symbols[symbol];
    for (const colorItem of colors) {
        returnValue = singleColor(colorItem, returnValue);
    }
    return returnValue;
}

const mappings: { [key in State]: { symbol: symbolsList; color: colorList; gray: colorList } } = {
    initial: { symbol: "current", color: "fg", gray: "fg" },
    active: { symbol: "current", color: "fg", gray: "fg" },
    submit: { symbol: "done", color: "green", gray: "dim" },
    cancel: { symbol: "cancel", color: "red", gray: "dim" },
    error: { symbol: "error", color: "yellow", gray: "yellow" },
} as const;

export function displayUI(
    state: State,
    message: string,
    hint: string,
    displayedText: string[],
    output: string,
    error?: string,
) {
    const data = {
        symbol: mappings[state].symbol,
        color: mappings[state].color,
        gray: mappings[state].gray,
    };
    const display = [
        colorSymbol("bar", "dim"),
        `${colorSymbol(data.symbol, data.color)}  ${color("fg", message)}  ${color("dim", hint)}`,
        state === "cancel"
            ? colorSymbol("bar", "dim")
            : state === "submit"
            ? `${colorSymbol("bar", "dim")}  ${color("dim", output)}`
            : `${displayedText.map((x) => `${colorSymbol("bar", data.gray)}  ${x}`).join("\n")}\n${colorSymbol(
                  "bottomBar",
                  state === "error" ? "yellow" : "fg",
              )}${error && state === "error" ? `  ${color(["bgYellow", "white"], ` ${error} `)}` : ""}`,
    ].join("\n");

    return display;
}
