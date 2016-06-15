import React, {Component} from 'react';
import BreadCrumb2 from '../BreadCrumb2';
import Galleries from './Galleries';
import RightInfo from './RightInfo';

export default class Product extends Component {
    render() {
        return (
            <div className="index_middle">
                <BreadCrumb2 />
                <div className="container">
                    <br className="clean" />
                    <div className="row">
                        <Galleries />
                        <RightInfo />
                    </div>
                </div>
            </div>
        );
    }
};