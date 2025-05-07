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

// update books query
export const updateSelectedBooks = ({ _id, ...rest }) => {
  return bookSchema.findByIdAndUpdate(_id, rest);
};

// Delete Book Query
export const deleteSelectedBook = (_id) => {
  return bookSchema.findByIdAndDelete(_id);
};
