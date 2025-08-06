import React from 'react';
import style from './SelectDropdown.module.css';

// Dropdown component

interface OptionProp {
    value: string;
    label: string;
}

interface SelectDropdownProp {
    options: OptionProp[]; // Array of the optionprop
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder?: string;
    label?: string;
    className?: string;
}

export const SelectDropdownComponent: React.FC<SelectDropdownProp> = ({
    options,
    value,
    onChange,
    placeholder = 'Select an option',
    label = 'Select Dropdown',
    className = '',
}) => {
    return (
        <label className={`${style.SelectDropdownComponentLabel} ${className}`}>
            <span className={`${style.SelectDropdownComponentSpan} ${className}`}>{label}</span>
            <select
                className={`${style.SelectDropdownComponentSelect} ${className}`}
                value={value}
                onChange={onChange}
                aria-label={placeholder}
            >
                <option value="" disabled>
                    {placeholder} {/* Placeholder option, disabled to prevent selection */}
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label} {/* Display label for each option */}
                    </option>
                ))}
            </select>
        </label>
    );
};

/*

USAGE EXAMPLES:

// 1. Basic dropdown with predefined values:
// const [selectedFruit, setSelectedFruit] = React.useState("");
// 
// const fruitOptions = [
//   { value: "apple", label: "Apple 🍎" },
//   { value: "banana", label: "Banana 🍌" },
//   { value: "cherry", label: "Cherry 🍒" },
// ];
// 
// <SelectDropdownComponent
//   options={fruitOptions}
//   value={selectedFruit}
//   onChange={(e) => setSelectedFruit(e.target.value)}
// />

// 2. With custom label and custom styling:
// <SelectDropdownComponent
//   options={fruitOptions}
//   value={selectedFruit}
//   onChange={(e) => setSelectedFruit(e.target.value)}
//   label="Pick your favorite fruit"
//   labelClassName={style.myLabelStyle}
//   selectClassName={style.mySelectStyle}
// />

// 3. Inside a form with other components:
// const [formData, setFormData] = React.useState({
//   name: "",
//   color: ""
// });
// 
// const colorOptions = [
//   { value: "red", label: "Red 🔴" },
//   { value: "green", label: "Green 🟢" },
//   { value: "blue", label: "Blue 🔵" },
// ];
// 
// const handleFormSubmit = () => {
//   if (formData.name === "" || formData.color === "") {
//     alert("Please fill out all fields.");
//   } else {
//     alert(`Hello ${formData.name}, your favorite color is ${formData.color}`);
//   }
// };
// 
// <>
//   <InputFieldComponent
//     value={formData.name}
//     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//     placeholder="Enter your name"
//     label="Name"
//   />
// 
//   <SelectDropdownComponent
//     options={colorOptions}
//     value={formData.color}
//     onChange={(e) => setFormData({ ...formData, color: e.target.value })}
//     label="Favorite Color"
//   />
// 
//   <ButtonComponent
//     label="Submit"
//     onClick={handleFormSubmit}
//   />
// </>

*/
