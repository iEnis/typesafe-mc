import path from "path";
var paths_default = {
  exec: (...paths) => path.join(process.cwd(), ...paths),
  //! Real Path
  // exec: (...paths: string[]) => path.join(process.cwd(), "../testing/", ...paths), //? Dev Path
  node: (...paths) => path.join(import.meta.dirname, "..", ...paths)
};
export {
  paths_default as default
};
