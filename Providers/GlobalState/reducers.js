import { useReducer } from 'react';
import {
    SET_VIEW,
    SET_PAGE,
    SET_IMAGE,
    SET_A_BOOK,
    SET_PAGE_TEXT,
    SET_FONT_SIZE,
    SET_TEXT_COLOR,
    SET_BACKGROUND,
    SET_PAGE_NUMBER,
    TOGGLE_SETTINGS,
    TOGGLE_COLOR_PICKER,
    TOGGLE_TEXT_COLOR_PICKER,
    SET_ACCENT_COLOR,
    SET_TEXT_BACKGROUND,
} from './actions'
export const reducer = (state, action) => {
    switch (action.type) {
        case SET_VIEW:
            return {
                ...state,
                view: action.view
            }
        case SET_IMAGE:
            return {
                ...state,
                currentBook: {
                    ...state.currentBook,
                    currentImage: `/book_images/${state.currentBook.title.split(' ').join('_')}/page_${action.pageNumber}.jpg`,
                }
            }
        case SET_A_BOOK:
            return {
                ...state,
                currentBook: {
                    title: action.book.title,
                    currentPage: 0,
                    currentImage: `/book_images/${action.book.title.split(' ').join('_')}/page_0.jpg`,
                    pages: action.book.pages,
                    pageText: action.book.pages[0][`page_0.jpg`]
                }
            }
        case SET_PAGE_TEXT:
            return {
                ...state,
                currentBook: {
                    ...state.currentBook,
                    pageText: action.page
                }
            }
        case SET_FONT_SIZE:
            return {
                ...state,
                adjustableFontSize: action.fontSize
            }
        case SET_TEXT_COLOR:
            break
        case SET_BACKGROUND:
            break
        case SET_PAGE_NUMBER:
            return {
                ...state,
                currentBook: {
                    ...state.currentBook,
                    currentPage: action.pageNumber
                }
            }
        case TOGGLE_SETTINGS:
            return {
                ...state,
                settings: !state.settings
            }
        case SET_ACCENT_COLOR:
            break
        case SET_TEXT_BACKGROUND:
            break
        case TOGGLE_COLOR_PICKER:

            return {
                ...state,
                colorPicker: !state.colorPicker
            }
        case TOGGLE_COLOR_PICKER:

            return {
                ...state,
                backgroundPicker: !state.backgroundPicker
            }
        default:
            return state;
    }
};

export function useGlobalReducer(initialState) {
    return useReducer(reducer, initialState);
};