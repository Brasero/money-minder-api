import {createSpent, deleteSpentById, findSpentById} from "./spentRepository";
import mongoose from "../index";

describe('SpentTest', function(){
    let spentId: any
    const userId: number = 1280;
    const amount: number = 100;
    const description: string = 'Loisir';
    test('CreateSpentTest',
        async () => {
            const spent = await createSpent(description,amount,userId)
            spentId = typeof spent !== 'boolean' && spent._id
            expect(spent).not.toBe(false)
            expect(spent.amount).toBe(amount)
            expect(spent.description).toBe(description)
    }, 50000)
    test('deleteSpentById', async () => {
        await deleteSpentById(spentId);
        const spent = await findSpentById(spentId)
        expect(spent).toBeFalsy()
    })
    afterAll(async () => {
        await mongoose.disconnect()
    })
});