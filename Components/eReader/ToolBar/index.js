import { decreaseFontSize, increaseFontSize } from '../../../Providers/GlobalState/helpers';
import { TextBackgroundColorPicker } from '../ColorPicker/TextBackground';
import { AiOutlineBgColors, AiOutlineFontColors } from 'react-icons/ai';
import { useGlobalStateContext } from '../../../Providers/GlobalState';
import { CgPlayListAdd, CgPlayListRemove } from 'react-icons/cg';
import ButtonWithToolTip from '../../ButtonWithToolTip';
import { AiOutlineCloseCircle } from 'react-icons/ai';


export default function ToolBar() {
    const globalState = useGlobalStateContext() || [{}, () => { }];
    const [state, dispatch] = globalState || [{}, () => { }];
    const toolTipClasses = 'mt-20 text-medium p-2 bg-purple-500 border-2 border-black drop-shadow-lg'
    const adjustableSettings = [
        {
            Icon: CgPlayListAdd,
            toolTip: 'increase font size',
            settings: {
                toolTip: {
                    classNames: toolTipClasses
                }
            },
            action: () => {
                increaseFontSize({
                    current_size: state.adjustableFontSize, dispatch
                })
            }
        },
        {
            Icon: CgPlayListRemove,
            toolTip: 'decrease font size',
            settings: {
                toolTip: {
                    classNames: toolTipClasses
                }
            },
            action: () => {
                decreaseFontSize({
                    current_size: state.adjustableFontSize, dispatch
                })
            }
        },
        {
            Icon: AiOutlineFontColors,
            toolTip: 'change font color',
            settings: {
                toolTip: {
                    classNames: toolTipClasses
                }
            },
            action: () => { dispatch({ type: 'TOGGLE_TEXT_COLOR_PICKER' }) }
        },
        {
            Icon: AiOutlineBgColors,
            toolTip: 'change text background color',
            settings: {
                toolTip: {
                    classNames: toolTipClasses
                }
            },
            action: () => { dispatch({ type: 'TOGGLE_COLOR_PICKER' }) }
        },
        {
            Icon: AiOutlineCloseCircle,
            toolTip: 'close settings',
            settings: {
                toolTip: {
                    classNames: toolTipClasses
                }
            },
            action: () => { dispatch({ type: 'TOGGLE_SETTINGS' }) }
        },
    ];
    return (
        <>
            {adjustableSettings.map((icon, index) => <ButtonWithToolTip key={index} {...icon} />)}
        </>
    );
};

