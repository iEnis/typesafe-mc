import path from "path";

export default {
    exec: (...paths: string[]) => path.join(process.cwd(), ...paths), //! Real Path
    // exec: (...paths: string[]) => path.join(process.cwd(), "../testing/", ...paths), //? Dev Path
    node: (...paths: string[]) => path.join(import.meta.dirname, "..", ...paths),
};
