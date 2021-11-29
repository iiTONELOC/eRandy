import {
    SET_VIEW,
    SET_PAGE,
    SET_IMAGE,
    SET_BOOKS,
    SET_A_BOOK,
    SET_FONT_SIZE,
    SET_PAGE_TEXT,
    SET_TEXT_COLOR,
    SET_BACKGROUND,
    SET_PAGE_NUMBER,
    SET_ACCENT_COLOR,
    SET_TEXT_BACKGROUND,
} from './actions';

export function setView({ view, dispatch }) {
    console.log('setView', view);
    return dispatch({
        type: SET_VIEW,
        view
    });
};
export function setBook({ book, setView, dispatch }) {
    setView({ view: 'book', dispatch });
    return dispatch({
        type: SET_A_BOOK,
        book
    })
};
export function setCurrentPageNumber({ num, dispatch }) {
    return dispatch({
        type: SET_PAGE_NUMBER,
        pageNumber: num
    });
};
export function setCurrentPage({ page, dispatch }) {
    return dispatch({
        type: SET_PAGE_TEXT,
        page: page
    });
};
export function setCurrentImage({ pageNumber, dispatch }) {
    return dispatch({
        type: SET_IMAGE,
        pageNumber
    });
}
export function nextPage({ num, dispatch, pages }) {
    let page_num = num
    if (page_num + 1 < (pages.length - 1)) {
        page_num += 1;
        setCurrentPageNumber({ num: page_num, dispatch });
        ;
    } else { return false }
    setCurrentPage({ page: pages[page_num][`page_${page_num}.jpg`], dispatch });
    setCurrentImage({ pageNumber: page_num, dispatch });
};
export function previousPage({ num, dispatch, pages }) {
    let page_num = num
    if (page_num - 1 >= 0) {
        page_num -= 1;
        setCurrentPageNumber({ num: page_num, dispatch });
    } else { return false }
    setCurrentPage({ page: pages[page_num][`page_${page_num}.jpg`], dispatch });
    setCurrentImage({ pageNumber: page_num, dispatch });
};