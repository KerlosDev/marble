import React from 'react';

const Button = React.forwardRef(({
    children,
    variant = 'primary',
    size = 'default',
    className = '',
    ...props
}, ref) => {
    const baseClasses = 'btn';

    const variantClasses = {
        primary: 'btn-primary',
        outline: 'btn-outline',
        black: 'btn-black',
    };

    const sizeClasses = {
        default: 'py-2.5 px-5',
        sm: 'py-2 px-4 text-xs',
        lg: 'py-3 px-6 text-base',
        full: 'w-full py-2.5 px-5',
    };

    const combinedClasses = `${baseClasses} ${variantClasses[variant] || ''} ${sizeClasses[size] || ''} ${className}`;

    return (
        <button className={combinedClasses} ref={ref} {...props}>
            {children}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
