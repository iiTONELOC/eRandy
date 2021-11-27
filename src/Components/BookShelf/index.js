export default function BookShelf({ handleView, userStyles, adjustments }) {
    const { textColor, background, accentColor } = userStyles;
    return (
        <div
            className='w-full h-full flex flex-col justify-top items-center py-5 px-2'
            style={{ backgroundColor: background, color: textColor }}
        >
            <h1 className='text-center text-9xl'>BookShelf</h1>
            {/* TOOL BAR GOES HERE */}
            <div
                className='w-full h-full flex flex-col justify-center items-center mt-6 py-4 px-4'
                style={{
                    backgroundColor: accentColor,
                    border: `3px solid ${accentColor}`,
                }}
            >
                <div className='w-full h-full flex flex-row overflow-x-auto'
                    style={{
                        backgroundColor: background,
                    }}
                >
                    {/* BOOKS GO HERE */}
                </div>
            </div>
        </div>
    )
}