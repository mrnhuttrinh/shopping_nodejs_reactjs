import React, {Component} from 'react'
import Product from '../components/Products'
import MasterPage from './MasterPage'
import { connect } from 'react-redux'
import actions from '../actions/main'

class ProductPage extends Component{
    render() {
        return (
            <MasterPage 
                pathname={this.props.location.pathname}
                {...this.props}
                title={"Product"}>
                <div id="content">
                    <Product {...this.props}/>
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
)(ProductPage)