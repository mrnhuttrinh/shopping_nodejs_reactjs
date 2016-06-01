import React, {Component} from 'react'
export default class DivLoading extends Component {
    render() {
        var style = {
            margin: "auto",
            display: "block"
        };
        return (
            <img style={style} src="images/loading_1.gif"/>
        );
    }
}