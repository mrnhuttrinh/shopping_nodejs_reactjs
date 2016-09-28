import React, {Component} from 'react';
import _ from 'lodash';
import RightTop from './RightTop';
import RightBottom from './RightBottom';
import PopUpWarn from '../PopUpWarn';
import { Router, Link, Navigation } from 'react-router';
var transitionTo = Router.transitionTo;

export default class RightInfo extends Component {
    constructor(props) {
        super(props);
        this.carts = [];
        this.state = {
            onPopUp: null
        };
    }
    turnOffShowOnTop() {
        this.setState({
            onPopUp: null
        });
    }
    addToCart() {
        if (!this.carts.length) {
            // show pop up
            this.setState({
                onPopUp: (<PopUpWarn contentText={"Vui lòng chọn số lượng."} turnOffShowOnTop={this.turnOffShowOnTop.bind(this)} show={true}/>)
            });
            return;
        }
        // add to local item
        var cartItems = this.props.cartItems;
        cartItems = cartItems || {};
        var product = this.props.product;

        // merge item to local store
        cartItems[product.id] = {
            product: product,
            items: this.carts
        };
        this.props.updateCartItems(cartItems);
        this.context.router.push("/checkout/cart");
    }
    increaseSize(size, quantity) {
        var sizeInCart = _.find(this.carts, (cart) => {
            return cart.id === size.id;
        });

        if (quantity > size.quantity_temp) {
            this.setState({
                onPopUp: (<PopUpWarn contentText="Số Lượng Hàng Trong Kho Không Đủ!" turnOffShowOnTop={this.turnOffShowOnTop.bind(this)} show={true}/>)
            });
            return false;
        }

        if (sizeInCart) {
            if (quantity) {
                sizeInCart.quantity = quantity;
            } else {
                _.remove(this.carts, cart => {
                    return cart.id === size.id;
                });
            }
        } else {
            this.carts.push({
                id: size.id,
                name: size.name,
                quantity: quantity
            });
        }
        return true;
    }
    render() {
        var product = this.props.product;
        return (
            <div className="col-md-6 col-sm-12">
                {this.state.onPopUp}
                <RightTop increaseSize={this.increaseSize.bind(this)}
                    product={product}/>
                <RightBottom 
                    addToCart={this.addToCart.bind(this)}
                    product={product}/>
            </div>
        );
    }
};

RightInfo.contextTypes = {
    router: () => {
        return React.PropTypes.object
    }
};