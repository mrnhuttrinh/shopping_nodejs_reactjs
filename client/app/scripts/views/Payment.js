import React, {Component}   from 'react';
import { connect }          from 'react-redux';
import actions              from '../actions/main';
import MasterPage           from './MasterPage';
import Contents             from '../components/payment';

export default class Payment extends Component {
    componentDidMount() {
        document.title = "Thanh Toán";
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

export default connect(mapStateToProps, actions)(Payment)