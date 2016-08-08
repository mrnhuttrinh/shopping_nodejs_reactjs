import React, {Component} from 'react';
import { connect } from 'react-redux';
import MasterPage from './MasterPage';
import actions from '../actions/main';
import MenuContent from '../components/size';

class Size extends Component{
    render() {
        return (
            <MasterPage 
                {...this.props}
                pathname={this.props.location.pathname}
                title={"Quản Lý Menu"}>
                <div id="content">
                    <MenuContent {...this.props} />
                </div>
            </MasterPage>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.default
    };
}

export default connect(
    mapStateToProps,
    actions
)(Size);