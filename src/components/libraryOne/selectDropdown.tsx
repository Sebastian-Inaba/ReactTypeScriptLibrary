import React from "react";
import style from "./basic.module.css";

// OptionProp defines the structure of each option in the dropdown, you can add more properties if needed
interface OptionProp {
    value: string; 
    label: string; 
}

interface SelectDropdownProp {
    options: OptionProp[]; // Array of options to display in the dropdown
    value: string; 
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; 
    placeholder?: string; 
    labelClassName?: string,
    selectClassName?: string,
    spanClassName?: string;
    label?: string; 
}

const SelectDropdownComponent: React.FC<SelectDropdownProp> = ({ 
    options,
    value,
    onChange,
    placeholder = "Select an option",
    labelClassName = style.labelSelectDropdownComponentStyle,
    selectClassName = style.selectDropdownComponentStyle,
    spanClassName = style.spanSelectDropdownComponentStyle,
    label = "Select Dropdown",
}) => {
    return (
        <label className={labelClassName}>
            <span className={spanClassName}>{label}</span>
            <select
                className={selectClassName}
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
}

export default SelectDropdownComponent;

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
