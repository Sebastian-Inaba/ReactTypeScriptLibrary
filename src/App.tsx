import React from 'react';
import './App.css';
import { ButtonComponent, InputFieldComponent, TextAreaComponent } from './components/basic';


// Im treating this area as a playground for the components, i might make a better playground later sometime in the future other then just a centered wrapper
function App() {
  const [inputValueButtonInputExample, setInputValueButtonInputExample] = React.useState('');
  const [inputValueEmailFormExample, setInputValueEmailFormExample] = React.useState('');
  const [inputValueTextFormExample, setInputValueTextFormExample] = React.useState('');

  const handleButtonInputExample = () => {
    if (inputValueButtonInputExample === '') {
      alert('You clicked the button without input!');
    } else {
      alert(inputValueButtonInputExample);
    }
  };

  const handleEmailFormExample = () => {
    if (inputValueEmailFormExample === '' && inputValueTextFormExample === '') {
      alert('You clicked the button without input or text!');
    } else {
      alert(`Email: ${inputValueEmailFormExample}\nText: ${inputValueTextFormExample}`);
    }
  };

  return (
    <div className='wrapper'>
      <section>
        <ButtonComponent label="Im A Button" onClick={() => alert("You Clicked Me!")}></ButtonComponent>
      </section>
      <section>
        <ButtonComponent label="Im A Button for the Input" onClick={handleButtonInputExample}></ButtonComponent>
        <InputFieldComponent 
          value={inputValueButtonInputExample} 
          onChange={(e) => setInputValueButtonInputExample(e.target.value)}
          type='text' 
          placeholder='Write text here'
        />
      </section>
      <section>
        <ButtonComponent label="Im A Button for the TextArea" onClick={handleEmailFormExample} type='submit'></ButtonComponent>
        <InputFieldComponent
          value={inputValueEmailFormExample}
          onChange={(e) => setInputValueEmailFormExample(e.target.value)}
          type="email"
          placeholder="Enter your email"
          label="Email input"
          className={inputValueEmailFormExample.includes('@') ? "valid" : "invalid"}
        />
        <TextAreaComponent
          value={inputValueTextFormExample}
          onChange={(e) => setInputValueTextFormExample(e.target.value)}
          placeholder="Enter text here"
          label="Text Area"
          className="TextAreaComponentStyle"
        />
      </section>
    </div>
  );
}

export default App;
