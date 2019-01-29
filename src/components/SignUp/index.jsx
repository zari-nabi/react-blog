import React from "react";
import { validateAll } from "indicative";
import Axios from "axios";
import config from "../../config";

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = async(event) => {
        event.preventDefault();

        const data = this.state;
        const rules = {
            name: 'required|string',
            email: 'required|email',
            password: 'required|string|min:6|confirmed'

        }

        const message={
            required : 'the {{field}} is required',
            'email.email' : 'the format is invalid',
            'password.confirmed' : 'the password does not match'
        }

        try{
            await validateAll(data, rules, message)

            try{
                  const response = await Axios.post(`${config.apiUrl}/auth/register`,{
                    name:this.state.name,
                    email:this.state.email,
                    password:this.state.password
                  })  
                  localStorage.setItem('user',JSON.stringify(response.data.data));
                  this.props.setAuthUser(response.data.data);
                  this.props.history.push('/');

            } catch(errors){
                 const formatedErrors = {};
                errors.forEach(error => formatedErrors[error.field] = error.message);
                this.setState({
                    errors: formatedErrors
                })
            }

        } catch(errors){
            const formatedErrors = {};
                errors.forEach(error => formatedErrors[error.field] = error.message);
                this.setState({
                    errors: formatedErrors
                })
        }



    }
    render() {
        return (
            <div className="mh-fullscreen bg-img center-vh p-20" style={{ backgroundImage: 'url(assets/img/bg-girl.jpg)' }}>
                <div className="card card-shadowed p-50 w-400 mb-0" style={{ maxWidth: '100%' }}>
                    <h5 className="text-uppercase text-center">Register</h5>
                    <br />
                    <br />
                    <form className="form-type-material">
                        <div className="form-group">
                            <input name="name" onChange={this.handleChange} type="text" className="form-control" placeholder="Username" />
                            {
                                this.state.errors['name'] &&
                                <small className="text-danger">{this.state.errors['name']}</small>
                            }
                        </div>
                        <div className="form-group">
                            <input name="email" onChange={this.handleChange} type="text" className="form-control" placeholder="Email address" />
                            {
                                this.state.errors['email'] &&
                                <small className="text-danger">{this.state.errors['email']}</small>
                            }
                        </div>
                        <div className="form-group">
                            <input name="password" onChange={this.handleChange} type="password" className="form-control" placeholder="Password" />
                            {
                                this.state.errors['password'] &&
                                <small className="text-danger">{this.state.errors['password']}</small>
                            }
                        </div>
                        <div className="form-group">
                            <input name="password_confirmation" onChange={this.handleChange} type="password" className="form-control" placeholder="Password (confirm)" />
                        </div>
                        <br />
                        <button onClick={this.handleSubmit} className="btn btn-bold btn-block btn-primary" type="submit">Register</button>
                    </form>
                    <hr className="w-30" />
                    <p className="text-center text-muted fs-13 mt-20">Already have an account?
                <a href="login.html">Sign in</a>
                    </p>
                </div>
            </div>
        )
    }
}

export default SignUp;