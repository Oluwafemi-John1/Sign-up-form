const mongoose = require('mongoose');


// Setting the schema. Structure of data I want there
const userSchema = new mongoose.Schema(
    {
        first_name: String,
        last_name: String,
        email: String,
        password: String
    }
)

// Storing our schema into tables
const userModel = mongoose.model('UserDetails',userSchema)

// To export userModel to index.js
module.exports = userModel;