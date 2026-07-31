const mongoose = require("mongoose")

const ChatShema = new mongoose.Schema({
    sender : {type: mongoose.Schema.Types.ObjectId, require: true, ref:"User"},
    receiver : {type: mongoose.Schema.Types.ObjectId , require: true, ref:"User"},
    content : {type: "string" , require: true},
    createdAt : {type: Date, default: Date.now()}

})




module.exports = mongoose.model("Chat", ChatShema)