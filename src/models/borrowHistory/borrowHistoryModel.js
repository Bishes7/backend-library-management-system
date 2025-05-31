// insert new borrow book

import borrowHistorySchema from "./borrowHistorySchema.js";

// for borrowing single books
// export const insertBorrowBook = (borrowobj) => {
//   return borrowHistorySchema(borrowobj).save();
// };

//  for borrowing multipe books
export const insertBorrowsBook = (borrowArr) => {
  return borrowHistorySchema.insertMany(borrowArr);
};

// use filter to borrow for specific users
export const getAllBorrowsData = (filter) => {
  return borrowHistorySchema.find(filter);
};

// update the borrow table
export const updateBorrowsTable = (filter, obj) => {
  return borrowHistorySchema.findOneAndUpdate(filter, obj);
};
