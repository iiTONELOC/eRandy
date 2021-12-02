import { useGlobalStateContext } from "../../../Providers/GlobalState";
import { useState } from 'react';
import { SketchPicker } from "react-color";
import ButtonWithToolTip from "../../ButtonWithToolTip";
import { GiConfirmed, GiCancel } from "react-icons/gi";

export function FontColorPicker({ icon }) {
    const [, dispatch] = useGlobalStateContext();
    const initialColor = '#D1D5DB'
    const [colorHex, setColorHex] = useState(initialColor);

    const handleChange = (e) => {
        setColorHex(e.hex);
        dispatch({
            type: "SET_TEXT_COLOR",
            color: colorHex
        });
    };
    const setAndClose = (color) => {
        dispatch({
            type: "SET_TEXT_COLOR",
            color: color ? color : initialColor
        });
        dispatch({ type: 'TOGGLE_TEXT_COLOR_PICKER' })
    }
    const toolTipClasses = 'mt-20 text-medium p-2 bg-purple-500 border-2 border-black drop-shadow-lg'
    const componentButtons = [
        {
            Icon: GiConfirmed,
            toolTip: 'confirm change',
            settings: {
                button: {
                    color: 'gray-800',
                    hover: 'purple-500'
                },
                icon: {
                    color: '#38B96A'
                },
                toolTip: {
                    classNames: toolTipClasses
                }
            },
            iconSize: '55px',
            action: () => {
                setAndClose(colorHex);
            }
        },
        {
            Icon: GiCancel,
            toolTip: 'cancel',
            settings: {
                icon: {
                    color: '#DE5042'
                },
                toolTip: {
                    classNames: toolTipClasses
                }
            },
            iconSize: '55px',
            action: () => {
                setAndClose();
            }
        },
    ];
    return (
        <div className="w-full h-full flex flex-column items-center justify-center absolute p-5">
            <section className='w-1/3'>
                <SketchPicker
                    styles={{
                        picker: {
                            backgroundColor:
                                '#C9C9D8'
                        }
                    }}
                    color={colorHex}
                    onChange={(e) => handleChange(e)}
                />
                <span
                    className='flex flex-row  justify-around rounded-b-lg'
                    style={{ backgroundColor: 'rgba(0,0,0,.6)' }}>
                    {
                        componentButtons.map(button =>
                            <ButtonWithToolTip
                                key={button.toolTip}
                                {...button}
                            />)
                    }
                </span>
            </section>
        </div>
    )
};