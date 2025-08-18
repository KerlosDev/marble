import React from 'react';

const Select = React.forwardRef(({
    label,
    id,
    error,
    options = [],
    placeholder,
    className = '',
    ...props
}, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium mb-1">
                    {label}
                </label>
            )}
            <select
                id={id}
                ref={ref}
                className={`select ${error ? 'border-red-500' : ''} ${className}`}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled>{placeholder}</option>
                )}
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="form-error">{error.message}</p>}
        </div>
    );
});

Select.displayName = 'Select';

export default Select;
