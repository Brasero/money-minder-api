import mongoose from "../index";
import {
    addBudgetItemToBudgetById,
    addIncomeToBudgetById,
    createBudget,
    deleteBudgetById,
    findBudgetById,
    findBudgetByUserID,
    updateBudgetById
} from "./budgetRepository";
import {createIncome, deleteIncomeById} from "./incomeRepository";
import {createBudgetItem, deleteBudgetItemById} from "./budgetItemRepository";

describe('BudgetTest',  function () {
    let budgetId: any
    const userId: number = 1280;
    const name = 'blabla'
    test('CreateBudgetTest',
        async () => {

            const budget = await createBudget(name, userId)
            budgetId = typeof budget !== "boolean" && budget._id
            expect(budget).not.toBe(false)
            expect(budget.name).toBe(name)
        },
        50000)

    test("findCreatedBudgetById", async () => {
        const budget = await findBudgetById(budgetId)
        if (typeof budget !== "boolean") {
            const id = budget._id
            expect(id).toStrictEqual(budgetId)
        } else {
            expect(budget).toBe(false)
        }
        expect(budget).toBeDefined()
    })

    test("findBudgetByUserId", async () => {
        const budget = await findBudgetByUserID(userId)
        if (typeof budget !== "boolean") {
            expect(budget).not.toBeFalsy()
            expect(budget[0].userId).toBe(userId)
        } else {
            expect(budget).toBeFalsy()
        }
    })

    test("updateBudgetNameById", async () => {
        const update = {name: "blablu"}
        await updateBudgetById(budgetId, update)
        const budget = await findBudgetById(budgetId)
        if (typeof budget !== "boolean") {
            expect(budget).not.toBeFalsy()
            expect(budget.name).toBe("blablu")
            const id  = budget._id
            expect(id).toStrictEqual(budgetId)
        } else {
            expect(budget).toBeFalsy()
        }
    })
    test('addIncomeToBudget', async () => {
        const income = await createIncome(300,'prout',userId)
        const result = await addIncomeToBudgetById(budgetId,income)
        const budget = await findBudgetById(budgetId)
        if(typeof budget !== 'boolean'){
            console.log(budget)
            expect(budget.incomeItems[0]._id.toString()).toBe(income._id.toString())
        }
        expect(result).toBe(true)
        await deleteIncomeById(income._id)
    })
    test('addBudgetItemToBudget', async () => {
        const budgetItem = await createBudgetItem('Loisir', 100)
        const result = await addBudgetItemToBudgetById(budgetId, budgetItem)
        const budget = await findBudgetById(budgetId)
        if(typeof budget !== "boolean"){
            console.log(budget)
            expect(budget.budgetItems[0]._id.toString()).toBe(budgetItem._id.toString())
        }
        expect(result).toBe(true)
        await deleteBudgetItemById(budgetItem._id)
    })
    test("deleteBudgetById", async () => {
        await deleteBudgetById(budgetId);
        const budget = await findBudgetById(budgetId)
        expect(budget).toBeFalsy()
    })
    afterAll(async () => {
        await mongoose.disconnect()
   })
});
