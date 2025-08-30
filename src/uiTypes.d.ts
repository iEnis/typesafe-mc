export interface ConfirmOptions {
    message: string;
    active?: string;
    hint?: string;
    inactive?: string;
    initialValue?: boolean;
}

export interface TextOptions {
    message: string;
    placeholder: string;
    validate?: (value: string) => string | undefined;
    hint?: string;
}

type Primitive = Readonly<string | boolean | number>;
type Option<Value extends Primitive> = {
    /**
     * Internal data for this option.
     */
    value: Value;
    /**
     * The optional, user-facing text for this option.
     *
     * By default, the `value` is converted to a string.
     */
    label?: string;
    /**
     * An optional hint to display to the user when
     * this option might be selected.
     *
     * By default, no `hint` is displayed.
     */
    hint?: string;
};

export interface MultiSelectOptions<Value> {
    message: string;
    options: Option<Value>[];
    validate?(value: Value[]): string | undefined;
    maxItems?: number;
    minItems?: number;
    required?: boolean;
    hint?: string;
}
