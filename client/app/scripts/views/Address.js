import React, {Component}   from 'react';
import { connect }          from 'react-redux';
import actions              from '../actions/main';
import MasterPage           from './MasterPage';
import Contents             from '../components/address';

export default class Address extends Component {
    componentDidMount() {
        document.title = "Địa Chỉ Nhận Hàng";
    }
    render() {
        return (
            <MasterPage {...this.props}>
                <Contents {...this.props}/>
            </MasterPage>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.default
    }
}

export default connect(mapStateToProps, actions)(Address)