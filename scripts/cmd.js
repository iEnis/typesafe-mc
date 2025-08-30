import { readFileSync, writeFileSync } from "fs";
import paths from "./paths.js";
const mapping = {
  "@minecraft/server": "server.d.ts",
  "@minecraft/server-ui": "server-ui.d.ts",
  "@minecraft/server-gametest": "server-gametest.d.ts",
  "@minecraft/server-net": "server-net.d.ts",
  "@minecraft/server-admin": "server-admin.d.ts"
};
const infoText = [
  `//? This file has been patched "https://www.npmjs.com/package/typesafe-mc"`,
  `//? version: "${JSON.parse(readFileSync(`${import.meta.dirname}/../package.json`).toString()).version}"`
].join("\n");
const replace = (module, targetPath) => {
  try {
    writeFileSync(
      targetPath,
      readFileSync(paths.node(`/types/${mapping[module]}`)).toString().replace(`//! {REPLACE_ME}`, infoText)
    );
  } catch (e) {
    console.log(e);
  }
};
const tsmc = {
  ["@minecraft/server-ui"]: (targetPath = paths.exec("node_modules/@minecraft/server-ui/index.d.ts")) => replace("@minecraft/server-ui", targetPath)
};
var cmd_default = tsmc;
export {
  cmd_default as default
};
