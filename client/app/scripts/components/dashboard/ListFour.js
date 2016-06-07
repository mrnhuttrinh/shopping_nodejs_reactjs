import React, {Component} from 'react'
import {Link} from 'react-router';
import _ from 'lodash';

class Item extends Component {
    render() {
        var product = this.props.product;
        var percentSale = 0;
        if (product.price_wholesale !== product.price_wholesale_promotion) {
            percentSale = parseInt((product.price_wholesale_promotion/product.price_wholesale)*100);
        }
        return (
            <li>
                <div className="img">
                    <div className='mask'></div>
                    <Link to={'/product/' + product.text_link}>
                        <img alt={product.alt} className="deal" height="235" src={product.thumbnail} width="235">
                        </img>
                    </Link>
                    <span className="lbl_place">
                        Nha Trang
                    </span>
                    <div className="listdeal_hover_B">
                        <span className="text_alert">

                        </span>
                        <Link className="btn_view" to={'/product/' + product.text_link}>
                            XEM NGAY
                        </Link>
                    </div>
                    <div className="listdeal_evoucher">
                        <span className="ic_cm icon-voucher">
                            I
                        </span>
                        {product.code}
                    </div>
                </div>
                <div className="listdeal_info">
                    <Link className="list_name" to={'/product/' + product.text_link}>
                        {product.name}
                    </Link>
                    <div className="listdeal_group">
                        <p className="listdeal_info_L num_down">
                            {percentSale}
                            <span className="percent">
                                %
                            </span>
                        </p>
                        <p className="listdeal_info_Ce">
                            <span className="trueprice">
                                {product.price_wholesale}đ
                            </span>
                            <br />
                            <span className="price">
                                {product.price_wholesale_promotion}đ
                            </span>
                        </p>
                        <div className="listdeal_info_R">
                            <p className="num_people">
                                <span className="ic_cm icon-num-people">
                                    f
                                </span>
                                <span className="text_num_people">
                                    {product.rate}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

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
