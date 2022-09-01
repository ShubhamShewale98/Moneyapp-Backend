const {mongoose , Schema} = require('mongoose')
var moment = require('moment');
const reviewSchema = new mongoose.Schema({
    userID: { Type: Schema.Types.ObjectId },
    description: { type: String },
    cDate: { type: Date, default: moment().format('YYYY-MM-DD h:mm:ss a') },
    uDate: { type: Date, default: moment().format('YYYY-MM-DD h:mm:ss a') },
})
const Review = mongoose.model("Review", reviewSchema)
module.exports = {Review}