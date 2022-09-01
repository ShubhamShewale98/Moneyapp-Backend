const express = require("express");
const { default: mongoose } = require("mongoose");
const { Blog } = require("./Models/Blog");
const dotenv = require('dotenv').config()

const { Review } = require("./Models/Review");
const { User } = require("./Models/User");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/blog", (req, res) => {
    Blog.find().populate('review_id').exec(function(err, data){

        if (err) {
            return res.send({ message: err })
        }
        res.json(data)
    });
    // let b = await Blog.find({})
    // res.send({ b });







});
app.get("/blog/:_id", async (req, res) => {

    let blogData = await Blog.find(req.params);


    if (blogData.length) {
        return res.send({ blogData });
    } else {
        return res.send({ message: "Blog Not Found" });
    }

});
app.put("/blog/:_id", async (req, res) => {
    const filter = req.params;
    const update = req.body;
    await Blog.findOneAndUpdate(filter, update)

    res.end("Doned")
});
app.post("/review/:_id", async (req, res) => {
    const update = req.body;
    var { description , userID } = req.body
    const filter = req.params;
    let reiewDetails = new Review({
        userID,
        description,
        cDate: Date.now(),
        uDate: "",
    })


    await Blog.findOneAndUpdate(filter, { $push: { review_id: reiewDetails._id } })
    res.end("Doned")
});
app.delete("/review/:_id", async (req, res) => {
    let review = await Review.deleteOne(req.params);

    return res.send({ message: "DELETED" });
});
app.delete("/blog/:_id", async (req, res) => {

    let blogData = await Blog.deleteOne(req.params);

    return res.send({ message: "DELETED" });


});
app.post("/blog", async (req, res) => {
    var { Title, Body } = req.body;

    const blogDetails = new Blog({
        Title,
        Body,
        cDate: Date.now(),
        uDate: "",
    });
    blogDetails.save().then(() => {
        res.send({ message: "Blog Created", blogDetails });
    });
});
app.post("/user", async (req, res) => {
    var { name } = req.body;

    const userDetails = new User({
        name
    });
    userDetails.save().then(() => {
        res.send({ message: "USer Created", userDetails });
    });
});
app.get("/", (req, res) => {
    res.send("hellossxcs");
});
const connections = mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => { console.log("connect to db") })
app.listen(process.env.PORT || 8080, async() => { 

 await   connections ;
console.log('server started') 
})
