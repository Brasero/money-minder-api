"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var dotenv = require("dotenv");
dotenv.config({
    path: [
        '.env.sample',
        '.env'
    ]
});
mongoose_1.default.connect(process.env.MONGODB_URL).then(function () { return console.log('Connected to mongodb'); });
exports.default = mongoose_1.default;
