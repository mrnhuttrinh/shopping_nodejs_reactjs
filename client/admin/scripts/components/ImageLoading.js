import React, {Component} from 'react'
export default class ImageLoading extends Component {
    render() {
        var style = {
            height: "20px",
            width: "20px",
            display: "block",
            margin: "auto"
        }
        return (
            <img style={style} src="img/bx_loader.gif" alt="Loading..." className="img-circle" />
        );
    }
}