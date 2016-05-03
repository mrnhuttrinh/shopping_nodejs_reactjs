import React, {Component} from 'react'
import MasterPage from './MasterPage'
import { connect } from 'react-redux'
import actions from '../actions/main'
import TradeMarkContent from '../components/trademark'

class TradeMark extends Component{
    render() {
        return (
            <MasterPage 
                pathname={this.props.location.pathname}
                {...this.props}
                title={"Thương Hiệu"}>
                <div id="content">
                    <TradeMarkContent {...this.props}/>
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
)(TradeMark)