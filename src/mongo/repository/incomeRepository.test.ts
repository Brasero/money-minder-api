import mongoose from "../index";
import {createIncome, deleteIncomeById, findIncomeById, updateIncomeById} from "./incomeRepository";
import {findBudgetById} from "./budgetRepository";

describe('IncomeTest', function () {
    let incomeId: any
    const userId: number = 1280;
    const amount: number = 300;
    const origin: string = 'entreprise';
    test('CreateIncomeTest',
        async () => {
            const income = await createIncome(amount,origin,userId)
            incomeId = typeof income !== 'boolean' && income._id
            expect(income).not.toBe(false)
            expect(income.amount).toBe(amount)
            expect(income.origin).toBe(origin)
        },50000)
    test('findIncomeById', async () => {
        const income = await findIncomeById(incomeId)
        if(typeof income !== "boolean") {
            const id = income._id
            expect(id).toStrictEqual(incomeId)
        } else {
            expect(income).toBe(false)
        }
        expect(income).toBeDefined()
    })
    test('updateIncomeById', async () => {
        const update = {amount: 600, origin:"Auto-entreprise"}
        await updateIncomeById(incomeId, update)
        const income = await findIncomeById(incomeId)
        if(typeof income !== "boolean"){
            expect(income).not.toBeFalsy()
            expect(income.amount).toBe(600)
            expect(income.origin).toBe("Auto-entreprise")
            const id = income._id
            expect(id).toStrictEqual(incomeId)
        } else {
            expect(income).toBeFalsy()
        }
    })
    test('deleteIncomeById', async () => {
        await deleteIncomeById(incomeId);
        const income = await findBudgetById(incomeId)
        expect(income).toBeFalsy()
    })
    afterAll(async () => {
        await mongoose.disconnect()
    })
});