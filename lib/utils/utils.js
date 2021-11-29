export function calculateHeight() {
    const navHeight = 0;
    return window.innerHeight - navHeight;
};
export function handlePageHeight(setHeight) {
    setHeight(calculateHeight())
    window.addEventListener('resize', () => {
        setHeight(calculateHeight());
    });
};