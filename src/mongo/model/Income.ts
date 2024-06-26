import mongo from '../index'

const incomeSchema = new mongo.Schema({
    userId: {
        type: Number,
        require: true
    },
    amount: Number,
    origin: String
})

export default mongo.model('Income', incomeSchema)