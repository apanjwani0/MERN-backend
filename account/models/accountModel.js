var mongoose = require('mongoose');

var schema = mongoose.Schema({
    name:{
        firstName:{
            type:String,
            trim:true,
            required:true
        },
        middleName:{
            type:String,
            trim:true,
        },
        lastName:{
            type:String,
            trim:true,
            required:true
        }
    },
    password: {
        type: String,
        required: true
    },
    age:{
        type:Number
    },
    email: {
        type: String,
        required: true,
        trim:true,
        unique:true
    },
    mobileNo: {
        type: String,
        required: false
    },
    isVerified:{
        type:Boolean,
        default:false
    }

})

module.exports = mongoose.model('Users', schema);