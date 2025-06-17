import React from 'react';
import './App.css';
import { ButtonComponent } from './components/basic';

function App() {
  return (
    <ButtonComponent label="Im A Button" onClick={() => alert("You Clicked Me!")}></ButtonComponent>
  );
}

export default App;
