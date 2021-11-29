import { useGlobalStateContext } from '../../../Providers/GlobalState';
import { CgPlayListAdd, CgPlayListRemove } from 'react-icons/cg';
import ButtonWithToolTip from '../../ButtonWithToolTip';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function ToolBar() {
    const globalState = useGlobalStateContext() || [{}, () => { }];
    const [, dispatch] = globalState || [{}, () => { }];
    const adjustableSettings = [
        {
            Icon: CgPlayListAdd,
            toolTip: 'increase font size',
            settings: {
                toolTip: {
                    classNames: 'mt-20 text-medium p-2 bg-purple-500 border-2 border-black drop-shadow-lg'
                }
            },
            action: 'INCREASE'
        },
        {
            Icon: CgPlayListRemove,
            toolTip: 'decrease font size',
            settings: {
                toolTip: {
                    classNames: 'mt-20 text-medium p-2 bg-purple-500 border-2 border-black drop-shadow-lg'
                }
            },
            action: 'DECREASE'
        },
        {
            Icon: AiOutlineCloseCircle,
            toolTip: 'close settings',
            settings: {
                toolTip: {
                    classNames: 'mt-20 text-medium p-2 bg-purple-500 border-2 border-black drop-shadow-lg'
                }
            },
            action: () => { dispatch({ type: 'TOGGLE_SETTINGS' }) }
        },
    ];
    return (
        <>
            {adjustableSettings.map((icon, index) => <ButtonWithToolTip key={index} {...icon} />)}
        </>
    )
}

