export function setNextPage(num, setCurrentPageNumber) {
    let page_num = num
    if (page_num == 0) {
        setCurrentPageNumber(0);
    } else if (page_num = currentPageNumber + 1 < (thisBook.pages.length - 1)) {
        page_num = currentPageNumber + 1;
        setCurrentPageNumber(page_num);
        ;
    } else { return false }
    setPicture_setPageText(page_num)
};
export function setPreviousPage(num, setCurrentPageNumber) {
    let page_num = num
    if (page_num == 0) {
        setCurrentPageNumber(0);
    } else if (currentPageNumber - 1 >= 0) {
        page_num = currentPageNumber - 1;
        setCurrentPageNumber(page_num);
    } else { return false }
    setPicture_setPageText(page_num);
};
export function setPicture_setPageText(page_num, setCurrentPageData, setCurrentPageImage) {
    for (const text in thisBook.pages[page_num]) {
        setCurrentPageData(thisBook.pages[page_num][text].trim()/*.split('\n').join(' ')*/);
    };
    const url = `/book_images/${thisBook.title.split(' ').join('_')}/page_${page_num !== null ? page_num : 0}.jpg`
    if (url) {
        setCurrentPageImage(url);
    };
};
