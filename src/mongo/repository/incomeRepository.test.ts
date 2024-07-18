import mongoose from "../index";
import {createIncome, deleteIncomeById} from "./incomeRepository";
import {findBudgetById} from "./budgetRepository";

describe('IncomeTest', function () {
    let icomeId: any
    const userId: number = 1280;
    const amount: number = 300;
    const origin: string = 'entreprise';
    test('CreateIncomeTest',
        async () => {
            const income = await createIncome(amount,origin,userId)
            icomeId = typeof income !== 'boolean' && income._id
            expect(income).not.toBe(false)
            expect(income.amount).toBe(amount)
            expect(income.origin).toBe(origin)
        },50000)
    test('deleteIncomeById', async () => {
        await deleteIncomeById(icomeId);
        const income = await findBudgetById(icomeId)
        expect(income).toBeFalsy()
    })
    afterAll(async () => {
        await mongoose.disconnect()
    })
});