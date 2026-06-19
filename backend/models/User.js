const mongoose = require("../db/database").mongoose;

const { Schema } = require("mongoose");

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }
}, { timestamps: { createdAt: true, updatedAt: false } });

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

async function createUser(name, email, hashedPassword) {
    const user = new UserModel({ name, email, password: hashedPassword });
    await user.save();

    return {
        id: user.id,
        name: user.name,
        email: user.email
    };
}

async function findUserByEmail(email) {
    return UserModel.findOne({ email: email.toLowerCase().trim() }).exec();
}

module.exports = {
    createUser,
    findUserByEmail,
    UserModel
};
