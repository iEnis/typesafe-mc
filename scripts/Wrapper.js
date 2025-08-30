import { ConfirmPrompt, isCancel } from "@clack/core";
import { color, colorString, colorSymbol, displayUI } from "./UI.js";
import spinner from "yocto-spinner";
import { existsSync } from "fs";
import paths from "./paths.js";
const exists = (module) => existsSync(paths.exec(`/node_modules/${module}/index.d.ts`));
export default class Wrapper {
    constructor() { }
    static activeSpinner;
    static moduleCheck() {
        const modules = [];
        // if (exists("@minecraft/server")) modules.push("@minecraft/server");
        if (exists("@minecraft/server-ui"))
            modules.push("@minecraft/server-ui");
        // if (exists("@minecraft/server-gametest")) modules.push("@minecraft/server-gametest");
        // if (exists("@minecraft/server-net")) modules.push("@minecraft/server-net");
        // if (exists("@minecraft/server-admin")) modules.push("@minecraft/server-admin");
        if (modules.length > 0)
            return modules;
        console.log([
            colorSymbol("topBar", "dim"),
            `${colorSymbol("bar", "dim")}  ${color("red", "Could not find the '@minecraft' node_modules folder")}`,
            `${colorSymbol("bar", "dim")}  ${color("red", "Please run this in the root of your project and make")}`,
            `${colorSymbol("bar", "dim")}  ${color("red", "sure to install the node_modules before trying to patch")}`,
            colorSymbol("bottomBar", "dim"),
        ].join("\n"));
        process.exit();
    }
    static cancel(value) {
        if (isCancel(value) || typeof value === "symbol")
            return true;
        else
            return false;
    }
    static exit(message = "Canceled!") {
        console.log(`${colorSymbol("bottomBar", "dim")}  ${color(["bgRed", "white"], ` ${message} `)}`);
        process.exit();
    }
    static intro = (text) => console.log(`${colorSymbol("topBar", "dim")}  ${color("bg", ` ${text} `)}`);
    static outro = (text) => console.log(`${colorSymbol("bar", "dim")}\n${colorSymbol("bottomBar", "dim")}  ${color("bg", ` ${text} `)}`);
    // public static async multiselect(options: MultiSelectOptions<string>) {
    //     const p = new MultiSelectPrompt({
    //         render() {
    //             if (this.value === undefined) this.value = [];
    //             return displayUI(
    //                 this.state,
    //                 options.message,
    //                 options.hint ?? "",
    //                 options.options.map((x, i) => {
    //                     const check = this.value.includes(x.value);
    //                     const selected = i === this.cursor;
    //                     return `${colorSymbol(
    //                         check ? "multiselectSelected" : "multiselectUnselected",
    //                         check ? "green" : selected ? "white" : "dim",
    //                     )} ${color(selected ? "white" : "dim", x.label ?? x.value)}${
    //                         !!x.hint ? ` ${color("dim", `(${x.hint})`)}` : ""
    //                     }`;
    //                 }),
    //                 this.value.join(", "),
    //                 this.error,
    //             );
    //         },
    //         options: options.options.map((x) => ({ value: x.value })),
    //         validate: (value) => {
    //             if (!!options.minItems && options.minItems > value.length)
    //                 return `You need to at least select ${options.minItems} items`;
    //             else if (!!options.maxItems && options.maxItems < value.length)
    //                 return `You need to at most select ${options.maxItems} items`;
    //             else if (options.required && value.length < 1) return `This field is required`;
    //             else if (!!options.validate) return options.validate(value);
    //         },
    //     });
    //     const value = await p.prompt();
    //     if (this.cancel(value)) this.exit();
    //     return value as unknown as string[];
    // }
    static async spinner(message, callback) {
        console.log(colorSymbol("bar", "dim"));
        this.activeSpinner = { spinner: spinner({ color: colorString, text: color("fg", `  ${message}`) }), message };
        this.activeSpinner?.spinner.start();
        let value = undefined;
        const stop = (success) => `${colorSymbol(success ? "done" : "error", success ? "green" : "red")}  ${color("fg", message)}${(success && typeof value === "string") || !success
            ? `\n${colorSymbol("bar", "dim")}  ${color("dim", `${value}`)}`
            : ""}`;
        try {
            value = await callback();
            if (value === undefined)
                throw new Error();
            this.activeSpinner?.spinner.stop(stop(true));
        }
        catch (e) {
            this.activeSpinner?.spinner.stop(stop(false));
            this.exit();
        }
        this.activeSpinner = undefined;
        return value;
    }
    static spinnerError() {
        if (!this.activeSpinner)
            return this.exit();
        this.activeSpinner.spinner.stop();
        console.log(`${colorSymbol("cancel", "red")}  ${color("fg", this.activeSpinner?.message)}`);
        console.log(colorSymbol("bar", "dim"));
        this.exit();
    }
    static async confirm(options) {
        const active = color("dim", options.active ?? "Yes");
        const inactive = color("dim", options.inactive ?? "No");
        const p = new ConfirmPrompt({
            render() {
                const yes = this.cursor === 0 ? colorSymbol("confirmSelected", "green") : colorSymbol("confirmUnselected", "dim");
                const no = this.cursor === 1 ? colorSymbol("confirmSelected", "green") : colorSymbol("confirmUnselected", "dim");
                return displayUI(this.state, options.message, options.hint ?? "", [`${yes} ${active} ${color("reset", "|")} ${no} ${inactive}`], this.cursor === 0 ? active : inactive);
            },
            initialValue: options.initialValue,
            active,
            inactive,
        });
        const value = (await p.prompt());
        if (this.cancel(value))
            this.exit();
        return value;
    }
}
