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
            res.redirect('/details');
            console.log('deleted successfully');
        }
    })
}

const details = (req,res)=>{
    userModel.find((err,result)=>{
        if (err) {
            console.log("Could not fetch data");
        } else {
            res.render("pages/details", {userDetails:result})
        }
    })
}

const editUser = (req,res)=> {
    let userId = req.body.id;
    userModel.findOne({_id:userId},(err,result)=>{
        if (err) {
            console.log("unable to edit");
        } else {
            console.log(result);
            res.render("pages/edit",{userDetails:result})
        }
    })
}
const updateUser = (req,res) =>{
    let id = req.body.id;
    userModel.findByIdAndUpdate(id,req.body,(err,resp)=>{
        if (err) {
            console.log(err);
        } else {
            console.log(resp);
            res.redirect('/details');
        }
    })
}
module.exports = { register, deleteUser, details, editUser, updateUser }