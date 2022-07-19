// #1 first function to be created, small validator function for testing input is valid.
//obviously you could extend this validator to cover as many cases as you want or even use a third party library like formik

export const passwordMatch=(password)=>{return password.match('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')}

export const invalidateSignUp=(email,password,passwordConfirm)=>{
    if(!email||!password){
        return 'Must enter a valid email address and password'
    }
    else if(!passwordMatch(password)){
        return `Password must have at least one capital letter, one numeric character, and one
special character.`
    }
    else if(passwordConfirm!==password){
        return 'Passwords must match';
    }
    else{
        return false;
    }
}
export const mockSignUpEndpointRequest = ()=>{
    return new Promise(resolve => {
        setTimeout(resolve, 100, {status:200});
    });

}