import React, {Component} from 'react';
import CartList from './cartlist';

export default class Cart extends Component {
    render() {
        // return (
        //     <div className="hover_menu">
        //         <p className="hover_TT">Giỏ hàng của bạn</p>
        //         <p className="no_item">
        //             Hiện chưa có sản phẩm nào
        //             <br />
        //             trong giỏ hàng của bạn
        //         </p>
        //     </div>
        // );
        return (
            <div className="hover_menu">
                <CartList />
            </div>
        );
    }
}
