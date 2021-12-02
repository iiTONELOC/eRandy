export function calculateHeight(adjust) {
    const navHeight = adjust || 0;
    return window.innerHeight - navHeight;
};
export function handlePageHeight(setHeight, adjust) {
    setHeight(calculateHeight(adjust))
    window.addEventListener('resize', () => {
        setHeight(calculateHeight(adjust));
    });
};