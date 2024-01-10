"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.signup = void 0;
const mongoose_1 = require("mongoose");
const authSchema = new mongoose_1.Schema({
    // name: {
    //   type: String,
    //   required: true
    // },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});
const signSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
});
const Auth = (0, mongoose_1.model)('Auth', authSchema);
exports.Auth = Auth;
const signup = (0, mongoose_1.model)('Signup', signSchema);
exports.signup = signup;
