var accountModel = require('../models/accountModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.signup = (req, res) => {
    try {
        let saltRounds=process.env.SALTROUNDS
        saltRounds=Number.parseInt(saltRounds)
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (salt) {
                const { name, email, mobileNo, password} = req.body
                accountModel.findOne({ email: email }, (err, result) => {
                    if (result) {
                        return res.json({
                            success:false,
                            message: 'Email already in use',
                            result:null,
                        })
                    }
                    if (!result) {
                        bcrypt.hash(password, salt, (err, hashedPassword) => {
                            if (err) {
                                return res.json({
                                    success:false,
                                    message:"Can't hash Password",
                                    error:err.message
                                })
                            }
                            const userinstance = new accountModel({
                                name,
                                email,
                                password: hashedPassword,
                                mobileNo,
                            });
                            userinstance.save({}, (err, result) => {
                                if (err) {
                                    return res.json({
                                        success:false,
                                        message:"Can't save to Database",
                                        error:err.mesage
                                    })
                                }
                                else {
                                    var token = jwt.sign({
                                        user: {_id:result._id}
                                    }, process.env.SECRET, {
                                        expiresIn: '7d'
                                    });
                                    return res.json({
                                        success: true,
                                        message: 'Enjoy your token',
                                        token: token,
                                        user:{_id:result._id,
                                            name:result.name,
                                            email:result.email,
                                            mobileNo:result.mobileNo}
                                    });
                                }

                            })
                        })
                    }
                    if (err) {
                        return res.json({
                            success:false,
                            message:"Can't access DataBase",
                            error:err.mesage
                        })
                    }

                })
            }
            if (err) {
                return res.json({
                    success:false,
                    message:"Can't generate salt for password",
                    error:err.message
                })
            }

        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Error Occurred",
            error:error.mesage
        })
    }
}

exports.login = (req, res) => {
    accountModel.findOne({ email: req.body.email }, (err, user) => {
        try {
            if (err) {
                return res.json({
                    success:false,
                    message:"Can't access DataBase",
                    error:err.mesage
                })
            }
            if (!user) {
                return res.json({
                    success:false,
                    message:"Incorrect Email",
                })
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.json({
                        success:false,
                        message:"Can't compare Password",
                        error:err.message
                    })
                }
                if (result) {
                    var token = jwt.sign({
                        user: {_id:user._id}
                    }, process.env.SECRET, {
                        expiresIn: '7d'
                    });
                    return res.json({
                        success: true,
                        mesage: "Enjoy your token",
                        token: token,
                        user:{_id:user._id,
                            name:user.name,
                            email:user.email,
                            mobileNo:user.mobileNo}
                    });
                }
                else {
                    return res.json({
                        success:false,
                        message: 'Incorrect Password',
                        error:'Incorrect Credentials',
                    })
                }
            })
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:"Error Occurred",
                error:error.mesage
            })
        }
    });
}

exports.logout=(req,res)=>{
    try{
        if(!req.decoded.user._id){
            return res.json({
                success:false,
                message:"Can't Logout for now",
                error:'Error Occured',
            })
        }
        return res.json({
            success:false,
            message:"Logout Successfull",
            result:null
        })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"Error Occured",
            error:err.mesage
        })
    }
}

exports.profile = (req, res) => {
    try {
        accountModel.findOne({ _id: req.decoded.user._id }, (err, user) => {
            if (err) {
                return res.json({
                    success:false,
                    message:"Can't access DataBase",
                    error:err.mesage
                })
            }
            if(user) {
                return res.json({
                    success: true,
                    message: "Successful",
                    result:{
                        email:user.email,
                        _id:user._id,
                        name:user.name,
                        mobileNo:user.mobileNo
                    }
                });
            }
            if(!user) {
                return res.json({
                    success: false,
                    message: "User not found",
                    error:'User not found',
                })
            }

        });
    }catch (error) {
        return res.status(400).json({
            success:false,
            message:"Error Occurred",
            error:error.mesage
        })
    }
}

exports.profileUpdate = (req, res) => {
    try {
        accountModel.findOne({ _id: req.decoded.user._id }, (err, user) => {
            if (err) {
                return res.json({
                    success:false,
                    message:"Can't access DataBase",
                    error:err
                })
            }
            if (req.body.name) user.name = req.body.name;
            if (req.body.email) user.email = req.body.email;
            if (req.body.mobileNo) user.mobileNo = req.body.mobileNo;

            user.save()
            return res.json({
                success: true,
                message: 'Successfully edited your profile'
            });
        });
    }catch (error) {
        return res.status(400).json({
            success:false,
            message:"Error Occurred",
            error:error
        })
    }
}

exports.profileDelete = (req, res) => {
    try {
        accountModel.deleteOne({ _id: req.decoded.user._id }, (err) => {
            if (err) {
                return res.json({
                    success:false,
                    message:"Can't access DataBase",
                    error:err
                })
            }
            else {
                return res.json({
                    success:true,
                    message: "Profile deleted"
                })
            }
        })
    }catch (error) {
        return res.status(400).json({
            success:false,
            message:"Error Occurred",
            error:error
        })
    }
}
