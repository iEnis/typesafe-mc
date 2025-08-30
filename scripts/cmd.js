import { readFileSync, writeFileSync } from "fs";
import paths from "./paths.js";
import path from "path";
const mapping = {
    "@minecraft/server": "server.d.ts",
    "@minecraft/server-ui": "server-ui.d.ts",
    "@minecraft/server-gametest": "server-gametest.d.ts",
    "@minecraft/server-net": "server-net.d.ts",
    "@minecraft/server-admin": "server-admin.d.ts",
};
const infoText = [
    `\/\/? This file has been patched "https://www.npmjs.com/package/typesafe-mc"`,
    `\/\/? version: "${JSON.parse(readFileSync(`${import.meta.dirname}/../package.json`).toString()).version}"`,
].join("\n");
export const patch = (module, targetPath = paths.exec()) => {
    try {
        writeFileSync(path.join(targetPath, "node_modules", module, mapping[module]), readFileSync(paths.node(`/types/${mapping[module]}`))
            .toString()
            .replace(`\/\/! {REPLACE_ME}`, infoText));
    }
    catch (e) { }
};
const tsmc = (targetPath) => {
    patch("@minecraft/server", targetPath);
    patch("@minecraft/server-ui", targetPath);
    patch("@minecraft/server-gametest", targetPath);
    patch("@minecraft/server-net", targetPath);
    patch("@minecraft/server-admin", targetPath);
};
export default tsmc;
