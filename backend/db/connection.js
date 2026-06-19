const mongoose = require("mongoose");

async function initializeDatabase() {
    const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/notes_app";

    await mongoose.connect(uri, {
        // mongoose v7 uses sensible defaults; keep options empty for compatibility
    });

    console.log("MongoDB connected successfully");
}

module.exports = {
    initializeDatabase,
    mongoose
};
