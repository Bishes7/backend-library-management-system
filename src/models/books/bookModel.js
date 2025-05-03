import bookSchema from "./bookSchema.js";

// insert book
export const createNewBook = (bookobj) => {
  return bookSchema(bookobj).save();
};

// get books for users
export const getBooks = () => {
  return bookSchema.find({ status: "active" });
};

// get books for admins
export const getAllAdminBooks = (filter) => {
  return bookSchema.find(filter);
};
