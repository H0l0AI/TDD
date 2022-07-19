import React, {Component, useEffect, useState} from 'react';
import {invalidateSignUp, mockSignUpEndpointRequest,} from "./signupUtils";
import {InputComponent} from "./components/inputComponent";

export function SignUpForm(){
    const [state, setState] = useState({
        emailFormFields:{
            emailSignIn:'',
            passwordSignIn:'',
            passwordConfirm:'',
        },
    });
    const[error,setError]=useState({
        signUpError:'',
    })

    useEffect(() => {
        console.log('email form fields', state);
    }, [state])
    const handleSignInFormChange = (event) => {
        const { name, value } = event.target;
        let newState=state.emailFormFields;
        newState[name]=value;
        setState({emailFormFields: newState});
    };


   const signUpHandler=(email,password,passwordConfirm)=>{
       console.log('e',email,password);
        if(!invalidateSignUp(email,password,passwordConfirm)){
            //completeSignUp
            mockSignUpEndpointRequest().then((res)=>{
            }).catch((e)=>{
            });
        }else{
            return setError({signUpError:invalidateSignUp(email,password,passwordConfirm)});
        }

    }
    const ErrorBlock =({signUpError})=>{
       console.log('signup error',signUpError);
       if(signUpError){
           return(<div data-testid="error-msg" style={{maxWidth:480,marginTop:130}}>{signUpError}</div>);

       }
       return null;
    }
    console.log('init state',state);
        return(<div>
            <div style={{display:'flex'}}>
               <div>
                    <div style={{display:'block'}}>
                        <div style={{position:'relative'}}>
                            <div style={{position:'absolute',fontSize:14,fontWeight:700,paddingTop:15,marginLeft:18}}>Email</div>
                        </div>
                        <InputComponent type={'text'} name={'emailSignIn'} value={state.emailFormFields.emailSignIn} placeholder={'Your email address'} changeFunction={handleSignInFormChange} />


                        <div style={{position:'relative'}}>
                            <div style={{position:'absolute',fontSize:14,fontWeight:700,paddingTop:15,marginLeft:18}}>Password</div>
                        </div>
                        <InputComponent type={'password'} name={'passwordSignIn'} value={state.emailFormFields['passwordSignIn']} placeholder={'Your password'} changeFunction={handleSignInFormChange} />

                        <div style={{position:'relative'}}>
                            <div style={{position:'absolute',fontSize:14,fontWeight:700,paddingTop:15,marginLeft:18}}>Password</div>
                        </div>
                        <InputComponent type={'password'} name={'passwordConfirm'} value={state.emailFormFields['passwordConfirm']} placeholder={'Confirm password'} changeFunction={handleSignInFormChange} />
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                position: 'absolute', color: 'red', fontSize: 18, top: '40px', marginLeft: 15,
                            }}
                            >
                                {error.signUpError&&error.signUpError}
                            </div>
                            {state.success && typeof state.success === 'string' && <div style={{
                                position: 'absolute', color: 'blue', fontSize: 18, top: '40px', marginLeft: 15,maxWidth:480,marginTop:160
                            }} data-testid="success-msg">{state.success}</div>}
                            <button
                                className="signInButton"
                                style={{ marginLeft: 80 ,position:'absolute',top:140,left:180}}
                                onClick={() => {
                                    signUpHandler(state.emailFormFields.emailSignIn, state.emailFormFields.passwordSignIn,state.emailFormFields.passwordConfirm);
                                }}
                            >
                                Sign Up
                            </button>
                            <div style={{height:150}} />
                        </div>
                    </div>
               </div>
            </div>
        </div>)
}