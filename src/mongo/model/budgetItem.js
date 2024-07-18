"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetItemSchema = void 0;
var index_1 = require("../index");
var spent_1 = require("./spent");
exports.budgetItemSchema = new index_1.default.Schema({
    name: String,
    amount: Number,
    spentItems: [
        spent_1.spentSchema
    ]
});
exports.default = index_1.default.model('BudgetItem', exports.budgetItemSchema);
