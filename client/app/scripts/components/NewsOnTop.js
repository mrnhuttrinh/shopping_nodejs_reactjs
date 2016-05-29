import React, {Component} from 'react'
import {Link} from 'react-router';

export default class NewsOnTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        };
    }
    componentWillMount() {
        document.body.style.overflowY = "hidden";
    }
    turnOffShowOnTop(event) {
        event.preventDefault();
        document.body.style.overflowY = "visible";
        this.setState({
            show: false
        });
    }
    render() {
        if (this.state.show) {
            var news = this.props.news;
            var style = {
                position: "fixed",
                top: "0px",
                left: "0px",
                zIndex: 9999,
                textAlign: "center",
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                height: "100%"
            };
            var divinside = {
                marginTop: "5%",
                position: "relative",
                display: "inline-block"
            };
            var spanStyle = {
                position: "absolute",
                top: "10px",
                right: "10px", 
                cursor: "pointer",
                color: "wheat"
            };
            var imageStyle = {
                "box-shadow": "10px 10px 5px #ccc",
                "-moz-box-shadow": "10px 10px 5px #ccc",
                "-webkit-box-shadow": "10px 10px 5px #ccc",
                "-khtml-box-shadow": "10px 10px 5px #ccc"
            }
            return (
                <div style={style}>
                    <div style={divinside}>
                        <span onClick={this.turnOffShowOnTop.bind(this)} className="glyphicon glyphicon-remove cursor-pointer" style={spanStyle}></span>
                        <Link to="/">
                            <img style={imageStyle} src={"admin/" + news.main_image}></img>
                        </Link>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}