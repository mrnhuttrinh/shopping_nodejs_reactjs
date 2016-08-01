import React, {Component} from 'react';
import OpenLogin from '../commons/OpenLogin';
import RegisterForm from './register_form';
import Title from './Title';

export default class Register extends Component {
    render() {
        return (
            <div className="container payment">
                <Title />
                <div className="row">
                    <OpenLogin />
                    <RegisterForm />
                </div>
                <br className="clean" />
            </div>
        );
    }
}
