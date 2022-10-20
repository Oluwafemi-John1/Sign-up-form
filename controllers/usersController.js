const userModel = require("../models/userModel");

const register = (req,res)=>{
    // const { first_name, last_name, email, password } = req.body;
    const signupDetails = req.body;
    let form = new userModel(signupDetails)
    let userEmail = req.body.email

    userModel.find({email:userEmail},(err,result)=>{
        if(err) {
            console.log("data not found");
        } else {
            if (result.length>0) {
                console.log('user already exists');
                res.render('pages/register', {message:'User already exists',status:false});
                
            } else {
                form.save((err,result)=>{
                    if (err) {
                        console.log("error occurred when submitting");
                        res.render('pages/register', {message:'Sign up not successful,please try again',status:false});
                    } else {
                        console.log('form submitted successfully');
                        res.render('pages/register', {message:'Sign up successful',status:true});
                    }
                })
            }
        }
    })
    // console.log(first_name,last_name,email,password);
    // userDetails.push(signupDetails);
    // console.log(userDetails);
}

const deleteUser = (req,res)=>{
    let userId = req.body.id
    userModel.deleteOne({_id:userId},(err,result)=>{
        if (err) {
            console.log('delete failed. Try again');
        } else {
            userModel.find((err,result)=>{
                if (err) {
                    console.log("error occured");
                } else {
                    console.log(result);
                    res.render("pages/details", {userDetails:result})
                    console.log('deleted successfully');
                }
            })
        }
    })
    console.log(req.body);
}

const details = (req,res)=>{
    userModel.find((err,result)=>{
        if (err) {
            console.log("Could not fetch data");
        } else {
            console.log(result);
            res.render("pages/details", {userDetails:result})
        }
    })
}

module.exports = { register, deleteUser, details }