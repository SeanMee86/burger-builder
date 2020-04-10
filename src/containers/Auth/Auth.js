import React, {Component} from "react";
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.scss';
import {auth, setAuthRedirectPath} from "../../store/actions";
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom';
import {updateObject, checkValidity} from "../../shared/util";


class Auth extends Component {
    state ={
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    };

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });
        this.setState({
            controls: updatedControls
        })
    };

    submitHandler = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    };

    render(){
        const formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement =>
            <Input
                onChanged={(event) => {this.inputChangedHandler(event, formElement.id)}}
                key={formElement.id}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                errorMessage={`Please enter a valid ${formElement.id}!`}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                elementConfig={formElement.config.elementConfig}
                elementType={formElement.config.elementType}/>
        );

        if(this.props.loading){
            form = <Spinner/>
        }

        let errorMessage = null;

        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType={'Success'}>Submit</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType={'Danger'}>Switch To {this.state.isSignup ? "SIGNIN" : "SIGNUP"}</Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
});

const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);