import React from 'react';

const Textarea = React.forwardRef(({
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
            <textarea
                id={id}
                ref={ref}
                className={`textarea ${error ? 'border-red-500' : ''} ${className}`}
                {...props}
            />
            {error && <p className="form-error">{error.message}</p>}
        </div>
    );
});

Textarea.displayName = 'Textarea';

export default Textarea;
