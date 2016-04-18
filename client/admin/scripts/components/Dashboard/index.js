import React, {Component} from 'react'
import Modal from '../Modal';
import _ from 'lodash';
import AddProduct from './AddProduct';
import Widget from './Widget';

export default class DashboardContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var modalName = "addProduct"
        return (
            <div>
                <AddProduct {...this.props} modalName={modalName}/>
                <Widget {...this.props} modalName={modalName}/>
            </div>
        );
    }
}