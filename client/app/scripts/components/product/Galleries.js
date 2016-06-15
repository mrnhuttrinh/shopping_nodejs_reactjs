import React, {Component} from 'react';

export default class Galleries extends Component {
    render() {
        return (
            <div className="col-md-6 col-sm-12" id="SkuImages">
                <div className="deal_detail_img">
                    <div className="bg_big">
                        <div className="deal_img_big">
                            <img alt="Đầm suông phối màu - Xu hướng thời trang mới" height="490" src="http://resources.cungmua.com/SKU/FullScreen/3635742099216351357.jpg" />
                        </div>
                        <p className="detail_clock">
                            <span className="ic_cm icon-clock">
                                g
                            </span>
                            <span id="countdown">
                                24:00:00
                            </span>
                        </p>
                    </div>
                    <div className="bg_img_list">
                        <div className="bx-wrapper">
                            <div className="bx-viewport">
                                <div className="deal_img_list" >
                                    <a className="small-img active" data-view="http://resources.cungmua.com/SKU/FullScreen/0635742099622420070.jpg" href="javascript:;" onclick="productdetail.changeBigImage(this);">
                                        <img src="http://resources.cungmua.com/SKU/Small/0635742099622420070.jpg" width="64"/>
                                    </a>
                                    <a className="small-img" data-view="http://resources.cungmua.com/SKU/FullScreen/0635742099138039220.jpg" href="javascript:;" onclick="productdetail.changeBigImage(this);" >
                                        <img src="http://resources.cungmua.com/SKU/Small/0635742099138039220.jpg" width="64"/>
                                    </a>
                                    <a className="small-img" data-view="http://resources.cungmua.com/SKU/FullScreen/2635742099191235313.jpg" href="javascript:;" onclick="productdetail.changeBigImage(this);" >
                                        <img src="http://resources.cungmua.com/SKU/Small/2635742099191235313.jpg" width="64"/>
                                    </a>
                                    <a className="small-img" data-view="http://resources.cungmua.com/SKU/FullScreen/3635742099216351357.jpg" href="javascript:;" onclick="productdetail.changeBigImage(this);" >
                                        <img src="http://resources.cungmua.com/SKU/Small/3635742099216351357.jpg" width="64"/>
                                    </a>
                                </div>
                            </div>
                            <div className="bx-controls">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};