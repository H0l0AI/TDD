import React,{Component} from 'react';
import {invalidateSignUp, mockSignUpEndpointRequest,} from "./signupUtils";

export default class SignUpForm extends Component{
    constructor(props) {
        super(props);
        this.state={
            emailFormFields:{
                emailSignIn:'',
                passwordSignIn:'',
                passwordConfirm:'',
            },
            success:false,
        }

    }
     handleSignInFormChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => {
            const { emailFormFields } = prevState;
            emailFormFields[name] = value;
            return { emailFormFields };
        });
    };


    signUpHandler=(email,password,passwordConfirm)=>{
        if(!invalidateSignUp(email,password,passwordConfirm)){
            //completeSignUp
            mockSignUpEndpointRequest().then((res)=>{
                this.setState({success:'Created account and logging you in ... please wait.'})
            }).catch((e)=>{
                this.setState({signUpError:'Some error occured.'})
            });
        }else{
            this.setState({signUpError:invalidateSignUp(email,password,passwordConfirm)})
        }

    }


    render(){
        return(<div>
            <div style={{display:'flex'}}>
                <div style={{display:'block'}}>
                    <div style={{position:'relative'}}>
                        <div style={{position:'absolute',fontSize:14,fontWeight:700,paddingTop:15,marginLeft:18}}>Email</div>
                    </div>
                    <input
                        style={{width: 250,border:'1px solid #C3C4C9',borderRadius:4,outline:'none' }}
                        type="text"
                        name="emailSignIn"
                        id="emailSignIn"
                        value={this.state.emailFormFields.emailSignIn}
                        placeholder="Your email address"
                        className="signup-form"
                        onChange={this.handleSignInFormChange}

                    />


                    <div style={{position:'relative'}}>
                        <div style={{position:'absolute',fontSize:14,fontWeight:700,paddingTop:15,marginLeft:18}}>Password</div>
                    </div>
                    <input
                        style={{ width: 250 ,border:'1px solid #C3C4C9',borderRadius:4}}
                        type="password"
                        name="passwordSignIn"
                        id="passwordSignIn"
                        value={this.state.emailFormFields.passwordSignIn}
                        placeholder="Your password"
                        className="signup-form"
                        onChange={this.handleSignInFormChange}
                    />

                    <div style={{position:'relative'}}>
                        <div style={{position:'absolute',fontSize:14,fontWeight:700,paddingTop:15,marginLeft:18}}>Password</div>
                    </div>
                    <input
                        style={{ width: 250 ,border:'1px solid #C3C4C9',borderRadius:4}}
                        type="password"
                        name="passwordConfirm"
                        id="passwordConfirm"
                        value={this.state.emailFormFields.passwordConfirm}
                        placeholder="Confirm password"
                        className="signup-form"
                        onChange={this.handleSignInFormChange}
                    />

                    <div style={{ position: 'relative' }}>
                        <div style={{
                            position: 'absolute', color: 'red', fontSize: 18, top: '40px', marginLeft: 15,
                        }}
                        >
                            {this.state.signUpError && typeof this.state.signUpError === 'string' && <div data-testid="error-msg" style={{maxWidth:480,marginTop:130}}>{this.state.signUpError}</div>}
                        </div>
                            {this.state.success && typeof this.state.success === 'string' && <div style={{
                                position: 'absolute', color: 'blue', fontSize: 18, top: '40px', marginLeft: 15,maxWidth:480,marginTop:130
                            }} data-testid="success-msg">{this.state.success}</div>}
                        <div
                            className="signInButton"
                            style={{ marginLeft: 80 ,position:'absolute',top:40,left:180}}
                            onClick={() => {
                                this.signUpHandler(this.state.emailFormFields.emailSignIn, this.state.emailFormFields.passwordSignIn,this.state.emailFormFields.passwordConfirm);
                            }}
                        >
                            Sign Up
                        </div>
                        <div style={{height:150}} />
                    </div>
                </div>
            </div>
        </div>)
    }


}