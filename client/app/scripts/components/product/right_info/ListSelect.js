import React, {Component} from 'react';
import _ from 'lodash';
import Size from './Size';

export default class ListSelect extends Component {
    removeShowMore(event) {
        event.preventDefault();
        $(".view_full").remove();
        $(".detail_listcart").css("height", "");
    }
    render() {
        var sizes = this.props.product.sizes;
        var listSizes = _.map(sizes, (size, index) => {
            var className = "";
            if (index === 0) className = "first";
            return (<Size increaseSize={this.props.increaseSize} key={"size_" + index} classCss={className} size={size} product={this.props.product}/>)
        });
        var viewFull = null;
        var style = {};
        if (listSizes.length > 2) {
            viewFull = (
                <a className="view_full" onClick={this.removeShowMore.bind(this)} title="Xem thêm lựa chọn khác">
                    <span className="open">
                    </span>
                </a>
            );
            style.height = "185px";
        }

        return (
            <div className="bg_detail" id="SkuList">
                <div style={style} className="detail_listcart">
                    <form autoComplete="off">
                        <table cellPadding="0" cellSpacing="0" className="shopping_cart_detail" id="tblListSkus">
                            <tbody>
                                {listSizes}
                            </tbody>
                        </table>
                    </form>
                </div>
                {viewFull}
            </div>
        );
    }
}
