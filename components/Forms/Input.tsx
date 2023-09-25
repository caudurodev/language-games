import { useState } from 'react';

interface InputProps {
    placeholder?: string;
    onTextChange?: (text: string) => void;
}

export const Input: React.FC<InputProps> = ({ placeholder, onTextChange }) => {
    const [value, setValue] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.value;
        setValue(newValue);
        onTextChange?.(newValue);
    };

    return <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="border rounded px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
    />;
};

export default Input;
