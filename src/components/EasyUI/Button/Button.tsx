import React from 'react';
import style from './Button.module.css';

// Simple button component

interface ButtonProp {
    label: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

export const ButtonComponent: React.FC<ButtonProp> = ({
    label,
    onClick,
    disabled = false,
    type = 'button',
    className = style.ButtonComponentStyle,
}) => {
    return (
        <button
            className={className}
            onClick={onClick}
            disabled={disabled}
            type={type}
            aria-label={label}
        >
            {label}
        </button>
    );
};

/*
  
USAGE EXAMPLES:

// 1. Simple button with alert on click
// <ButtonComponent label="Click Me" onClick={() => alert('Clicked!')} />

// 2. Disabled button
// <ButtonComponent label="Can't Click Me" disabled />

// 3. Submit button inside a form
// <form onSubmit={e => { e.preventDefault(); alert('Form submitted!'); }}>
//   <input type="text" placeholder="Enter something..." />
//   <ButtonComponent label="Submit" type="submit" />
// </form>

// 4. Button with other CSS classes (style.primary and style.secondary)
// <ButtonComponent label="Primary Action" className={style.primary} />
// <ButtonComponent label="Secondary Action" className={style.secondary} />

// 5. Button with dynamic disabled state and changing label
// const [isSaving, setIsSaving] = React.useState(false);
// <ButtonComponent
//   label={isSaving ? 'Saving...' : 'Save'}
//   disabled={isSaving}
//   onClick={() => {
//     setIsSaving(true);
//     setTimeout(() => setIsSaving(false), 2000);
//   }}
// />

// 6. Button with optional icon prop (you need to extend your ButtonProp interface to include 'icon')
// <ButtonComponent
//   label="Download"
//   icon={<DownloadIcon />}
//   onClick={() => console.log('Downloading...')}
// />

// Note:
// - For example 4, define CSS classes .primary and .secondary in your CSS module.
// - For example 6, you need an icon component like <DownloadIcon /> or replace with any JSX icon.

*/
