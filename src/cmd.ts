import { readFileSync, writeFileSync } from "fs";
import paths from "./paths.js";

type node_modules =
    | "@minecraft/server"
    | "@minecraft/server-ui"
    | "@minecraft/server-gametest"
    | "@minecraft/server-net"
    | "@minecraft/server-admin";

type node_modules_mapping =
    | "server.d.ts"
    | "server-ui.d.ts"
    | "server-gametest.d.ts"
    | "server-net.d.ts"
    | "server-admin.d.ts";

const mapping: { [key in node_modules]: node_modules_mapping } = {
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

const replace = (module: node_modules, targetPath: string) => {
    try {
        writeFileSync(
            targetPath,
            readFileSync(paths.node(`/types/${mapping[module]}`))
                .toString()
                .replace(`\/\/! {REPLACE_ME}`, infoText),
        );
    } catch (e) {
        console.log(e);
    }
};

const tsmc = {
    ["@minecraft/server-ui"]: (targetPath: string = paths.exec("node_modules/@minecraft/server-ui/index.d.ts")) =>
        replace("@minecraft/server-ui", targetPath),
} as const satisfies { [key in node_modules]?: (targetPath: string) => void };

export default tsmc;
