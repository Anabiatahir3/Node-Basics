const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//defining the structure of documents:also the purpose of mongoose schema
const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
}, { timestamps: true });
//collection creation
//mongoose model provides us with an interface to the DB for CRUD operations
// const Blog = mongoose.model('Blog', blogSchema);
// module.exports = Blog;
module.exports =  mongoose.model('Blog', blogSchema);
//mongoose automatically pluralizes the collection with the model name
//i.e. Blog becomes blogs