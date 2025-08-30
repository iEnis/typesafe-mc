import buildOptions from "./shared.js";
import { build } from "esbuild";

await build(buildOptions);
console.log("Build Finished!");
