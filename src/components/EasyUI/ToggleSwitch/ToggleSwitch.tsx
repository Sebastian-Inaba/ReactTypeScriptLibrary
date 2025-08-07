import React from 'react';
import style from './ToggleSwitch.module.css';

// Toggle switch component (basically the checkbox component but with style to look like a toggle/switch)

interface ToggleSwitchProp {
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    className?: string;
}

export const ToggleSwitchComponent: React.FC<ToggleSwitchProp> = ({ checked, onChange, label = 'Switch', className = '' }) => {
    return (
        <label className={`${style.ToggleSwitchComponentLabel} ${className}`}>
            {/* Hidden checkbox input controlling the toggle state */}
            <input
                type="checkbox" // Hard coded to checkbox so we don't need type as prop
                checked={checked}
                onChange={onChange}
                className={`${style.ToggleSwitchComponentInput} ${className}`}
                aria-label={label}
            />
            {/* Visual slider*/}
            <span className={style.slider}></span>
            {label}
        </label>
    );
};

/*

USAGE EXAMPLES:

// 1. Basic toggle switch controlled with React state:
// const [isOn, setIsOn] = React.useState(false);
// 
// <ToggleSwitchComponent
//   checked={isOn}
//   onChange={e => setIsOn(e.target.checked)}
//   label="Enable notifications"
// />

// 2. Toggle switch with custom CSS classes (overriding default styles):
// <ToggleSwitchComponent
//   checked={isOn}
//   onChange={e => setIsOn(e.target.checked)}
//   label="Dark mode"
//   labelClassName="myCustomLabelClass"
//   inputClassName="myCustomInputClass"
// />

// 3. Toggle switch used inside a form with other components:
// const [agreed, setAgreed] = React.useState(false);
// const [username, setUsername] = React.useState('');
// 
// const handleSubmit = () => {
//   if (!agreed) alert('You must agree first!');
//   else alert(`Welcome, ${username}!`);
// };
// 
// <>
//   <InputFieldComponent
//     value={username}
//     onChange={e => setUsername(e.target.value)}
//     placeholder="Enter your username"
//     label="Username"
//   />
//   <ToggleSwitchComponent
//     checked={agreed}
//     onChange={e => setAgreed(e.target.checked)}
//     label="I agree to the terms"
//   />
//   <ButtonComponent label="Submit" onClick={handleSubmit} />
// </>

*/
