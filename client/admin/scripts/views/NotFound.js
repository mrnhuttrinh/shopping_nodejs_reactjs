import React, {Component} from 'react'

export default class NotFound extends Component{
    render() {
        return (
            <div>
                <h2>{this.props.children || "Trang ko tim thay"}</h2>
            </div>
        )
    }
}