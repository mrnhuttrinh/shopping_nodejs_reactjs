import React, {Component} from 'react'
import _ from 'lodash';
import DivLoading from '../FlatLoading';
import productAPIs from '../../apis/product';
import Item from './Item';

export default class ListThree extends Component {
    render() {
        var props = this.props;
        var listItem = _.map(props.listProduct, (product, index) => {
            return (<Item key={"product_" + index}  product={product}/>);
        });
        return (
            <ul className="listdeal_three" id="cate_list">
                {listItem}
            </ul>
        );
    }
}

