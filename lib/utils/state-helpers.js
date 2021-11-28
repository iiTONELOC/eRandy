export function currentBookHandler({ book_to_set, setBookFn, setView }) {
    setView('book');
    return setBookFn(book_to_set)
}