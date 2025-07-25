// this components is basically the checkbox component but with style to look like a toggle/switch

import React from 'react'; // Import React to create functional components
import style from './basic.module.css'; // Import CSS module for styling

// Define the properties this toggle switch accepts
interface ToggleSwitchProp {
    checked: boolean; 
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; 
    label?: string; 
    labelClassName?: string; 
    inputClassName?: string; 
}

// The ToggleSwitchComponent functional component definition
const ToggleSwitchComponent: React.FC<ToggleSwitchProp> = ({
    checked,
    onChange,
    label = "Switch",
    labelClassName = style.labelToggleSwitchComponentStyle, // Default label CSS class
    inputClassName = style.inputToggleSwitchComponentStyle, // Default hidden input CSS class
}) => {
    return (
        <label className={labelClassName}>
        {/* Hidden checkbox input controlling the toggle state */}
        <input
            type="checkbox" // Hard coded to "checkbox" since this is a toggle switch
            checked={checked} 
            onChange={onChange} 
            className={inputClassName} 
            aria-label={label} 
        />
        {/* Visual slider*/}
        <span className={style.slider}></span>
        {label}
        </label>
    );
};

export default ToggleSwitchComponent; // Export for use in other files


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
