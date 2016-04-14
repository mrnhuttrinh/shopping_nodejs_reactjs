import React, {Component} from 'react'
import Product from '../components/Products'
import MasterPage from './MasterPage'

export default class About extends Component{
    render() {
        return (
            <MasterPage pathname={this.props.location.pathname}>
                <div id="ribbon">
                    <span className="ribbon-button-alignment"> 
                        <span id="refresh" className="btn btn-ribbon" data-action="resetWidgets" data-title="refresh"  rel="tooltip" data-placement="bottom" data-original-title="<i className='text-warning fa fa-warning'></i> Warning! This will reset all your widget settings." data-html="true">
                            <i className="fa fa-refresh"></i>
                        </span> 
                    </span>
                    <ol className="breadcrumb">
                        <li>Home</li><li>Products</li>
                    </ol>
                </div>
                <div id="content">
                    <Product />
                </div>
            </MasterPage>
        )
    }
}