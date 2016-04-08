import React, {Component} from 'react'
export default class Message extends Component{
    render() {
        if (!this.props.params.id) {
            return <h3>Message not found</h3>
        }
        return <h3>Message {this.props.params.id}</h3>
    }
}
