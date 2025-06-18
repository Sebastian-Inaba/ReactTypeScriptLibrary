import React from 'react'; // Import React to use JSX and create components
import style from './basic.module.css'; // Import CSS module for styling the input field component

// Define the properties that the InputFieldComponent will accept with interface
interface InputFieldProp {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    // Required function that takes an event (from an <input>) and returns nothing.
    // This defines how an input change handler should be structured. 
    type?: string;
    placeholder?: string;
    label?: string;
    className?: string;
}

// The InputFieldComponent functional component 
// last time the button component was made, it was a bit more customizable in code
// This time we already define the properties inside the component
const InputFieldComponent: React.FC<InputFieldProp> = ({
    value, // Default value is an empty string
    onChange, // Function to handle changes in input value
    type = "text", // Default type is text
    placeholder = "Enter text here", // Default placeholder text
    label = "Input Field", // Default label for accessibility
    className = style.InputFieldComponentStyle, // Default class name for styling
}) => {
    return (
        <input
            className={className}
            type={type}
            value={value}
            placeholder={placeholder}
            aria-label={label}
            onChange ={onChange}  
        />           
    );
};

export default InputFieldComponent; // Export the InputFieldComponent so it can be used in other parts of the application

/*

USAGE EXAMPLES:

// 1. Controlled with simple state in parent component:
// const [text, setText] = React.useState("");
// <InputFieldComponent value={text} onChange={e => setText(e.target.value)} />

// 2. With placeholder and label:
// <InputFieldComponent
//    value={text}
//    onChange={e => setText(e.target.value)}
//    placeholder="Enter your name"
//    label="Name input"
// />

// 3. Password input:
// <InputFieldComponent
//    value={password}
//    onChange={e => setPassword(e.target.value)}
//    type="password"
//    placeholder="Enter your password"
//    label="Password input"
// />

// 4. Styling with additional className:
// <InputFieldComponent
//    value={email}
//    onChange={e => setEmail(e.target.value)}
//    placeholder="Email"
//    className="myCustomInputClass"
// />

// 5. Validation example (inside parent):
// const [email, setEmail] = React.useState("");
// const isValidEmail = email.includes("@");
// <InputFieldComponent
//    value={email}
//    onChange={e => setEmail(e.target.value)}
//    placeholder="Enter your email"
//    label="Email input"
//    className={isValidEmail ? "valid" : "invalid"}
// />

// 6. Using in a form:
// const LoginForm: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert(`Logging in with\nEmail: ${email}\nPassword: ${password}`);
//   };
//
//   return (
//     <form onSubmit={handleSubmit}>
//       <InputFieldComponent
//         value={email}
//         onChange={e => setEmail(e.target.value)}
//         type="email"
//         placeholder="Enter your email"
//         label="Email"
//       />
//       <InputFieldComponent
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//         type="password"
//         placeholder="Enter your password"
//         label="Password"
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };
//
// export default LoginForm;

// 7. Extra example with day 1 button component:
// const [inputValue, setInputValue] = React.useState('');
//
// const handelButtonInputExample = () => {
//   if (inputValue === '') {
//     alert('You clicked the button without input!');
//   } else {
//     alert(inputValue);
//   }
// };
//
// <ButtonComponent label="Im A Button for the Input" onClick={handelButtonInputExample}></ButtonComponent>
// <InputFieldComponent 
//    value={inputValue} 
//    onChange={(e) => setInputValue(e.target.value)}
//    type='text' 
//    placeholder='Write text here'
// />

*/