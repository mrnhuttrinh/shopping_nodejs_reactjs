import React, {Component} from 'react'
export default class Loading extends Component {
    render() {
        return (
            <button className="btn btn-warning"><span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Loading...</button>
        );
    }
}