type node_modules = "@minecraft/server" | "@minecraft/server-ui" | "@minecraft/server-gametest" | "@minecraft/server-net" | "@minecraft/server-admin";
export declare const patch: (module: node_modules, targetPath?: string) => void;
declare const tsmc: (targetPath?: string) => void;
export default tsmc;
