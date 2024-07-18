"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spentSchema = void 0;
var index_1 = require("../index");
exports.spentSchema = new index_1.default.Schema({
    userId: {
        type: Number,
        require: true
    },
    description: String,
    amount: Number
});
exports.default = index_1.default.model('Spent', exports.spentSchema);
