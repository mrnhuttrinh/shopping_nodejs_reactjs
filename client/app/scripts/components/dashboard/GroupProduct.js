import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import apis from '../../apis/product';
import ListFour from './ListFour';
import DivLoading from '../FlatLoading';
import TitleHome from './TitleHome';
import HightLightDeal from './HightLightDeal';
import _ from 'lodash';
import FlatLoading from '../FlatLoading';

export default class GroupProduct extends Component {
    next: 1;
    prev: 1;
    listProducts: [];
    control: null;

    constructor(props) {
        super(props);
        this.state = {
            listProduct: [],
            loading: true,
            offsetHeight: 0
        }
        this.next = 1;
        this.prev = 1;
        this.listProducts = [];
        this.control = null;
    }
    getProducts(page, control) {
        var self = this;
        var props = this.props;
        var type = props.menu.link;
        self.setState({
            loading: true,
            offsetHeight: self.state.offsetHeight
        });
        apis.getListProduct({
            type: type,
            quantity: 8,
            page: page,
            control: control
        }, (err, res) => {
            if (err) {} else {
                self.listProducts = self.listProducts.concat(res.body.data);
                self.setState({
                    listProduct: res.body.data
                });
            }
            self.setState({
                loading: !self.state.loading
            });
        });
    }
    getProductInList(page) {
        this.setState({
            loading: true,
            offsetHeight: this.state.offsetHeight
        });
        var listProductsLength = this.listProducts.length;
        var totalLength = page * this.next;
        if (totalLength < listProductsLength) {
            var listProduct = this.listProducts.slice(totalLength, totalLength + 8);
            this.setState({
                listProduct: listProduct
            });
            this.setState({
                loading: false
            });
            return;
        }
    }
    componentDidMount() {
        this.getProducts(1);
    }
    clickControlButton(control) {
        var page = 1;
        var ulListFour = ReactDOM.findDOMNode(this.refs["ulListFour"]);
        this.state.offsetHeight = ulListFour.offsetHeight;
        if (control === "next") {
            this.next++;
            this.prev--;
            page = this.next;
            this.control = {
                next: this.next,
                prev: this.prev
            };
            var listProductsLength = this.listProducts.length;
            var totalLength = page * 8;
            if (totalLength < listProductsLength) {
                this.getProductInList(this.next);
            }
        } else {
            this.next--;
            this.prev++;
            page = this.prev;
            this.control = {
                next: this.next,
                prev: this.prev
            };
            if (page < 1) {
                this.getProductInList(this.next);
            }
        }
        this.getProducts(page, control);
    }
    render() {
        var props = this.props;
        var index = props.index;
        var listFour;
        if (this.state.loading) {
            var style = {
                height: this.state.offsetHeight
            };
            listFour = (
                <div style={style} className="flat_loading_wrapper">
                    <div className="flat_loading_inner">
                        <FlatLoading />
                    </div>
                </div>
            );
        } else {
            listFour = <ListFour ref="ulListFour" control={this.control} clickControlButton={this.clickControlButton.bind(this)} products={this.state.listProduct} menu={this.props.menu} />;
        }
        return (
            <div className="index_middle" data-floor={"T" + index}>
                <div className="container1" data-cat-id="105">
                    <TitleHome index={index} menu={this.props.menu} menus={this.props.menus} />
                    <HightLightDeal menu={this.props.menu} />
                    {listFour}
                </div>
            </div>
        );
    }
}
