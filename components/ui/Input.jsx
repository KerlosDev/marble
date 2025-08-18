import React from 'react';

const Input = React.forwardRef(({
    label,
    id,
    error,
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
            <input
                id={id}
                ref={ref}
                className={`input ${error ? 'border-red-500' : ''} ${className}`}
                {...props}
            />
            {error && <p className="form-error">{error.message}</p>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
