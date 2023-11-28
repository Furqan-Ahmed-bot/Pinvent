const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")


const userSchema = mongoose.Schema({
    name : {
        type: String,
        required: [true , "Please Add a User Name"]
    },
    email: {
        type: String, 
        required : [true , 'Please Add a email'], 
        unique: true,
        trim: true,
        match : [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email address"
        ]



    },
    password :{
        type : String,
        required : [true , "Please add a name"],
        minLength: [6 , "Password must be up to 6 characters"],
       // maxLenght: [23 , "Password must not be more than 23 characters"],
    
    },
    photo:{
        type : String,
        required : [true , "Please add a name"],
        default: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
    },
    phone:{
        type : String,
        default:"+92"
    },
    bio:{
        type : String,
        maxLenght: [250 , "Bio must not be more than 250 characters"],
        default:"bio"
    }


}, {
    timestamps: true,
});

//Encrypt the password before daving to the DB

userSchema.pre('save' , async function(next){
    if(!this.isModified("password")){
        return next();
    }
    // Hash password
 

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password , salt);
    this.password = hashedPassword; 


})

const User = mongoose.model("User" , userSchema)
module.exports = User