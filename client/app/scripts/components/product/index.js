import React, {Component} from 'react';
import BreadCrumb2 from './BreadCrumb2';
import Galleries from './Galleries';
import RightInfo from './right_info';
import FlatLoading from '../FlatLoading';
import LongDescription from './long_description';
import Promotion from './promotion';
import productAPIs from '../../apis/product';
import LeftRelative from './LeftRelative';
import FbComment from '../FbComment';

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
                document.title = res.body.data.name;
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
                        <div className="index_middle">
                            <div className="container content_detail">
                                <div className="row">
                                    <div className="col-md-9 col-sm-12">
                                        <div>
                                            <ul className="nav nav-tabs" role="tablist">
                                                <li role="presentation" className="active">
                                                    <a href="#long_description" aria-controls="long_description" role="tab" data-toggle="tab">Mô Tả Sản Phẩm</a></li>
                                                <li role="presentation">
                                                    <a href="#promotion" aria-controls="promotion" role="tab" data-toggle="tab">Thông Tin Chi Tiết</a></li>
                                                <li role="presentation">
                                                    <a href="#facebook_comments" aria-controls="facebook_comments" role="tab" data-toggle="tab">Bình Luận</a>
                                                </li>
                                            </ul>
                                            <div className="tab-content">
                                                <div role="tabpanel" className="tab-pane active" id="long_description">
                                                    <LongDescription product={this.state.product} />
                                                </div>
                                                <div role="tabpanel" className="tab-pane" id="promotion">
                                                    <Promotion product={this.state.product} />
                                                </div>
                                                <div role="tabpanel" className="tab-pane" id="facebook_comments">
                                                    <div className="fb-comments" data-href="http://localhost:8000/" data-numposts="5"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <LeftRelative />
                                </div>
                            </div>
                        </div>
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