import React, {Component} from 'react'

export default class NotFound extends Component{
    render() {
        return (
            <div>
                <h2>{this.props.children || "Page not found"}</h2>
            </div>
        )
    }
}