// insert new borrow book

import borrowHistorySchema from "./borrowHistorySchema";

export const insertBorrowBook = (borrowobj) => {
  return borrowHistorySchema(borrowobj).save();
};
