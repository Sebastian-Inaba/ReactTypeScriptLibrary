import React from 'react';
import './App.css';
import {
  ButtonComponent,
  InputFieldComponent,
  TextAreaComponent,
  InputRadioComponent,
  InputCheckBoxComponent,
  SelectDropdownComponent,
  ToggleSwitchComponent,
} from './components/basic';

// This is currently used as a playground for testing the components.
// It will be replaced with a more structured example in the future.

function App() {
  // Inputs state
  const [inputValueButtonInputExample, setInputValueButtonInputExample] = React.useState('');
  const [inputValueEmailFormExample, setInputValueEmailFormExample] = React.useState('');
  const [inputValueTextFormExample, setInputValueTextFormExample] = React.useState('');

  // Radio state (only one favorite fruit selected)
  const [favoriteFruit, setFavoriteFruit] = React.useState('apple');

  // Checkboxes state
  const [weeklyNewsletter, setWeeklyNewsletter] = React.useState(true);
  const [promoEmails, setPromoEmails] = React.useState(false);

  // Toggle switches state
  const [darkMode, setDarkMode] = React.useState(true);
  const [notifications, setNotifications] = React.useState(false);

  // Select dropdown state
  const [selectedCountry, setSelectedCountry] = React.useState('');

  // Handlers
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
    <div className="wrapper">
      {/* Simple Button */}
      <section>
        <h3>Simple Button Example:</h3>
        <ButtonComponent label="Im A Button" onClick={() => alert('You Clicked Me!')} />
      </section>

      {/* Button + InputField */}
      <section>
        <h3>Button and Input Field Example:</h3>
        <ButtonComponent label="Im A Button for the Input" onClick={handleButtonInputExample} />
        <InputFieldComponent
          value={inputValueButtonInputExample}
          onChange={(e) => setInputValueButtonInputExample(e.target.value)}
          type="text"
          placeholder="Write text here"
        />
      </section>

      {/* Email + Textarea form */}
      <section>
        <h3>Email and Text Area Form Example:</h3>
        <ButtonComponent label="Im A Button for the TextArea" onClick={handleEmailFormExample} type="submit" />
        <InputFieldComponent
          value={inputValueEmailFormExample}
          onChange={(e) => setInputValueEmailFormExample(e.target.value)}
          type="email"
          placeholder="Enter your email"
          label="Email input"
          className={inputValueEmailFormExample.includes('@') ? 'valid' : 'invalid'}
        />
        <TextAreaComponent
          value={inputValueTextFormExample}
          onChange={(e) => setInputValueTextFormExample(e.target.value)}
          placeholder="Enter text here"
          label="Text Area"
          className="TextAreaComponentStyle"
        />
      </section>

      {/* Radio buttons */}
      <section>
        <h3>Choose your favorite fruit:</h3>
        <InputRadioComponent
          name="favoriteFruit"
          value="apple"
          label="🍎 Apple"
          checked={favoriteFruit === 'apple'}
          onChange={(e) => setFavoriteFruit(e.target.value)}
        />
        <InputRadioComponent
          name="favoriteFruit"
          value="banana"
          label="🍌 Banana"
          checked={favoriteFruit === 'banana'}
          onChange={(e) => setFavoriteFruit(e.target.value)}
        />
        <InputRadioComponent
          name="favoriteFruit"
          value="cherry"
          label="🍒 Cherry"
          checked={favoriteFruit === 'cherry'}
          onChange={(e) => setFavoriteFruit(e.target.value)}
        />
      </section>

      {/* Checkboxes */}
      <section>
        <h3>Newsletter Preferences:</h3>
        <InputCheckBoxComponent
          checked={weeklyNewsletter}
          onChange={(e) => setWeeklyNewsletter(e.target.checked)}
          label="Receive weekly newsletter"
        />
        <InputCheckBoxComponent
          checked={promoEmails}
          onChange={(e) => setPromoEmails(e.target.checked)}
          label="Receive promotional emails"
        />
      </section>

      {/* Select Dropdown */}
      <section>
        <h3>Choose your country:</h3>
        <SelectDropdownComponent
          options={[
            { value: 'jp', label: '🇯🇵 Japan' },
            { value: 'se', label: '🇸🇪 Sweden' },
            { value: 'us', label: '🇺🇸 United States' },
            { value: 'de', label: '🇩🇪 Germany' },
          ]}
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          placeholder="Select your country"
        />
      </section>

      {/* Toggle switches */}
      <section>
        <h3>App Settings:</h3>
        <ToggleSwitchComponent
          checked={darkMode}
          onChange={(e) => setDarkMode(e.target.checked)}
          label="🌙 Enable Dark Mode"
        />
        <ToggleSwitchComponent
          checked={notifications}
          onChange={(e) => setNotifications(e.target.checked)}
          label="🔔 Enable Notifications"
        />
      </section>
    </div>
  );
}

export default App;
