import React, {Component} from 'react'
import {Link} from 'react-router';
import _ from 'lodash';
import formatCurrency from '../../utils/formatcurrency';
import Item from '../ItemProduct';

class ControlPrev extends Component {
    _onClick(event) {
        event.preventDefault();
        this.props.clickControlButton("prev");
    }
    render() {
        var show = this.props.show;
        var style = {
            position: "absolute",
            top: "50%",
            marginTop: "-22px",
            display: "inline-block",
            width: "42px",
            height: "42px",
            textIndent: "-9999px",
            cursor: "pointer",
            zIndex: 600,
            opacity: 0,
            filter: "alpha(opacity=0)",
            transition: "All 0.3s ease",
            WebkitTransition: "All 0.3s ease",
            MozTransition: "All 0.3s ease",
            OTransition: "All 0.3s ease",
            backgroundImage: "url(../images/arr-left.png)"
        };
        if (show) {
            style.opacity = 1;
            style.border = "1px solid";
        }
        return (<span onClick={this._onClick.bind(this)} style={style}>Next</span>);
    }
}

class ControlNext extends Component {
    _onClick(event) {
        event.preventDefault();
        this.props.clickControlButton("next");
    }
    render() {
        var show = this.props.show;
        var style = {
            position: "absolute",
            top: "50%",
            right: "0px",
            marginTop: "-22px",
            display: "inline-block",
            width: "42px",
            height: "42px",
            textIndent: "-9999px",
            cursor: "pointer",
            zIndex: 600,
            opacity: 0,
            filter: "alpha(opacity=0)",
            transition: "All 0.3s ease",
            WebkitTransition: "All 0.3s ease",
            MozTransition: "All 0.3s ease",
            OTransition: "All 0.3s ease",
            backgroundImage: "url(../images/arr-right.png)"
        };
        if (show) {
            style.opacity = 1;
            style.border = "1px solid";
        }
        return (<span onClick={this._onClick.bind(this)} style={style}>Next</span>);
    }
}

export default class ListFour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseOver: false
        };
    }
    _onMouseOver(event) {
        event.preventDefault();
        this.setState({
            mouseOver: true
        });
    }
    _onMouseOut(event) {
        event.preventDefault();
        this.setState({
            mouseOver: false
        });
    }
    render() {
        var state = this.state;
        var products = this.props.products;
        var index = 0;
        var listItem = _.map(products, (product) => {
            return (<Item key={"produt_" + index++} product={product}/>)
        });
        if (listItem.length === 0) {
            listItem = (
                <h1><small>Hiện Tại</small> Chưa Có Sản Phẩm</h1>
            );
        }
        var contentControlIfClick = null;
        var control = this.props.control;
        if (control) {
            if (control.next > control.prev) {
                contentControlIfClick =  (<ControlPrev clickControlButton={this.props.clickControlButton} show={state.mouseOver}/>);
            } else {
                contentControlIfClick =  (<ControlNext clickControlButton={this.props.clickControlButton} show={state.mouseOver}/>);
            }
        }
        return (
            <div onMouseOver={this._onMouseOver.bind(this)}
                onMouseOut={this._onMouseOut.bind(this)}
                style={{position: "relative"}}>
                <ul className="listdeal_four">
                    {listItem}
                </ul>
                {
                    products.length >= 8 ? (<ControlPrev clickControlButton={this.props.clickControlButton} show={state.mouseOver}/>) : contentControlIfClick
                }
                {
                    products.length >= 8 ? (<ControlNext clickControlButton={this.props.clickControlButton} show={state.mouseOver}/>) : contentControlIfClick
                }
            </div>
        );
    }
}
