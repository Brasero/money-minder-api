"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incomeSchema = void 0;
var index_1 = require("../index");
exports.incomeSchema = new index_1.default.Schema({
    userId: {
        type: Number,
        require: true
    },
    amount: Number,
    origin: String
});
exports.default = index_1.default.model('Income', exports.incomeSchema);
