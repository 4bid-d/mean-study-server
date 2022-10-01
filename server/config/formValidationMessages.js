const FORM_MESSAGES = {
    SIGNUP : {

        PASSWORD_IS_REQUIRED: "Password is required.",
        EMAIL_IS_REQUIRED : "Email is required.",
        USERNAME_IS_REQUIRED : "Username is required.",
        SIGNEDIN_SUCCESSFULLY :"Successfully signed up.",
        ALREADY_IN : "You already have joined please login.",
        USERNAME_NOT_AVAILABLE: "Username is not available.Kindly try another one.",
        PROVIDE_SUFFIECIENT_DETAILS: "Please Provide sufficient detaills for signup.", 
        VALIDATION : {
            REGEX:{
                EMAIL_VALIDATION_REGEX : /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,  
                PASSWORD_VALIDATION_REGEX  :  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/,
                USERNAME_VALIDATION_REGEX : /^[a-z0-9_\.]+$/,
            },
            USERNAME_VALIDATION:{
                USERNAME_REGEX_VALIDATION : "Username should only contain Lowercase(a-z), Numbers(0-9), periods(.),underscores(_)"
            },
            EMAIL_VALIDATION:{
                REQUIRED_SYMBOL : `Mail id should contain @ symbol.`,
                ENTER_VALID_ADDRESS:`Please enter valid address.`,
                COM_ERROR :    `You have just missed a ".com" there.`   
            },          
            PASSWORD_VALIDATION:{
               MIN_LETTER_VALIDATION : `Password should contain atleast 8 letters`,
               MAX_LETTER_VALIDATION :`Password should only contain less than 12 letters`
            } 
        }
    },
    LOGIN :{

        NO_USER_FOUND : "Invalid Email address or User not found.",
        INVALID_USERNAME : "Invalid username.",
        INVALID_PASSWORD :"Invalid password" ,
        SUCCESSFULLY_LOGINED : "Login Successfully completed."
    }
}


module.exports = FORM_MESSAGES
