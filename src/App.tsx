import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import {
    ButtonComponent,
    InputFieldComponent,
    TextAreaComponent,
    InputRadioComponent,
    InputCheckBoxComponent,
    SelectDropdownComponent,
    ToggleSwitchComponent,
    BadgeComponent,
    AvatarComponent,
    ToolTipComponent,
    DividerComponent,
    ProgressBarComponent,
    AlertNotificationComponent,
    CardComponent,
    PopupComponent,
} from './components/basic';

// This is currently used as a playground for testing the components.
// It will be replaced with a more structured example in the future.

function App() {
  // Inputs state
    const [inputValueButtonInputExample, setInputValueButtonInputExample] = useState('');
    const [inputValueEmailFormExample, setInputValueEmailFormExample] = useState('');
    const [inputValueTextFormExample, setInputValueTextFormExample] = useState('');
    const [favoriteFruit, setFavoriteFruit] = useState('apple');
    const [weeklyNewsletter, setWeeklyNewsletter] = useState(true);
    const [promoEmails, setPromoEmails] = useState(false);
    const [darkMode, setDarkMode] = React.useState(true);
    const [notifications, setNotifications] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

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

    const handleProgressComponentStart = () => {
        setProgress(0);
        const duration = 10000; // 10 seconds
        const startTime = performance.now();

        const updateProgress = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const newProgress = Math.floor((elapsedTime / duration) * 100);
            setProgress(newProgress);

            if (newProgress < 100) {
                requestAnimationFrame(updateProgress);
            }
        };

        requestAnimationFrame(updateProgress);
    };

    return (
        <Routes>
        <Route path="/" element={
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

                {/* Badge */}
                <section>
                    <h3>Badge Example</h3>
                    <BadgeComponent label="New!" icon="🔥" />
                </section>
                
                {/* Avatar */}
                <section>
                    <h3>Avatar Examples</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AvatarComponent name="Anna Banana" size="small" />
                        <AvatarComponent name="Jack Back" size="medium" />
                        <AvatarComponent name="Bob" size="large" />
                        <AvatarComponent src="/images/meyoung.jpg" alt="User Avatar" size="large" />
                    </div>
                </section>

                {/* ToolTip */}
                <section>
                    <h3>Tooltip Example</h3>
                    <ToolTipComponent text="This is a tooltip!" position='relative'>
                            <button>Hover me</button>
                    </ToolTipComponent>
                </section>

                {/* Divider */}
                <section>
                    <h3>Divider Example</h3>
                    <p>Above divider</p>
                    <DividerComponent />
                    <p>Below divider</p>

                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span>Left</span>
                            <DividerComponent vertical />
                        <span>Right</span>
                    </div>
                </section>
                
                {/* Progress Bar */}
                <section>
                    <h3>Interactive Progress Bar Example</h3>
                    {/* Button to kick off the progress */}
                    <ButtonComponent label="Start" onClick={handleProgressComponentStart} />

                    {/* The ProgressBarComponent will animate to `progress` */}
                    <ProgressBarComponent
                    progress={progress}
                    progressText="Downloading something maybe"
                    progressTextPosition="bottom"
                    percentagePosition="inside"
                    striped
                    animated
                    />
                </section>

                {/* Alert / Notification */}
                <section>
                    <ButtonComponent 
                        label='Show alert/notification'
                        onClick={() => setShowNotification(true)}
                    />
                    
                    {showNotification && (
                        <AlertNotificationComponent
                        type="success"
                        position="topCenter"
                        title="Notification"
                        message="This is your alert message"
                        onAction={() => setShowNotification(false)}
                        actionLabel='I do nothing'
                        onClose={() => setShowNotification(false)}
                        />
                    )}
                </section>
                
                {/* Card */}
                <section>
                    <CardComponent
                        clickType={{ type: 'action', onAction: () => {}, actionLabel: "click"}} 
                        src='/images/meyoung.jpg'
                        title='Card title'
                        message="This is a description of the card content"
                        cardAlt="Descriptive alt text for image"
                        tags={['Tag1', 'Tag2']}
                    />
                </section>

                {/* Popup */}
                <section>
                    <button onClick={() => setIsPopupOpen(true)}>Show Popup</button>

                    <PopupComponent
                        isOpen={isPopupOpen}
                        onClose={() => setIsPopupOpen(false)}
                        title="Confirm Delete"
                        message='Are you sure?'
                    />
                </section>
            </div>
        } />
        <Route path="/test" element={<div>Test Route - Card link works!</div>} />
        </Routes>
    );
}

export default App;