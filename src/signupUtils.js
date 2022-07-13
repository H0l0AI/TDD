// #1 first function to be created, small validator function for testing input is valid.
//obviously you could extend this validator to cover as many cases as you want or even use a third party library like formik

export const validateSignUp=(email,password)=>{
    if(!email||!password){
        return false
    }
    else if(password.length<8){
        return false
    }
    else{
        return true;
    }
}
export const mockSignUpEndpointRequest = ()=>{
    return new Promise(resolve => {
        setTimeout(resolve, 100, {status:200});
    });

}