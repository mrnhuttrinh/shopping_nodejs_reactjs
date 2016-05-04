import React, {Component} from 'react'

export default class PopOver extends Component{
    render() {
        return (
            <div ref={this.props.name} className="popover top">
                <div className="arrow"></div>
                <h3 className="popover-title">{this.props.popover.title}Ư</h3>
                <div className="popover-content"> 
                    <p>{this.props.popover.content}</p> 
                </div>
            </div>
        )
    }
}
