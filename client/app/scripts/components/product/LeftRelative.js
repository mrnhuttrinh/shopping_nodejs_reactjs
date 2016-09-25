import React, {Component} from 'react';
import productAPI from '../../apis/product';
import {Link} from 'react-router';
import _ from 'lodash';
import formatCurrency from '../../utils/formatcurrency';
import Item from '../ItemProduct';

export default class LeftRelative extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProducts: []
        };
    }
    componentDidMount() {
        var productName = this.props.productName;
        var data = {
            product_name: productName
        };
        productAPI.getProductsRelateWithProduct(data, (err, res) => {
            if (err) {

            } else {
                this.setState({
                    listProducts: res.body.data
                });
            }
        });
    }
    renderListProduct() {
        return _.map(this.state.listProducts, product => {
            return (<Item key={"product_name_" + product.text_link} product={product} />)
        });
    }
    render() {
        return (
            <div className="col-md-3 col-sm-12 col_right">
                <div id="divRelatedProducts">
                    <h4 className="title_right">
                        Khuyến mãi liên quan
                    </h4>
                    <ul className="listdeal_right">
                        {this.renderListProduct()}
                    </ul>
                </div>
            </div>
        );
    }
}
