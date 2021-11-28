// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const path = require('path');
const fsPromises = require('fs/promises');
const __dirname = "book_data";

export default async function getSingleBooksRoute(req, res) {
    // get all the 'books' from the file system
    let book
    const fileName = req.query.id.split(' ').join('_')
    if (req.query.id) {
        try {
            book = await fsPromises.readFile(path.join(__dirname, `${fileName}\\${fileName}.json`), 'utf8');
            console.log(book)
            return res.status(200).json({ data: JSON.parse(book) });
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ error })
        }
    }

}