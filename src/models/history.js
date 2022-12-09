const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://ngocphuc:ngocphuc@cluster0.jm3jwgm.mongodb.net/HDBank', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const Schema = mongoose.Schema

const History = new Schema({
    amount: { type: Number },
    description: { type: String },
    toAcct: { type: String },
    createAt: { type: Date, default: Date.now },
}, {
    collection: 'tranferHistory',
}, )

const HistoryModel = mongoose.model('History', History)
module.exports = HistoryModel