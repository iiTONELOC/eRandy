import ReadAloud from "../../ReadAloud"
import ButtonWithToolTip from "../../ButtonWithToolTip"
export default function ReaderHeader({ title, currentPageData }) {
    return (
        <>
            <span>
                <h1 className='text-center text-4xl md:text-5xl'>{title}</h1></span>
            <span className='flex flex-row  items-center justify-end w-1/3 h-full text-5xl'>
                {/* TOOL BAR GOES HERE */}
                <ButtonWithToolTip
                    Icon={() => <ReadAloud text={currentPageData} />}
                    toolTip={'Read Aloud'}
                    settings={{
                        toolTip: {
                            classNames: 'mt-20 text-medium p-2 bg-purple-500 border-2 border-black drop-shadow-lg'
                        }
                    }}
                />
            </span>
        </>
    )
}