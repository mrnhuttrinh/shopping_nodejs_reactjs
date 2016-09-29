import React, {Component} from 'react';
import _ from 'lodash';

export default class Galleries extends Component {
    changeBigImage(event) {
        event.preventDefault();
    }
    componentDidMount() {
        var product = this.props.product;
        var galleries = product.galleries;
        if (galleries && galleries.length) {
            $(function() {
                $('.galleriesSlider').bxSlider({
                    pagerCustom: '#bx-pager-gallries',
                    controls: false
                });
                $('#bx-pager-gallries').bxSlider({
                    slideWidth: 100,
                    minSlides: 6,
                    maxSlides: 6,
                    moveSlides: 1,
                    pager: false,
                    adaptiveHeight: true
                });
            });
        }
    }
    render() {
        var product = this.props.product;
        var galleries = product.galleries;
        var firstImage = " active";
        var listThumbnail = _.map(galleries, (_gal, index) => {
            if (index > 0) firstImage = "";
            return (
                <div key={"small-imge" + index} className="slide"> 
                    <a data-slide-index={index} className={"small-img" + firstImage}>
                        <img src={window.pathAdmin + _gal.image}/>
                    </a>
                </div>
            )
        });
        var listBigImage = _.map(galleries, (_gal, index) => {
            return (
                <li key={"big_image_" + index}>
                    <img alt={product.name} height="490" src={window.pathAdmin + _gal.image} />
                </li>
            );
        });
        return (
            <div className="col-md-6 col-sm-12" id="SkuImages">
                <div className="">
                    <div className="bg_big">
                        <ul className="deal_img_big galleriesSlider">
                            {listBigImage}
                        </ul>
                    </div>
                    <div className="bg_img_list">
                        <div id="bx-pager-gallries" className="deal_img_list" >
                            {listThumbnail}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};