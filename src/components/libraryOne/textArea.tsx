import React from "react"; // Import React to use JSX and create components
import style from "./basic.module.css"; // Import CSS module for styling the text area component

interface TextAreaProp {
    value: string; // The value of the textarea, required for controlled components
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void; 
    // Required function that takes an event (from an <textarea>) and returns nothing.
    // This defines how an textarea change handler should be structured. 
    placeholder?: string; 
    label?: string; 
    className?: string; 
}

// The TextAreaComponent functional component
const TextAreaComponent: React.FC<TextAreaProp> = ({
    value, // Default value is an empty string
    onChange, // Function to handle changes in textarea value
    placeholder = "Enter text here", // Default placeholder text
    label = "Text Area", // Default label for accessibility
    className = style.TextAreaComponentStyle, // Default class name for styling
}) => {
    return (
        <textarea
            className={className}
            value={value}
            placeholder={placeholder}
            aria-label={label}
            onChange={onChange}  
        />           
    );
};

export default TextAreaComponent; // Export the TextAreaComponent so it can be used in other parts of the application

/*

USAGE EXAMPLES:

// 1. Simple controlled usage with state in parent component:
// const [description, setDescription] = React.useState("");
// <TextAreaComponent
//   value={description}
//   onChange={e => setDescription(e.target.value)}
// />

// 2. With placeholder and label:
// <TextAreaComponent
//   value={description}
//  onChange={e => setDescription(e.target.value)}
//  placeholder="Write your comment..."
//  label="Comment box"
// />

// 3. Multiline feedback form input:
// const [feedback, setFeedback] = React.useState("");
// <form onSubmit={e => { e.preventDefault(); alert("Feedback submitted!"); }}>
//   <TextAreaComponent
//     value={feedback}
//     onChange={e => setFeedback(e.target.value)}
//     placeholder="Your feedback"
//     label="Feedback"
//   />
//   <ButtonComponent label="Submit" type="submit" />
// </form>

// 4. TextArea with dynamic character count:
// const [bio, setBio] = React.useState("");
// <p>{bio.length}/200 characters</p>
// <TextAreaComponent
//   value={bio}
//   onChange={e => setBio(e.target.value.slice(0, 200))}
// />

// 5. Styled TextArea with custom className:
// <TextAreaComponent
//   value={notes}
//   onChange={e => setNotes(e.target.value)}
//   className="customTextarea"
// />

// 6. Disabled TextArea (read-only use case):
// <TextAreaComponent
//   value="You can't edit this."
//   onChange={() => {}}
//   className="readOnlyTextarea"
//   label="Read-only"
// />

// 7. Form example with the other components:
// const [inputValueEmailFormExample, setInputValueEmailFormExample] = React.useState('');
// const [inputValueTextFormExample, setInputValueTextFormExample] = React.useState('');
//
// const handleEmailFormExample = () => {
//   if (inputValueEmailFormExample === '' && inputValueTextFormExample === '') {
//     alert('You clicked the button without input or text!');
//   } else {
//     alert(`Email: ${inputValueEmailFormExample}\nText: ${inputValueTextFormExample}`);
//   }
// };
//
// <ButtonComponent label="Im A Button for the TextArea" onClick={handleEmailFormExample} type='submit'></ButtonComponent>
// <InputFieldComponent
//   value={inputValueEmailFormExample}
//   onChange={(e) => setInputValueEmailFormExample(e.target.value)}
//   type="email"
//   placeholder="Enter your email"
//   label="Email input"
//   className={inputValueEmailFormExample.includes('@') ? "valid" : "invalid"}
// />
// <TextAreaComponent
//   value={inputValueTextFormExample}
//   onChange={(e) => setInputValueTextFormExample(e.target.value)}
//   placeholder="Enter text here"
//   label="Text Area"
//   className="TextAreaComponentStyle"
// />

*/