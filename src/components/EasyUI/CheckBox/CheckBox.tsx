import React from 'react';
import style from './CheckBox.module.css';

// Checkbox component

interface CheckBoxProp {
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    className?: string;
    label?: string;
}

export const CheckBoxComponent: React.FC<CheckBoxProp> = ({
    checked,
    onChange,
    type = 'checkbox',
    label = 'Check Box',
    className = '',
}) => {
    return (
        <label className={`${style.CheckBoxComponentLabel} ${className}`}>
            <input
                type={type}
                checked={checked}
                aria-label={label}
                onChange={onChange}
                className={`${style.CheckBoxComponentInput} ${className}`}
            />
            {label}
        </label>
    );
};

/*

USAGE EXAMPLES:

// 1. Basic controlled checkbox:
//const [isChecked, setIsChecked] = React.useState(false);
//<CheckBoxComponent
//  checked={isChecked}
//  onChange={(e) => setIsChecked(e.target.checked)}
///>

// 2. With custom label:
// <CheckBoxComponent
//   checked={isChecked}
//   onChange={(e) => setIsChecked(e.target.checked)}
//   label="Subscribe to newsletter"
// />

// 3. With custom style:
// <CheckBoxComponent
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
//   <CheckBoxComponent
//     checked={fruits.includes("Apple")}
//     onChange={(e) => handleFruitChange("Apple", e.target.checked)}
//     label="Apple"
//   />
//   <CheckBoxComponent
//     checked={fruits.includes("Banana")}
//     onChange={(e) => handleFruitChange("Banana", e.target.checked)}
//     label="Banana"
//   />
//   <CheckBoxComponent
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
//   <CheckBoxComponent
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
