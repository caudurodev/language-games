import { useState, useEffect } from 'react';

interface InputProps {
    placeholder?: string;
    type?: 'text' | 'password' | 'email';
    value?: string;
    disabled?: boolean;
    required?: boolean;
    onChange?: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({
    placeholder,
    type = 'text',
    value: propValue,
    onChange,
    disabled = false,
    required = false
}) => {
    const [internalValue, setInternalValue] = useState<string>(propValue || '');

    useEffect(() => {
        if (propValue !== undefined) {
            setInternalValue(propValue);
        }
    }, [propValue]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.value;
        setInternalValue(newValue);
        onChange?.(newValue);
    };

    return (
        <input
            type={type}
            value={propValue !== undefined ? propValue : internalValue}
            onChange={handleChange}
            placeholder={placeholder}
            className="border rounded px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            disabled={disabled}
            required={required}
        />
    );
};

export default Input;
