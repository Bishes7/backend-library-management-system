import { dbConnect } from "../../config/dbConnect.js";
import {
  DeleteAllBooks,
  InsertManyBooks,
} from "../../models/books/bookModel.js";
import books from "./bookSeeds.js";

const importDummyBooks = async () => {
  try {
    await dbConnect();

    await DeleteAllBooks();

    await InsertManyBooks(books);
    console.log("All the books has been uploaded to db");
  } catch (error) {
    console.log(error.message);
  }
};

importDummyBooks();
