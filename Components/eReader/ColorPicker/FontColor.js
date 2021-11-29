import ButtonWithToolTip from "../../ButtonWithToolTip";
import { HiColorSwatch } from "react-icons/hi";
import { useRef } from "react";
export function FontColorPicker({ icon }) {
    const Icon = icon || HiColorSwatch;
    const hiddenInput = useRef(null);
    const handleClick = () => {
        hiddenInput.current.click();
    };
    const handleChange = (e) => {
        console.log(`FONT COLOR CHANGER`, e)
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