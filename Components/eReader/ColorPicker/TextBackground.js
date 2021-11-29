import { useRef } from "react";
import { MdOutlineFormatColorFill } from 'react-icons/md';

export function TextBackgroundColorPicker({ icon }) {
    const Icon = icon || MdOutlineFormatColorFill;
    const hiddenInput = useRef(null);
    const handleClick = () => {
        hiddenInput.current.click();
    };
    const handleChange = (e) => {
        console.log(`BACKGROUND CHANGER`, e)
    }
    return (
        <>
            <Icon onClick={handleClick} />
            <input
                type="color"
                ref={hiddenInput}
                onChange={handleChange}
                style={{ display: 'none' }}
            />
        </>
    )
};