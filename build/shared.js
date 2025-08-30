import { globby } from "globby";
import path from "path";



/** @type {import("esbuild").BuildOptions} */
const buildOptions = {
    entryPoints: [...(await globby("src/**/*.ts"))].filter(x => !x.endsWith(".d.ts")),
    outdir: path.join(import.meta.dirname, "../scripts"),
    platform: "node",
    format: "esm",
    target: "es2022",
    sourcemap: false,
    logLevel: "info",
};

export default buildOptions;
