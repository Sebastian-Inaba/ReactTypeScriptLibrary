import React from 'react'; // Import React to use JSX and create components
import style from './basic.module.css'; // Import CSS module for styling the button component

// The properties that the ButtonComponent will accept with interface
// interface is a TypeScript feature that describes the shape of an object
// type is a TypeScript feature that can define aliases for primitive types, unions, objects, or combinations of types.
// It is more flexible than interface and is often used for unions like string literals or to combine multiple types.
interface ButtonProp {
    label: string;
    onClick?: () => void; 
    // Optional function that takes no arguments and returns nothing.
    // This defines the expected shape of a click handler function. 
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    className?: string;
}

// The ButtonComponent functional component
// It accepts props defined in ButtonProp interface

// React.FC is a type for functional components in React. It provides type checking and autocomplete for props.
const ButtonComponent: React.FC<ButtonProp> = ({
    label,
    onClick,
    disabled = false,
    type = "button",
    className = style.ButtonComponentStyle,
}) => {
    return (
        <button
            className={className}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {label}
        </button>
    )
}

export default ButtonComponent // Export the ButtonComponent so it can be used in other parts of the application

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
