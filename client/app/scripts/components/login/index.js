import React, {Component} from 'react';
import OpenLogin from '../commons/OpenLogin';
import LoginForm from './LoginForm';
import Title from './Title';

export default class Login extends Component {
    render() {
        return (
            <div className="container payment">
                <Title />
                <div className="row">
                    <OpenLogin {...this.props}/>
                    <LoginForm {...this.props}/>
                </div>
                <br className="clean" />
            </div>
        );
    }
}
