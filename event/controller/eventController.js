const eventModel = require('../models/eventModel');
const accountModel = require('../../account/models/accountModel');

exports.displayAll = (req, res) => {
    try {
        eventModel.find({},(err,result)=>{
            if(err){
                return res.status(500).send({
                    message: "Can't access DataBase",
                    error: err.message,
                    success: false
                })
            }
            return res.status(200).send({
                message: "All Events fetched Successfully",
                result,
                success: true
            })
        })
    } catch (error) {
        res.status(500).send({
            message: "An error occured",
            error: error.message,
            success: false
        })
    }
}

exports.display = (req, res) => {
    try {
        accountModel.findOne({_id:req.decoded.user._id},(err,user)=>{
            if(!user || err){
                return res.status(500).send({
                    message: "An error occured",
                    error: 'Unknown error',
                    success: false
                })
            }
            eventModel.find({user: req.decoded.user._id},(err,result)=>{
                if(err){
                    return res.status(500).send({
                        message: "Can't access DataBase",
                        error: err.message,
                        success: false
                    })
                }
                return res.status(200).send({
                    message: "All Events fetched Successfully",
                    result,
                    success: true
                })
            })
        })
    } catch (error) {
        res.status(500).send({
            message: "An error occured",
            error: error.message,
            success: false
        })
    }
}

exports.add = (req, res) => {
    try {
        const {address,startDate,title,description,endDate,startTime,endTime,isOpen,bookingLink,capacity}=req.body
        //console.log(req.body)
        const eventInstance=new eventModel({
            user:req.decoded.user._id,
            title,
            description,
            address,
            startDate,
            endDate,
            startTime,
            endTime,
            isOpen,
            bookingLink,
            capacity
        })
        eventInstance.save({},(err,result)=>{
            if(err){
                //console.log(err)
                return res.status(500).send({
                    message: "An error occured",
                    error: err,
                    success: false
                });
            }
            return res.status(200).send({
                message: "Event Added Successfully",
                result,
                success: true,
            })
        })
    } catch (error) {
        return res.status(500).send({
            message: "An error occured",
            error: error.message,
            success: false
        });
    }
}

exports.delete = (req, res) => {
    try {
        accountModel.findOne({ _id: req.decoded.user._id }, (err, user) => {
            if (err) return res.status(500).send({
                message: "An error occured",
                error: err.message,
                success: false
            });
            if (user) {
                eventModel.findOneAndDelete({ user: user._id }, (err, event) => {
                    if (event) {
                        return res.status(200).send({
                            message: "Event Deleted Successfully",
                            event,
                            success: true
                        })
                    }
                    if(err){
                        return res.status(500).send({
                            message: "An error occured",
                            error: err.message,
                            success: false
                        })
                    }
                    return res.status(500).send({
                        message: "An error occured",
                        error: 'Unknown Error',
                        success: false
                    })
                })
            }
        });
    } catch (error) {
        return res.status(500).send({
            message: "An error occured",
            error: error.message,
            success: false
        });
    }
}

exports.update = (req, res) => {
    try{
        const id=req.params.eventID
        const updates=Object.keys(req.body)
        const validUpdates=['address','startDate','description','title','endDate','startTime','endTime','isOpen','bookingLink','capacity']
        const isValidUpdate = updates.every((update)=>{
            return validUpdates.includes(update)
        })
        if(!isValidUpdate){
            return res.json({
                success:false,
                message:'Not a valid Update'
            })
        }
        eventModel.findById(id,{runValidators:true},(err,event)=>{
            if(err){
                return res.json({
                    success:false,
                    message:"Can't find Event",
                    error:err.message
                })
            }
            updates.forEach(update=>{
                event[update]=req.body[update]
            })
            event.save({},(err,event)=>{
                if(err){
                    return res.json({
                        success:false,
                        message:"Can't Update",
                        error:err.message
                    })
                }
                return res.json({
                    success:true,
                    message:'Event Updated',
                    result:event
                })
            })
        })
    }
    catch(err){
        return res.json({
            success:false,
            message:"Error Occured",
            error:err.message
        })
    }
}