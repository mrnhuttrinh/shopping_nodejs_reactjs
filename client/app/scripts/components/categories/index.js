import React, {Component} from 'react'
import { connect, bindActionCreators } from 'react-redux'
import Category from './Category'
import {getCategories} from '../../actions/main'

class Categories extends Component{

    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        return (
            <div id="main" role="main">
                <div id="ribbon">
                    <span className="ribbon-button-alignment"> 
                        <span id="refresh" className="btn btn-ribbon" data-action="resetWidgets" data-title="refresh"  rel="tooltip" data-placement="bottom" data-original-title="<i className='text-warning fa fa-warning'></i> Warning! This will reset all your widget settings." data-html="true">
                            <i className="fa fa-refresh"></i>
                        </span> 
                    </span>
                    <ol className="breadcrumb">
                        <li>Home</li><li>Dashboard</li>
                    </ol>
                </div>
                <div id="content">
                    <Category categories={this.props.categories}/>
                </div>
            </div>
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
    {
        getCategories
    }
)(Categories)