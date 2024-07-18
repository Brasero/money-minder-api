"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var budgetItem_1 = require("./budgetItem");
var Income_1 = require("./Income");
var budgetSchema = new index_1.default.Schema({
    userId: {
        type: Number,
        require: true
    },
    name: String,
    budgetItems: [
        budgetItem_1.budgetItemSchema
    ],
    incomeItems: [
        Income_1.incomeSchema
    ]
});
exports.default = index_1.default.model('Budget', budgetSchema);
