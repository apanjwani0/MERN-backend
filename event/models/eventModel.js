var mongoose = require('mongoose');

var schema = mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true 
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    address:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
    },
    startTime:{
        type:Date,
    },
    endTime:{
        type:Date,
    },
    isOpen:{
        type:Boolean,
        default:true
    },
    bookingLink:{
        type:String
    },
    capacity:{
        type:Number,
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Events', schema);