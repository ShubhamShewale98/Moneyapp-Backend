const   {mongoose , Schema} = require('mongoose')
var moment = require('moment');
const blogSchema = new mongoose.Schema({
    Title:{type:String},
    Body:{type:String},
    userID: { Type: Schema.Types.ObjectId },
    review_id: [{ type: Schema.Types.ObjectId, ref:'Review'}],
    cDate: { type: Date, default: moment().format('YYYY-MM-DD h:mm:ss a') },
    uDate: { type: Date, default: moment().format('YYYY-MM-DD h:mm:ss a') },
})
const Blog = mongoose.model("Blog", blogSchema)

module.exports = {Blog}
