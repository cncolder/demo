import React, { FC, useCallback, useState } from 'react';
import { useDerivedState } from './useDerivedState';

interface PrimarySchoolNumberInputProps {
    value: number;
    onChange(value: number): void;
}

const PrimarySchoolNumberInput: FC<PrimarySchoolNumberInputProps> = (props) => {
    const [value, setValue] = useDerivedState(props.value);

    const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
        (e) => {
            const val = e.target.value;

            setValue(val as any);

            const num = Number.parseInt(val);

            if (val === num.toString() && num >= 0 && num <= 20) {
                props.onChange(num);
            }
        },
        [props.onChange]
    );

    return <input type="text" value={value} onChange={onChange} />;
};

export default () => {
    const [value, setValue] = useState(0);

    return (
        <div>
            <h1>How do I implement getDerivedStateFromProps?</h1>

            <p>
                Try typing in "Derived Number Input". Only integers (0-20) trigger the "onChange" event, another value
                stored in the internal state. If you drag "Controlled Range Input", the value will stay in sync.
            </p>

            <p>Current value: {value}</p>

            <p>
                <label>
                    Controlled Range Input (0-20):
                    <input
                        type="range"
                        min="0"
                        max="20"
                        value={value}
                        onChange={(e) => setValue(parseInt(e.target.value, 10))}
                    />
                </label>
            </p>

            <p>
                <label>
                    Derived Number Input (0-20): <PrimarySchoolNumberInput value={value} onChange={setValue} />
                </label>
            </p>
        </div>
    );
};
