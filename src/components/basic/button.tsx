import React from 'react'; // Import React to use JSX and create components
import style from './button.module.css'; // Import CSS module for styling the button component

// Define the properties that the ButtonComponent will accept with interface
interface ButtonProp {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    className?: string;
}

// Create the ButtonComponent functional component
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
  Example usages of ButtonComponent:

  1. Simple button with alert on click
  <ButtonComponent label="Click Me" onClick={() => alert('Clicked!')} />

  2. Disabled button (no clicks allowed)
  <ButtonComponent label="Can't Click Me" disabled />

  3. Submit button inside a form
  <form onSubmit={e => { e.preventDefault(); alert('Form submitted!'); }}>
    <input type="text" placeholder="Enter something..." />
    <ButtonComponent label="Submit" type="submit" />
  </form>

  4. Button with custom CSS class (style.primary and style.secondary should exist)
  <ButtonComponent label="Primary Action" className={style.primary} />
  <ButtonComponent label="Secondary Action" className={style.secondary} />

  5. Button without onClick handler (does nothing on click)
  <ButtonComponent label="I do nothing on click" />

  6. Button with dynamic disabled state and changing label
  const [isSaving, setIsSaving] = React.useState(false);
  <ButtonComponent
    label={isSaving ? 'Saving...' : 'Save'}
    disabled={isSaving}
    onClick={() => {
      setIsSaving(true);
      setTimeout(() => setIsSaving(false), 2000);
    }}
  />

  7. Button with optional icon prop (you need to extend your ButtonProp interface to include 'icon')
  <ButtonComponent
    label="Download"
    icon={<DownloadIcon />}
    onClick={() => console.log('Downloading...')}
  />

  Note:
  - Remember to import React and your styles properly.
  - For example 4, define CSS classes .primary and .secondary in your CSS module.
  - For example 7, you need an icon component like <DownloadIcon /> or replace with any JSX icon.

  These are practical ways to use and extend the ButtonComponent in your app.
*/