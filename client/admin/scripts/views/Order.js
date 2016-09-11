import React, {Component} from 'react'
import { connect } from 'react-redux'
import MasterPage from './MasterPage'
import actions from '../actions/main'
import Content from '../components/order'

class Order extends Component{
    render() {
        return (
            <MasterPage 
                {...this.props}
                pathname={this.props.location.pathname}
                title={"Đơn Đặt Hàng"}>
                <div id="content">
                    <Content {...this.props} />
                </div>
            </MasterPage>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.default
    }
}

export default connect(
    mapStateToProps,
    actions
)(Order)