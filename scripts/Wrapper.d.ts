import type { ConfirmOptions } from "./uiTypes.js";
import { type Spinner } from "yocto-spinner";
export default class Wrapper {
    protected constructor();
    static activeSpinner?: {
        spinner: Spinner;
        message: string;
    };
    static moduleCheck(): string[];
    private static cancel;
    static exit(message?: string): void;
    static intro: (text: string) => void;
    static outro: (text: string) => void;
    static spinner(message: string, callback: () => Promise<boolean | string | undefined>): Promise<string | boolean | undefined>;
    static spinnerError(): void;
    static confirm(options: ConfirmOptions): Promise<boolean>;
}
