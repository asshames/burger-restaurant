import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button';
import classes from './UserInfo.module.css';
import Input from '../../components/UI/Input/Input';

class UserInfo extends Component {
    state = {
        userInfo: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name (Must be within 32 characters)'
                },
                value: '',
                validation: {
                    required: true,
                    maxChar: 32
                },
                valid: false,
                touched: false
            },
            number: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Your Phone Number (Must be 11 digits or 13 includes(+88))'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 11,
                    maxLength: 13
                },
                valid: false, 
                touched: false
            }
        },
        formIsValid: false,
        message:''
    }


    checkValidity (value, rules) {

        let isValid = true;
        let msg = 'Message';

        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
            msg = 'Please enter! Required!';
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
            msg = 'Minimum limit 11 digit. Required';
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
            msg = 'Maximum limit 13 digit with (+88). Required';
        }
        
        if (rules.maxChar) {
            isValid = value.length <= rules.maxChar && isValid;
            msg = 'Maximum limit 32 character. Required';
        }

        this.setState({message:msg});

        return isValid;
    }


    continueHandler = () => {
        this.props.history.push('/BurgerBuilder');
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedUserInfo = {
            ...this.state.userInfo
        };
        const updatedFormElement = { 
            ...updatedUserInfo[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedUserInfo[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedUserInfo) {
            formIsValid = updatedUserInfo[inputIdentifier].valid && formIsValid;
        }
        this.setState({userInfo: updatedUserInfo, formIsValid: formIsValid});
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.userInfo) {
            formElementsArray.push({
                id: key,
                config: this.state.userInfo[key]
            });
        }
        let form = (
            <form onSubmit={this.continueHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        errorMessage={this.state.message}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>CONTINUE</Button>
            </form>
        )
        
        return (
            <div className={classes.UserInfo}>
                <h4>Please enter your information</h4>
                {form}
            </div>
        );
    }
}

export default UserInfo;