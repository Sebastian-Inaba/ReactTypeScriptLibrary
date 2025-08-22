import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import {
    ButtonComponent,
    InputFieldComponent,
    TextAreaComponent,
    RadioButtonComponent,
    CheckBoxComponent,
    SelectDropdownComponent,
    ToggleSwitchComponent,
    BadgeComponent,
    AvatarComponent,
    ToolTipComponent,
    DividerComponent,
    ProgressBarComponent,
    AlertComponent,
    CardComponent,
    ModalComponent,
    AccordionComponent,
    TabsComponent,
    ToastNotificationComponent,
    CounterComponent,
    StarRatingComponent,
    PasswordVisibilityComponent,
    ImageCarouselComponent,
    StepUIComponent,
    ValidationFormComponent,
    FileUploaderComponent,
    ColorPickerComponent,
} from './components/index';

// This is currently used as a playground for testing the components.
// It will be replaced with a more structured layout with example and in browser playground in the future.

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
    const [showAlert, setShowAlert] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showStepper, setShowStepper] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [file, setFile] = useState<File | null>(null);

    // Variables
    const averageRating = 4.2;
    const catImages = [
        'https://www.placecats.com/neo_banana/400/300',
        'https://www.placecats.com/bella/400/300',
        'https://www.placecats.com/neo_2/400/300',
        'https://www.placecats.com/millie_neo/400/300',
        'https://www.placecats.com/millie/400/300',
    ];

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

    // App
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <div className="wrapper">
                        <div className="EasyUIWrapper">
                            <h1>Easy UI Components</h1>

                            {/* Button: components/EasyUI/Button/Button.tsx*/}
                            <section>
                                <h3>Simple Button Example:</h3>
                                <ButtonComponent label="Im A Button" onClick={() => alert('You Clicked Me!')} />
                            </section>

                            {/* Button + InputField: components/EasyUI/Button/Button.tsx | components/EasyUI/InputField/InputField.tsx*/}
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

                            {/* Button + InputField + TextArea: components/EasyUI/Button/Button.tsx | components/EasyUI/InputField/InputField.tsx | components/EasyUI/TextArea/TextArea.tsx */}
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

                            {/* CheckBox: components/EasyUI/CheckBox/CheckBox.tsx */}
                            <section>
                                <h3>Newsletter Preferences:</h3>
                                <CheckBoxComponent
                                    checked={weeklyNewsletter}
                                    onChange={(e) => setWeeklyNewsletter(e.target.checked)}
                                    label="Receive weekly newsletter"
                                />
                                <CheckBoxComponent
                                    checked={promoEmails}
                                    onChange={(e) => setPromoEmails(e.target.checked)}
                                    label="Receive promotional emails"
                                />
                            </section>

                            {/* RadioButtonComponent: components/EasyUI/RadioButton/RadioButton.tsx */}
                            <section>
                                <h3>Choose your favorite fruit:</h3>
                                <RadioButtonComponent
                                    name="favoriteFruit"
                                    value="apple"
                                    label="🍎 Apple"
                                    checked={favoriteFruit === 'apple'}
                                    onChange={(e) => setFavoriteFruit(e.target.value)}
                                />
                                <RadioButtonComponent
                                    name="favoriteFruit"
                                    value="banana"
                                    label="🍌 Banana"
                                    checked={favoriteFruit === 'banana'}
                                    onChange={(e) => setFavoriteFruit(e.target.value)}
                                />
                                <RadioButtonComponent
                                    name="favoriteFruit"
                                    value="cherry"
                                    label="🍒 Cherry"
                                    checked={favoriteFruit === 'cherry'}
                                    onChange={(e) => setFavoriteFruit(e.target.value)}
                                />
                            </section>

                            {/* ToggleSwitch:  components/EasyUI/ToggleSwitch/ToggleSwitch.tsx */}
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

                            {/* SelectDropdown: components/EasyUI/SelectDropdown/SelectDropdown.tsx */}
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

                            {/* Badge: components/EasyUI/Badge/Badge.tsx */}
                            <section>
                                <h3>Badge Example</h3>
                                <BadgeComponent label="New!" icon="🔥" />
                            </section>

                            {/* Avatar: components/EasyUI/Badge/Badge.tsx  */}
                            <section>
                                <h3>Avatar Examples</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <AvatarComponent name="Anna Banana" size="small" />
                                    <AvatarComponent name="Jack Back" size="medium" />
                                    <AvatarComponent name="Bob" size="large" />
                                    <AvatarComponent src="/images/meyoung.jpg" alt="User Avatar" size="large" />
                                </div>
                            </section>

                            {/* ToolTip: components/EasyUI/ToolTip/ToolTip.tsx */}
                            <section>
                                <h3>Tooltip Example</h3>
                                <ToolTipComponent text="This is a tooltip!" position="relative">
                                    <button>Hover me</button>
                                </ToolTipComponent>
                            </section>

                            {/* Divider: components/EasyUI/Divider/Divider.tsx */}
                            <section>
                                <h3>Divider Example</h3>
                                <p>Above divider</p>
                                <DividerComponent />
                                <p>Below divider</p>

                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <span>Left</span>
                                    <DividerComponent vertical />
                                    <span>Right</span>
                                </div>
                            </section>

                            {/* ProgressBar + Button: components/EasyUI/Button/Button.tsx | components/EasyUI/ProgressBar/ProgressBar.tsx */}
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

                            {/* Alert + Button: components/EasyUI/Button/Button.tsx | components/EasyUI/Alert/Alert.tsx */}
                            <section>
                                <h3>Alert Example</h3>
                                <ButtonComponent label="Show Alert" onClick={() => setShowAlert(true)} />

                                {showAlert && (
                                    <AlertComponent
                                        type="success"
                                        position="topCenter"
                                        title="Alert"
                                        message="This is your alert message"
                                        onAction={() => setShowAlert(false)}
                                        actionLabel="I do nothing"
                                        onClose={() => setShowAlert(false)}
                                    />
                                )}
                            </section>

                            {/* Card: components/EasyUI/Card/Card.tsx */}
                            <section>
                                <h3>Card Example</h3>
                                <CardComponent
                                    clickType={{ type: 'link', to: '/card-details' }}
                                    src="/images/meyoung.jpg"
                                    title="Card title"
                                    message="This is a description of the card content"
                                    cardAlt="Descriptive alt text for image"
                                    tags={['Tag1', 'Tag2']}
                                    className="CustomCardClass"
                                />
                                <style>
                                    {`
                                        .CustomCardClass {
                                            height: 300px;
                                            width: 300px;
                                        }
                                    `}
                                </style>
                            </section>

                            {/* Modal: components/EasyUI/Modal/Modal.tsx */}
                            <section>
                                <h3>Modal Example</h3>
                                <button onClick={() => setIsModalOpen(true)}>Show Modal</button>

                                <ModalComponent
                                    isOpen={isModalOpen}
                                    onClose={() => setIsModalOpen(false)}
                                    title="Confirm Delete"
                                    message="Are you sure?"
                                />
                            </section>
                        </div>
                        <div className="NormalUIWrapper">
                            <h1>Normal UI Components</h1>

                            {/* Accordion + Button: components/EasyUI/Button/Button.tsx | components/NormalUI/Accordion/Accordion.tsx */}
                            <section>
                                <h3>Accordion Example {`(Very ugly)`}</h3>
                                <AccordionComponent
                                    title="What is your return policy?"
                                    content={
                                        <>
                                            <p>You can return any item within 30 days of purchase.</p>
                                            <ButtonComponent label="More Info" type="button" onClick={() => alert('I do nothing')} />
                                        </>
                                    }
                                    isOpen={false}
                                    onToggle={(isOpen) => console.log('Accordion toggled:', isOpen)}
                                    className="CustomAccordionClass" // Only wrapper have this class so cant style content or header, here.
                                    icon={<span>🔍</span>}
                                />
                            </section>

                            {/* Tabs + Button: components/EasyUI/Button/Button.tsx | components/NormalUI/Tabs/Tabs.tsx */}
                            <section>
                                <h3>Tabs Example</h3>
                                <TabsComponent
                                    tabs={[
                                        {
                                            label: 'Profile A',
                                            content: (
                                                <>
                                                    <p>Hello World</p>{' '}
                                                    <ButtonComponent
                                                        label="Button A"
                                                        type="submit"
                                                        onClick={() => alert('Button A')}
                                                    />{' '}
                                                </>
                                            ),
                                        },
                                        {
                                            label: 'Profile B',
                                            content: <ButtonComponent label="Button B" type="submit" onClick={() => alert('Button B')} />,
                                        },
                                        {
                                            label: 'Profile C',
                                            content: <ButtonComponent label="Button C" type="submit" onClick={() => alert('Button C')} />,
                                        },
                                    ]}
                                    orientation="horizontal"
                                />
                            </section>

                            {/* ToastNotification + Button: components/EasyUI/Button/Button.tsx | components/NormalUI/ToastNotification/ToastNotification.tsx */}
                            <section>
                                <h3>Toast Notification Example</h3>
                                <ButtonComponent label="Show Toast" onClick={() => setShowToast(true)} />
                                {showToast && (
                                    <ToastNotificationComponent
                                        duration={2}
                                        message="Hello, I'm a ToastNotification!"
                                        onClick={() => setShowToast(false)}
                                    />
                                )}
                            </section>

                            {/* Counter: components/NormalUI/Counter/Counter.tsx */}
                            <section>
                                <h3>Counter Example</h3>
                                <CounterComponent />
                            </section>

                            {/* StarRating: components/NormalUI/StarRating/StarRating.tsx */}
                            <section>
                                <h3>StarRating Example</h3>
                                <StarRatingComponent disabled={false} />
                                <StarRatingComponent starRating={Math.round(averageRating)} disabled={true} />
                            </section>

                            {/* PasswordVisibility: components/NormalUI/PasswordVisibility/PasswordVisibility.tsx */}
                            <section>
                                <h3>PasswordVisibility Example</h3>
                                <PasswordVisibilityComponent placeholder="Password..." />
                            </section>

                            {/* ImageCarousel: components/NormalUI/ImageCarousel/ImageCarousel.tsx */}
                            <section>
                                <h2>Carousel Example</h2>
                                <ImageCarouselComponent images={catImages} interval={2500} />
                            </section>

                            {/* StepUI: components/NormalUI/StepUI/StepUI.tsx */}
                            <section>
                                <h3>StepUI example</h3>
                                <div>
                                    <button onClick={() => setShowStepper(true)}>Open Stepper</button>

                                    {showStepper && (
                                        <StepUIComponent
                                            currentStep={0}
                                            steps={[
                                                <div>
                                                    <input
                                                        type="text"
                                                        placeholder="Name"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        style={{ width: '100%', padding: '8px' }}
                                                        required
                                                    />
                                                </div>,
                                                <div>
                                                    <input
                                                        type="email"
                                                        placeholder="Email"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        style={{ width: '100%', padding: '8px' }}
                                                        required
                                                    />
                                                </div>,
                                                <div>
                                                    <strong>Review:</strong>
                                                    <p>Name: {formData.name}</p>
                                                    <p>Email: {formData.email}</p>
                                                </div>,
                                            ]}
                                            onCancel={() => {
                                                setFormData({ name: '', email: '' });
                                                setShowStepper(false);
                                            }}
                                            onComplete={() => {
                                                console.log('Form submitted:', formData);
                                                setShowStepper(false);
                                            }}
                                        />
                                    )}
                                </div>
                            </section>

                            {/* Validation Form: components/NormalUI/ValidationForm/ValidationForm.tsx */}
                            <section>
                                <h3>Validation Form example</h3>
                                <ValidationFormComponent
                                    onSubmit={(data) => {
                                        console.log('Form submitted:', data);
                                    }}
                                    onCancel={() => {
                                        console.log('Form cancelled');
                                    }}
                                />
                            </section>

                            {/* File Uploader: components/NormalUI/FileUploader/FileUploader.tsx */}
                            <section>
                                <h3>File Uploader example</h3>
                                <div style={{ maxWidth: '400px', margin: '50px auto' }}>
                                    <h2>Drag & Drop File Uploader</h2>
                                    <FileUploaderComponent onFileChange={setFile} />
                                    {file && (
                                        <div style={{ marginTop: '20px' }}>
                                            <strong>Selected file:</strong> {file.name}
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Color Picker: components/NormalUI/ColorPicker/ColorPicker.tsx */}
                            <section>
                                <h3>ColorPicker example</h3>
                                <ColorPickerComponent
                                    onChange={(color) => console.log('Selected color:', color)}
                                    color="#ff0000"
                                    swatches={['#ff0000', '#00ff00', '#0000ff', '#ffff00']}
                                    showSwatches={true}
                                />
                            </section>

                            {/* Component Type: components/NormalUI/path/path.tsx */}
                            <section>
                                <h3>Header Here</h3>
                            </section>
                        </div>
                    </div>
                }
            />
            <Route />
        </Routes>
    );
}

export default App;
