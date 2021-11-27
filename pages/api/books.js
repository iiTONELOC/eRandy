// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const path = require('path');
const fsPromises = require('fs/promises');
const __dirname = "book_data";

export default async function getBooksRoute(req, res) {
  // get all the 'books' from the file system
  let books = []
  try {
    const files = await fsPromises.readdir(__dirname);
    // if we have files we need to read the JSON files
    if (files?.length > 0) {
      books = await Promise.all(files.map(book => fsPromises.readFile(path.join(__dirname, `${book}\\${book}.json`), 'utf8')));
    }
    return res.status(200).json({ data: books })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ error })
  }
}