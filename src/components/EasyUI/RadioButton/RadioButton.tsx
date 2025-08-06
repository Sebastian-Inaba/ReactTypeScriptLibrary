import React from 'react';
import style from './RadioButton.module.css';

interface RadioButtonProp {
    name: string;
    value: string;
    label?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    checked?: boolean;
}

export const RadioButtonComponent: React.FC<RadioButtonProp> = ({
    name,
    value,
    onChange,
    label,
    className = '',
    checked,
}) => {
    return (
        <label className={`${style.RadioButtonComponentLabel} ${className}`}>
            <input
                type="radio" // hard coded to be radio so we don't need it as prop
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className={`${style.RadioButtonComponentInput} ${className}`}
                aria-label={label}
            />
            {label ?? value}{' '}
            {/*label and value, if there is a label, display it, if not display value*/}
        </label>
    );
};

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
