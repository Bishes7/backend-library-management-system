import bookSchema from "./bookSchema.js";

export const createNewBook = (bookobj) => {
  return bookSchema(bookobj).save();
};
