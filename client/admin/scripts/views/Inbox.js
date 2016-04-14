import React, {Component} from 'react'
import MasterPage from './MasterPage'
export default class Inbox extends Component{
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
                        <li>Home</li><li>Inbox</li>
                    </ol>
                </div>
                <div id="content">
                    <h2>Inbox</h2>
                    {this.props.children || "Welcome to your Inbox"}
                </div>
            </MasterPage>
        )
    }
}
