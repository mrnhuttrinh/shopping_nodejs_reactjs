import React, {Component} from 'react'
import MasterPage from './MasterPage'
import { connect } from 'react-redux'
import actions from '../actions/main'
import ViewProduct from '../components/view_product';

class ProductDetail extends Component{
    render() {
        return (
            <MasterPage 
                pathname={this.props.location.pathname}
                {...this.props}
                title={"Chỉnh Sửa Sản Phẩm"}>
                <div id="content">
                    <ViewProduct {...this.props}/>
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
)(ProductDetail)