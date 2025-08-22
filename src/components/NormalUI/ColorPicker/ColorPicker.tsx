import React, { useState } from 'react';
import Style from './ColorPicker.module.css';
import { SketchPicker, SwatchesPicker } from 'react-color';

// ColorPicker component

// Using react-color library for color picking functionality, allowing easy selection of different color pickers.

interface ColorPickerProps {
    onChange?: (color: string) => void;
    color?: string;
    swatches?: string[];
    showSwatches?: boolean;
    style?: React.CSSProperties;
    className?: string;
}

export const ColorPickerComponent: React.FC<ColorPickerProps> = ({
    onChange,
    color = '#fff',
    swatches = [],
    showSwatches = true,
    style = {},
    className = '',
}) => {
    const [selectedColor, setSelectedColor] = useState(color);

    const handleColorChange = (color: any) => {
        const hexColor = color.hex;
        setSelectedColor(hexColor);
        if (onChange) onChange(hexColor);
    };

    return (
        <div className={`${Style.ColorPickerComponentWrapperDiv} ${className}`} style={style}>
            <input
                type="text"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className={`${Style.ColorPickerComponentInput} ${className}-input`}
                style={{ backgroundColor: selectedColor }}
            />

            {showSwatches && swatches.length > 0 && (
                <SwatchesPicker
                    colors={[swatches]}
                    color={selectedColor}
                    onChangeComplete={handleColorChange}
                    className={`${Style.ColorPickerComponentPickerSwatches} ${className}-swatches`}
                />
            )}

            <SketchPicker
                color={selectedColor}
                onChangeComplete={handleColorChange}
                className={`${Style.ColorPickerComponentPickerSketch} ${className}-sketch`}
            />
        </div>
    );
};

/*

USE EXAMPLE:

// 1. Simple color picker with default color
// const [color1, setColor1] = useState('#ff0000');
// <ColorPickerComponent
//     color={color1}
//     onChange={setColor1}
// />
// <p>Selected Color: {color1}</p>

// 2. Color picker with swatches
// const [color2, setColor2] = useState('#00ff00');
// const swatches = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];
// <ColorPickerComponent
//     color={color2}
//     swatches={swatches}
//     onChange={setColor2}
// />
// <p>Selected Color: {color2}</p>

// 3. Picker without swatches (only SketchPicker)
// const [color3, setColor3] = useState('#0000ff');
// <ColorPickerComponent
//     color={color3}
//     showSwatches={false}
//     onChange={setColor3}
// />
// <p>Selected Color: {color3}</p>

// 4. Custom inline style and className
// const [color4, setColor4] = useState('#ff00ff');
// <ColorPickerComponent
//     color={color4}
//     swatches={swatches}
//     style={{ maxWidth: '300px' }}
//     className="my-custom-color-picker"
//     onChange={setColor4}
// />
// <p>Selected Color: {color4}</p>

*/
