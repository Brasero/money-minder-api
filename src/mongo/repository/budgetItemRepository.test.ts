import mongoose from "../index";
import {
    addSpentToBudgetItemById,
    createBudgetItem,
    deleteBudgetItemById,
    findBudgetItemById,
    updateBudgetItemById
} from "./budgetItemRepository";
import {createSpent, deleteSpentById} from "./spentRepository";
describe('BudgetItemTest', function(){
    let budgetItemId: any
    const userId = 1280
    const name = 'Alimentation'
    const amount = 800
    test('CreateBudgetItemTest', async () => {
        const budgetItem = await createBudgetItem(name,amount)
        budgetItemId = typeof budgetItem !== "boolean" && budgetItem._id
        expect(budgetItem).not.toBe(false)
        expect(budgetItem.name).toBe(name)
        expect(budgetItem.amount).toBe(amount)
    },50000)
    test("findBudgetItemById", async () => {
        const budgetItem = await findBudgetItemById(budgetItemId)
        if( typeof budgetItem !== "boolean"){
            const id = budgetItem._id
            expect(id).toStrictEqual(budgetItemId)
        } else {
            expect(budgetItem).toBe(false)
        }
        expect(budgetItem).toBeDefined()
    })
    test("updateBudgetItemById", async () => {
        const update = {name: "Loisir", amount: 100}
        await updateBudgetItemById(budgetItemId, update)
        const budgetItem = await findBudgetItemById(budgetItemId)
        if(typeof budgetItem !== "boolean") {
            expect(budgetItem).not.toBeFalsy()
            expect(budgetItem.name).toBe('Loisir')
            expect(budgetItem.amount).toBe(100)
            const id = budgetItem._id
            expect(id).toStrictEqual(budgetItemId)
        } else {
            expect(budgetItem).toBeFalsy()
        }
    })
    test('addSpentToBudgetItem', async () => {
        const spent = await createSpent("jeux vidéo", 20, userId)
        const result = await addSpentToBudgetItemById(budgetItemId,spent)
        const budgetItem = await findBudgetItemById(budgetItemId)
        if(typeof budgetItem !== "boolean"){
            console.log(budgetItem)
            expect(budgetItem.spentItems[0]._id.toString()).toBe(spent._id.toString())
        }
        expect(result).toBe(true)
        await deleteSpentById(spent._id)
    })
    test('deleteBudgetItem', async () => {
        await deleteBudgetItemById(budgetItemId);
        const budgetItem = await findBudgetItemById(budgetItemId)
        expect(budgetItem).toBeFalsy()
    })
    afterAll(async () => {
        await mongoose.disconnect()
    })
});