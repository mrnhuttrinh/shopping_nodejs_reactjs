import React, {Component} from 'react';
import _ from 'lodash';
import Title from './Title';
import ListThree from './ListThree';
import productAPIs from '../../apis/product';
import Pagination from '../Pagination';
import FlatLoading from '../FlatLoading';

const NUMBER_PRODUCT = 15;

export default class CategoryContents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalProduct: 0,
            listProduct: [],
            loading: true
        };
    }
    getTotalProduct(props) {
        var currentHash = props.params.category_link;
        productAPIs.getTotalProduct({
            category: currentHash
        }, (err, res) => {
            if (err) {} else {
                this.setState({
                    totalProduct: res.body.data
                });
            }
        });
    }
    getProducts(props) {
        var type = props.params.category_link;
        var page = props.params.page || 1;
        var control = props.params.sort || "hottest";

        this.setState({
            loading: true
        });
        productAPIs.getListProduct({
            type: type,
            quantity: NUMBER_PRODUCT,
            page: page,
            control: control
        }, (err, res) => {
            if (err) {} else {
                this.setState({
                    listProduct: res.body.data
                });
            }
            this.setState({
                loading: false
            });
        });
    }
    componentDidMount() {
        this.getTotalProduct(this.props);
        this.getProducts(this.props);
    }
    componentWillReceiveProps(nextProps) {
        var props = this.props;
        var currentHash = props.params.category_link;
        var nextHash = nextProps.params.category_link;

        var currentSort = props.params.sort;
        var nextSort = nextProps.params.sort;

        var currentPage = props.params.page;
        var nextPage = nextProps.params.page;

        if (currentHash !== nextHash
            || currentSort !== nextSort
            || currentPage !== nextPage) {
            if (currentHash !== nextHash) {
                this.getTotalProduct(nextProps);
            }
            this.getProducts(nextProps);
        }
    }
    render() {
        var props = this.props;
        var currentHash = props.params.category_link;
        var currentMenu = _.find(props.menus, (menu) => {
            return menu.link === currentHash;
        });
        var sort = props.params.sort || "hottest";
        var page = props.params.page || 1;
        return (
            <div>
                <div className="index_middle">
                    <div className="container1" id="cateContainer">
                        <Title {...this.props} currentMenu={currentMenu} total={this.state.totalProduct}/>
                        {
                            this.state.loading ? (
                                <FlatLoading />
                            ) : (
                                <ListThree listProduct={this.state.listProduct} {...this.props} currentMenu={currentMenu}/>
                            )
                        }
                        <Pagination 
                            page={page}
                            href={"/" + currentHash + "/" + sort}
                            totalRow={this.state.totalProduct} 
                            rows={NUMBER_PRODUCT} />
                    </div>
                </div>
            </div>
        );
    }
}

