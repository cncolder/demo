interface Option {
    value: string;
}

const options: Option | ReadonlyArray<Option> = [];

const firstValue = Array.isArray(options) ? options[0].value : options.value;
