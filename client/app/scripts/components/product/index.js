import React, {Component} from 'react';
import BreadCrumb2 from './BreadCrumb2';
import Galleries from './Galleries';
import RightInfo from './right_info';
import FlatLoading from '../FlatLoading';
import LongDescription from './long_description';
import Promotion from './promotion';
import productAPIs from '../../apis/product';

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            loading: true
        }
    }
    getProduct() {
        var self = this;
        var text_link = self.props.params.product_name;
        self.setState({
            loading: true
        });
        productAPIs.getProductByTextLink({
            text_link: text_link
        }, (err, res) => {
            if (err) {} else {
                self.setState({
                    product: res.body.data
                });
            }
            self.setState({
                loading: false
            });
        });
    }
    componentDidMount() {
        $(function() {
            $("body, html").scrollTop(0);
        });
        this.getProduct();
    }
    render() {
        if (this.state.loading) {
            return (
                <div className="index_middle">
                    <FlatLoading />
                </div>
            );
        } else {
            if (this.state.product) {
                return (
                    <div>
                        <div className="index_middle">
                            <BreadCrumb2 {...this.props} product={this.state.product} />
                            <div className="container">
                                <br className="clean" />
                                <div className="row">
                                    <Galleries product={this.state.product} />
                                    <RightInfo {...this.props} product={this.state.product} />
                                </div>
                            </div>
                        </div>
                        <LongDescription product={this.state.product} />
                        <Promotion product={this.state.product} />
                    </div>
                );
            } else {
                return (
                    <div className="index_middle">
                        <div className="container">
                            Sản Phẩm Không Tồn Tại
                        </div>
                    </div>
                );
            }
        }
    }
};