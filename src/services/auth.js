import { validateAll } from "indicative";
import Axios from "axios";
import config from "../config";

export default class AuthService {
    async registerUser(data) {

        const rules = {
            name: 'required|string',
            email: 'required|email',
            password: 'required|string|min:6|confirmed'

        }

        const message = {
            required: 'the {{field}} is required',
            'email.email': 'the format is invalid',
            'password.confirmed': 'the password does not match'
        }

        try {
            await validateAll(data, rules, message)
            const response = await Axios.post(`${config.apiUrl}/auth/register`, {
                name: data.name,
                email: data.email,
                password: data.password
            })
            return response.data.data;

        } catch (errors) {
            const formatedErrors = {};
            if (errors.status === 422) {
                formatedErrors['email'] = errors.response.data['email'][0];
                return Promise.reject(formatedErrors)
            }
            errors.forEach(error => formatedErrors[error.field] = error.message);
            return Promise.reject(formatedErrors)
        }


    }
}