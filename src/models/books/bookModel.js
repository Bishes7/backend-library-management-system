import bookSchema from "./bookSchema.js";

// insert book
export const createNewBook = (bookobj) => {
  return bookSchema(bookobj).save();
};

// get books for users
export const getBooks = () => {
  return bookSchema.find({ status: "active" });
};

// get single PUblic Book
export const getsingleBook = (filter) => {
  return bookSchema.findOne(filter);
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

// Saving DummyBooks in Database
export const InsertManyBooks = (booksArr) => {
  return bookSchema.insertMany(booksArr, { ordered: false });
};

// Deleting DummyBooks in Database
export const DeleteAllBooks = () => {
  return bookSchema.deleteMany({});
};

// book category stats chart model
export const getBookCategoryStats = async () => {
  const results = await bookSchema.aggregate([
    {
      $group: {
        _id: "$genre", // group by categories
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ]);

  const labels = results.map((r) => r._id);
  const data = results.map((r) => r.count);

  return { labels, data };
};

// book status chart
export const getBorrowStatus = async () => {
  const results = await bookSchema.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const labels = results.map((r) => r._id);
  const data = results.map((r) => r.count);

  return { labels, data };
};

// recent books chart
export const recentBooksChart = async () => {
  const books = await bookSchema.find().sort({ createdAt: -1 }).limit(5);
};
