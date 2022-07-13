import { render, screen } from '@testing-library/react';
import App from './App';
import {mockSignUpEndpointRequest, signUpHandler, invalidateSignUp} from "./signupUtils";
import {fireEvent, waitFor} from "@testing-library/dom";
//#1 test validator
test('empty email and password do not create account', () => {
    expect(invalidateSignUp(null,null)).not.toEqual(false);
});
test('empty email and too-short password do not create account successfully', () => {
    expect(invalidateSignUp('valid@example.com','abc')).not.toEqual(false);
});
//#2 create field and button components with no other methods
test('expect screen to render all components', () => {
    render(<App />);
    const buttonElement = screen.getByText(/Sign Up/i);
    const inputEmailElement = screen.getByPlaceholderText('Your email address');
    const inputPasswordElement = screen.getByPlaceholderText(/Your password/i);
    expect(inputEmailElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
    expect(inputPasswordElement).toBeInTheDocument();
});
//#3 create method for input function, expect input event affects the value of the field
test('expect email input to respond to typing and update value', () => {
    render(<App />);
    const inputEmailElement = screen.getByPlaceholderText('Your email address');
    fireEvent.change(inputEmailElement, {target: {value: 'test@example.com'}})
    expect(inputEmailElement.value).toBe('test@example.com')
});
test('expect password input to respond to typing and update value', () => {
    render(<App />);
    const inputPasswordElement = screen.getByPlaceholderText(/Your password/i);
    fireEvent.change(inputPasswordElement, {target: {value: 'test123@'}})
    expect(inputPasswordElement.value).toBe('test123@')
});
//#4 put it all together by using an input we know to be incorrect
test('expect invalid input to render error message', () => {
    render(<App />);
    const inputEmailElement = screen.getByPlaceholderText('Your email address');
    fireEvent.change(inputEmailElement, {target: {value: 'test@example.com'}})
    expect(inputEmailElement.value).toBe('test@example.com')
    const inputPasswordElement = screen.getByPlaceholderText(/Your password/i);
    fireEvent.change(inputPasswordElement, {target: {value: 'invalid'}})
    expect(inputPasswordElement.value).toBe('invalid')
    fireEvent(
        screen.getByText('Sign Up'),
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }),
    )
    const errorMessageElement=screen.queryByTestId('error-msg');
    expect(errorMessageElement).toBeInTheDocument();
});

test('and expect valid input to not render error message but rather complete sign in', async() => {
    render(<App />);
    const inputEmailElement = screen.getByPlaceholderText('Your email address');
    fireEvent.change(inputEmailElement, {target: {value: 'test@example.com'}})
    expect(inputEmailElement.value).toBe('test@example.com')
    const inputPasswordElement = screen.getByPlaceholderText(/Your password/i);
    fireEvent.change(inputPasswordElement, {target: {value: 'veryValid123@'}})
    expect(inputPasswordElement.value).toBe('veryValid123@')
    const confirmPasswordElement = screen.getByPlaceholderText(/Confirm password/i);
    fireEvent.change(confirmPasswordElement, {target: {value: 'veryValid123@'}})
    expect(confirmPasswordElement.value).toBe('veryValid123@')
    fireEvent(
        screen.getByText('Sign Up'),
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }),
    )
    //no error message
    const errorMessageElement=screen.queryByTestId('error-msg');
    expect(errorMessageElement).not.toBeInTheDocument();
    //successs message present (note i had to rewrite this one a few times to get it to pass)
    const successMessageElement=await screen.findByTestId('success-msg',{},{interval:10000});
    expect(successMessageElement).toBeInTheDocument();



});

