import buildOptions from "./shared.js";
import { context } from "esbuild";

const ctx = await context(buildOptions);

await ctx.watch();
console.log("Watching for Changes...");
