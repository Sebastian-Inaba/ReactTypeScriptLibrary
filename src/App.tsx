import React from 'react';
import './App.css';
import { ButtonComponent, InputFieldComponent } from './components/basic';

function App() {
  const [inputValue, setInputValue] = React.useState('');

  const handelButtonInputExample = () => {
    if (inputValue === '') {
      alert('You clicked the button without input!');
    } else {
      alert(inputValue);
    }
  };

  return (
    <div className='wrapper'>
      <section>
        <ButtonComponent label="Im A Button" onClick={() => alert("You Clicked Me!")}></ButtonComponent>
      </section>
      <section>
        <ButtonComponent label="Im A Button for the Input" onClick={handelButtonInputExample}></ButtonComponent>
        <InputFieldComponent 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
          type='text' 
          placeholder='Write text here'
        />
      </section>
    </div>
  );
}

export default App;
