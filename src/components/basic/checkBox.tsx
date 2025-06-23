import React from 'react'; // Import React to use JSX and create components
import style from './basic.module.css'; // Import CSS module for styling the input field component

// Define the properties that the InputFieldComponent will accept with interface
interface InputCheckBoxProp {
    checked: boolean; // Indicates whether the checkbox is checked
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    // Required function that takes an event (from an <input>) and returns nothing.
    // This defines how an input change handler should be structured. 
    type?: string;
    labelClassName?: string; 
    inputClassName?: string;
    label?: string; // Optional label for the checkbox, displayed for user clarity
}

// The InputCheckBoxComponent functional component
const InputCheckBoxComponent: React.FC<InputCheckBoxProp> = ({
    checked,
    onChange,
    type = "checkbox",
    label = "Check Box",
    labelClassName = style.labelCheckBoxComponentStyle,
    inputClassName = style.InputCheckBoxComponentStyle,
}) => {
    return (
        <label className={labelClassName}>
            <input
                type={type}
                checked={checked}
                aria-label={label}
                onChange={onChange}
                className={inputClassName}
            />
            {label}
        </label>
);
}

export default InputCheckBoxComponent; // Export the InputCheckBoxComponent so it can be used in other parts of the application

/*

USAGE EXAMPLES:

// 1. Basic controlled checkbox:
//const [isChecked, setIsChecked] = React.useState(false);
//<InputCheckBoxComponent
//  checked={isChecked}
//  onChange={(e) => setIsChecked(e.target.checked)}
///>

// 2. With custom label:
// <InputCheckBoxComponent
//   checked={isChecked}
//   onChange={(e) => setIsChecked(e.target.checked)}
//   label="Subscribe to newsletter"
// />

// 3. With custom style:
// <InputCheckBoxComponent
//   checked={isChecked}
//   onChange={(e) => setIsChecked(e.target.checked)}
//   label="I accept the terms"
//   className="myCustomCheckboxClass"
// />

// 4. Multiple checkboxes (checkbox group):
// const [fruits, setFruits] = React.useState<string[]>([]);
// 
// const handleFruitChange = (fruit: string, checked: boolean) => {
//   setFruits(prev =>
//     checked ? [...prev, fruit] : prev.filter(f => f !== fruit)
//   );
// };
// 
// <>
//   <InputCheckBoxComponent
//     checked={fruits.includes("Apple")}
//     onChange={(e) => handleFruitChange("Apple", e.target.checked)}
//     label="Apple"
//   />
//   <InputCheckBoxComponent
//     checked={fruits.includes("Banana")}
//     onChange={(e) => handleFruitChange("Banana", e.target.checked)}
//     label="Banana"
//   />
//   <InputCheckBoxComponent
//     checked={fruits.includes("Cherry")}
//     onChange={(e) => handleFruitChange("Cherry", e.target.checked)}
//     label="Cherry"
//   />
// </>

// 5. Example with ButtonComponent and InputFieldComponent:
// const [username, setUsername] = React.useState('');
// const [agreed, setAgreed] = React.useState(false);
// 
// const handleFormSubmit = () => {
//   if (username === '' || !agreed) {
//     alert('Please enter your name and agree to the terms.');
//   } else {
//     alert(`Welcome, ${username}!`);
//   }
// };
// 
// <>
//   <InputFieldComponent
//     value={username}
//     onChange={(e) => setUsername(e.target.value)}
//     placeholder="Enter your name"
//     label="Username"
//   />
//   <InputCheckBoxComponent
//     checked={agreed}
//     onChange={(e) => setAgreed(e.target.checked)}
//     label="I agree to the terms and conditions"
//   />
//   <ButtonComponent
//     label="Submit"
//     onClick={handleFormSubmit}
//   />
// </>

*/
