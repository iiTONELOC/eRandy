
import { useState, useEffect } from "react";

/*
Creates a custom button with tooltip
// EXAMPLE USAGE:
const iconSize = '30px'
const iconColor = 'text-gray-400'
{
            Icon: MdAccountBox,
            toolTip: "View Profile",
            iconSize: iconSize,
            action: 'viewProfile',
            settings: {
                button: {
                    color: 'gray-800',
                    hover: 'purple-500'
                },
                icon: {
                    color: iconColor
                },
                toolTip: {
                    classNames: 'mt-20 text-medium p-2 bg-purple-500 border-2 border-black drop-shadow-lg',
                },
            },
        },
*/
export default function ButtonWithToolTip({ ...props }) {
    const { Icon, toolTip, action, settings, iconSize, name, iconProps } = props;
    const [isMounted, setMounted] = useState(false);
    const [hover, setHover] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => { setMounted(false); setHover(false) };
    }, []);
    if (!isMounted) return null;

    return (
        <span
            className="static flex flex-col items-center w-auto h-auto bg-gray-600"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={action ? (e) => {
                typeof action === 'function' ?
                    action(e) :
                    alert(action);
            } : null}
        >
            <button
            > {Icon ? <Icon size={iconSize} style={iconProps} /> : name}</button>

            {
                hover === true ?
                    <span
                        className={`absolute text-sm text-center text-white  bg-black rounded-lg p-1 mt-12 ${settings?.toolTip?.classNames ? settings?.toolTip?.classNames : ''}`}>
                        <p>{toolTip}</p>
                    </span>
                    : null
            }
        </span>
    )
}