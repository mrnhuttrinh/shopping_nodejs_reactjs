import React, {Component} from 'react';
import Item from '../ItemProduct';
import _ from 'lodash';
import productAPIs from '../../apis/product';

export default class ProductRecommend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProducts: []
        };
    }
    componentDidMount() {
        productAPIs.getRecommendProducts((err, res) => {
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
            <div className="container1">
                <div className="product_promotion">
                    <div className="title_page_new home_panel">
                        <h4 className="like_text">
                            Sản phẩm với giá ưu đãi
                        </h4>
                    </div>
                    <div className="product_cate_home">
                        <ul className="listdeal_four" id="slideProductKMBanKem">
                            {this.renderListProduct()}
                        </ul>
                        <br className="clean" />
                    </div>
                </div>
            </div>
        );
    }
}
