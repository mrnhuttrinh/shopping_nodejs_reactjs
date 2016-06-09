import React, {Component} from 'react'
import _ from 'lodash';
import DivLoading from '../FlatLoading';
import productAPIs from '../../apis/product';
import Item from './Item';

export default class ListThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProduct: [],
            loading: true,
            offsetHeight: 0
        };
    }
    getListProduct(props) {
        var currentHash = props.params.category_link;
        productAPIs.getListProduct({
            type: currentHash,
            quantity: 15,
            page: 1,
            control: "hottest"
        }, (err, res) => {
            if (err) {} else {
                this.setState({
                    listProduct: res.body.data
                });
            }
        });
    }
    componentDidMount() {
        console.log("threelistdidmount")
    }
    componentWillReceiveProps(nextProps) {
        console.log("threelistwillreceive")
    }
    render() {
        return (
            <ul className="listdeal_three" id="cate_list">
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
            </ul>
        );
    }
}

