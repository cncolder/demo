import React, { FC, useCallback, useState } from 'react';

const ControlledRangeInput: FC<{ value: number; onChange(value: number): void }> = ({ value, onChange }) => {
    return (
        <label>
            Controlled Range Input:
            <input type="range" value={value} onChange={(e) => onChange(parseInt(e.target.value, 10))} />
        </label>
    );
};

const UncontrolledRangeInput: FC<{ defaultValue: number; onChange(value: number): void }> = ({
    defaultValue,
    onChange,
}) => {
    return (
        <label>
            Uncontrolled Range Input:
            <input type="range" defaultValue={defaultValue} onChange={(e) => onChange(parseInt(e.target.value, 10))} />
        </label>
    );
};

export default () => {
    const [value, setValue] = useState(0);

    return (
        <div>
            <h1>Controlled, Uncontrolled, and Combine one.</h1>

            <p>Current value: {value}</p>

            <p>
                <label>Controlled Range Input:</label>
                <input type="range" value={value} onChange={(e) => setValue(parseInt(e.target.value, 10))} />
            </p>

            <p>
                <label>Uncontrolled Range Input:</label>
                <input type="range" defaultValue={value} onChange={(e) => setValue(parseInt(e.target.value, 10))} />
            </p>

            <p>
                <label>Combine Range Input (wrong):</label>
                <input
                    type="range"
                    value={value}
                    defaultValue={value}
                    onChange={(e) => setValue(parseInt(e.target.value, 10))}
                />
            </p>
        </div>
    );
};
