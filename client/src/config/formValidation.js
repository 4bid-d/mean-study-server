const EMAIL_VALIDATION_REGEX = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/  
const PASSWORD_VALIDATION_REGEX  =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
const USERNAME_VALIDATION_REGEX = /^[a-z0-9_\.]+$/
const VALIDATION_MESSAGES={
  BASIC:{
    USERNAME_REQUIRED : "Username is required.",
    EMAIL_REQUIRED : "Email is required.",
    PASSWORD_REQUIRED : "Password is required.",
    SOMETHING_WRONG : "Something went wrong."
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

export {
    USERNAME_VALIDATION_REGEX,
    VALIDATION_MESSAGES,
    EMAIL_VALIDATION_REGEX,
    PASSWORD_VALIDATION_REGEX
}