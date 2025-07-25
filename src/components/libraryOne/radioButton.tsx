import React from 'react';
import style from './basic.module.css';

interface InputRadioButtonProp {
    type?: "radio"; // The type of input, default is "radio", since this is a radio button component
    name: string; // The name of the radio button group is required, used to group radio buttons together
    value: string; // The value of the radio button is required, used to identify which option is selected for form submission
    label?: string; // Optional label for the radio button, displayed for user clarity
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    checked?: boolean;
    labelClassName?: string; 
    inputClassName?: string;
}

const InputRadioButtonComponent: React.FC<InputRadioButtonProp> = ({
    type, // Type is fixed to "radio" for this component, so it can be omitted(aka not required here)
    // This means that the type is hard coded to "radio" and does not need to be passed as a prop
    // however, if this was not a radio button and we wanted to keep the input type flexible, we could have used the type prop
    name,
    value,
    onChange,
    labelClassName = style.labelRadioButtonComponentStyle,
    inputClassName = style.InputRadioButtonComponentStyle,
    checked,
    label,
}) => {
    return (
        <label className={labelClassName}>
        <input
            type="radio" // Radio button type is fixed to "radio"
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            className={inputClassName}
            aria-label={label}
        />
        {label ?? value} {/*label and value, if there is a label, display it, if not display value*/}
        </label>
    );
};

export default InputRadioButtonComponent;

/*

USAGE EXAMPLES:

// 1. Basic controlled radio button:
// const [selectedOption, setSelectedOption] = React.useState('');
// <InputRadioButtonComponent
//   name="choices"
//   value="Option A"
//   checked={selectedOption === "Option A"}
//   onChange={(e) => setSelectedOption(e.target.value)}
//   label="Option A"
// />
// <InputRadioButtonComponent
//   name="choices"
//   value="Option B"
//   checked={selectedOption === "Option B"}
//   onChange={(e) => setSelectedOption(e.target.value)}
//   label="Option B"
// />

// 2. With custom label text (different from value):
// const [selected, setSelected] = React.useState('');
// <InputRadioButtonComponent
//   name="newsletter"
//   value="daily"
//   label="Daily Updates"
//   checked={selected === "daily"}
//   onChange={(e) => setSelected(e.target.value)}
// />
// <InputRadioButtonComponent
//   name="newsletter"
//   value="weekly"
//   label="Weekly Digest"
//   checked={selected === "weekly"}
//   onChange={(e) => setSelected(e.target.value)}
// />

// 3. With custom styling:
// <InputRadioButtonComponent
//   name="theme"
//   value="light"
//   label="Light Mode"
//   checked={selectedTheme === "light"}
//   onChange={(e) => setSelectedTheme(e.target.value)}
//   className="customRadioLabel"
// />

// 4. Dynamic group from array:
// const options = ["Beginner", "Intermediate", "Advanced"];
// const [level, setLevel] = React.useState("");
// {options.map((opt) => (
//   <InputRadioButtonComponent
//     key={opt}
//     name="difficulty"
//     value={opt}
//     checked={level === opt}
//     onChange={(e) => setLevel(e.target.value)}
//     label={opt}
//   />
// ))}

// 5. Example with other components (InputField + Button):
// const [email, setEmail] = React.useState('');
// const [plan, setPlan] = React.useState('');
// 
// const handleSubscribe = () => {
//   if (!email || !plan) {
//     alert('Please enter your email and choose a plan.');
//   } else {
//     alert(`Subscribed ${email} to the ${plan} plan.`);
//   }
// };
// 
// <>
//   <InputFieldComponent
//     value={email}
//     onChange={(e) => setEmail(e.target.value)}
//     type="email"
//     placeholder="Enter your email"
//     label="Email Address"
//   />
//   <InputRadioButtonComponent
//     name="plan"
//     value="basic"
//     label="Basic Plan"
//     checked={plan === "basic"}
//     onChange={(e) => setPlan(e.target.value)}
//   />
//   <InputRadioButtonComponent
//     name="plan"
//     value="premium"
//     label="Premium Plan"
//     checked={plan === "premium"}
//     onChange={(e) => setPlan(e.target.value)}
//   />
//   <ButtonComponent
//     label="Subscribe"
//     onClick={handleSubscribe}
//   />
// </>

*/
