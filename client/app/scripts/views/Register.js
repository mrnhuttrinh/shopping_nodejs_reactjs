import React, {Component}   from 'react';
import { connect }          from 'react-redux';
import actions              from '../actions/main';
import MasterPage           from './MasterPage';
import Contents             from '../components/register';

export default class Register extends Component {
    componentDidMount() {
        document.title = "Đăng Ký";
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

export default connect(mapStateToProps, actions)(Register)