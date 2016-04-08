import React, {Component} from 'react'

export default class Detail extends Component{

    changeBigImage(self, n) {
        var t = $(n.currentTarget), i;
        $(".deal_img_list").children(".small-img").each(function() {
            $(this).removeClass("active")
        });
        t.addClass("active");
        i = t.attr("data-view");
        $(".deal_img_big").children("img").fadeOut(300, function() {
            $(".deal_img_big").children("img").attr("src", i)
        }).fadeIn(300)
    }

    render() {
        return (
            <div id="main" role="main">
                <div id="ribbon">
                    <span className="ribbon-button-alignment"> 
                        <span id="refresh" className="btn btn-ribbon" data-action="resetWidgets" data-title="refresh"  rel="tooltip" data-placement="bottom" data-original-title="<i className='text-warning fa fa-warning'></i> Warning! This will reset all your widget settings." data-html="true">
                            <i className="fa fa-refresh"></i>
                        </span> 
                    </span>
                    <ol className="breadcrumb">
                        <li>Home</li><li>Inbox</li>
                    </ol>
                </div>
                <div id="content">
                    <div className="container">
                        <br className="clean" />
                        <div className="row">
                            <div className="col-md-6 col-sm-12" id="SkuImages">
                                <div className="deal_detail_img">
                                    <div className="bg_big">
                                        <div className="deal_img_big">
                                            <img alt="Bộ 5 hộp đựng gia vị trong suốt thông minh UBL KS0520" src="http://resources2.cungmua.com/SKU/103000/FullScreen/0635955328284007326.jpg" width="490" height="490" style={{"width": "490px", "min-height": "490px" }}/>
                                        </div>
                                        <p className="detail_clock" >
                                            <span className="ic_cm icon-clock" style={{"margin":"0"}}>g</span>
                                            <span id="countdown">09:20:40</span>
                                        </p>
                                    </div>
                                    <div className="bg_img_list">
                                        <div className="bx-wrapper" style={{"max-width": "300px", "margin": "0px auto"}}>
                                            <div className="bx-viewport" style={{"width": "100%", "overflow": "hidden", "position": "relative", "height": "60px"}}>
                                                <div className="deal_img_list" style={{"visibility": "visible", "width": "615%"," position":" relative","transition-duration": "0s","transform": "translate3d(0px, 0px, 0px)"}}>
                                                    <a className="small-img active" href="javascript:;" onClick={this.changeBigImage.bind(null, this)} data-view="http://resources2.cungmua.com/SKU/103000/FullScreen/0635955328284007326.jpg" style={{"float": "left","list-style": "none","position": "relative","width": "75px"}}>
                                                        <img width="64" src="http://resources2.cungmua.com/SKU/103000/Small/0635955328284007326.jpg"/>
                                                    </a>
                                                    <a className="small-img" href="javascript:;" onClick={this.changeBigImage.bind(null, this)} data-view="http://resources2.cungmua.com/SKU/103000/FullScreen/1635955328285099328.jpg" style={{"float": "left","list-style": "none","position": "relative","width": "75px"}}>
                                                        <img width="64" src="http://resources2.cungmua.com/SKU/103000/Small/1635955328285099328.jpg"/>
                                                    </a>
                                                    <a className="small-img" href="javascript:;" onClick={this.changeBigImage.bind(null, this)} data-view="http://resources2.cungmua.com/SKU/103000/FullScreen/2635955328286191330.jpg" style={{"float": "left","list-style": "none","position": "relative","width": "75px"}}>
                                                        <img width="64" src="http://resources2.cungmua.com/SKU/103000/Small/2635955328286191330.jpg"/>
                                                    </a>
                                                    <a className="small-img" href="javascript:;" onClick={this.changeBigImage.bind(null, this)} data-view="http://resources2.cungmua.com/SKU/103000/FullScreen/3635955328287439332.jpg" style={{"float": "left","list-style": "none","position": "relative","width": "75px"}}>
                                                        <img width="64" src="http://resources2.cungmua.com/SKU/103000/Small/3635955328287439332.jpg"/>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="bx-controls"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-sm-12">
                                <div className="detail_co">
                                    <h1 className="deal_detail_name">Bộ 5 hộp đựng gia vị trong suốt thông minh UBL KS0520</h1>
                                    <h2 className="deal_detail_name_long">Với kiểu dáng mới lạ, thiết kế tiện dụng, gian bếp gia đình bạn sẽ gọn gàng và xinh xắn hơn với kệ đựng gia vị 5 hộp trong suốt thông minh UBL KS0520.</h2>
                                    <div className="detail_bar">
                                        <p className="bg_price">
                                            <span id="detail_trueprice" className="detail_trueprice">140.000đ</span><br/>
                                            <span id="price" className="detail_price">79.000đ</span>
                                        </p>
                                        <p className="detail_precent">44<span>%</span></p>

                                        <div className="likeface">
                                            Mã SP: 103138
                                            <br/>
                                            <div className="fb-like header_R new_TT fb_iframe_widget" data-href="http://www.cungmua.com/nha-cua-gia-dung/nha-cua-doi-song/tien-ich-sap-xep-do/bo-5-hop-dung-gia-vi-trong-suot-thong-minh-ubl-ks0520_p103138.html" data-layout="button_count" data-action="like" data-show-faces="false" data-share="true" fb-xfbml-state="rendered" fb-iframe-plugin-query="action=like&amp;app_id=137523489610094&amp;container_width=0&amp;href=http%3A%2F%2Fwww.cungmua.com%2Fnha-cua-gia-dung%2Fnha-cua-doi-song%2Ftien-ich-sap-xep-do%2Fbo-5-hop-dung-gia-vi-trong-suot-thong-minh-ubl-ks0520_p103138.html&amp;layout=button_count&amp;locale=en_US&amp;sdk=joey&amp;share=true&amp;show_faces=false"><span style={{"vertical-align": "bottom","width": "127px","height": "20p;"}}><iframe name="f67c60fb380d" width="1000px" height="1000px" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" title="fb:like Facebook Social Plugin" src="http://www.facebook.com/plugins/like.php?action=like&amp;app_id=137523489610094&amp;channel=http%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D42%23cb%3Df1244d6ebca18e4%26domain%3Dwww.cungmua.com%26origin%3Dhttp%253A%252F%252Fwww.cungmua.com%252Ff27246ad4076478%26relation%3Dparent.parent&amp;container_width=0&amp;href=http%3A%2F%2Fwww.cungmua.com%2Fnha-cua-gia-dung%2Fnha-cua-doi-song%2Ftien-ich-sap-xep-do%2Fbo-5-hop-dung-gia-vi-trong-suot-thong-minh-ubl-ks0520_p103138.html&amp;layout=button_count&amp;locale=en_US&amp;sdk=joey&amp;share=true&amp;show_faces=false" style={{"border": "none","visibility": "visible","width": "127px","height": "20px"}} className=""></iframe></span></div>
                                        </div>
                                        <br className="clean"/>
                                    </div>
                                    <span className="text_note">Chọn số lượng</span>
                                    <div className="bg_detail" id="SkuList">
                                        <div style={{"height": "184px"}} className="detail_listcart">
                                            <form autocomplete="off">
                                                <table cellspacing="0" cellpadding="0" border="0" className="shopping_cart_detail" id="tblListSkus">
                                                    <tbody>
                                                        <tr className="first">
                                                            <td width="78" className="left_col" data-abc="">
                                                                <a href="javascript:;" onclick="productdetail.changeSkuImages(209606);">
                                                                    <img width="45" height="45" alt="" src="http://resources2.cungmua.com/SKU/103000/Small/209606.jpg" />
                                                                </a>
                                                            </td>
                                                            <td width="221" className="name_book">
                                                                <a href="javascript:;" is-cmoprice="" price="" onclick="productdetail.changeSkuImages(209606);">Bộ 5 hộp đựng gia vị trong suốt thông minh UBL KS0520</a>
                                                            </td>
                                                            <td width="126" className="bg_price">

                                                                    <span className="book_true_price">140.000đ</span><br/>
                                                                <span className="book_price">79.000đ</span>
                                                            </td>
                                                            <td width="75" className="bg_price">
                                                                <select id="209606" className="select_number" data-saveprice="1580" name="select" data-price="79000" data-id="209606">
                                                                    <option value="0">0</option>
                                                                    <option selected="selected" value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3">3</option>
                                                                    <option value="4">4</option>
                                                                    <option value="5">5</option>
                                                                    <option value="6">6</option>
                                                                    <option value="7">7</option>
                                                                    <option value="8">8</option>
                                                                    <option value="9">9</option>
                                                                    <option value="10">10</option>
                                                                    <option value="11">11</option>
                                                                    <option value="12">12</option>
                                                                    <option value="13">13</option>
                                                                    <option value="14">14</option>
                                                                    <option value="15">15</option>
                                                                    <option value="16">16</option>
                                                                    <option value="17">17</option>
                                                                    <option value="18">18</option>
                                                                    <option value="19">19</option>
                                                                    <option value="20">20</option>
                                                                    <option value="21">21</option>
                                                                    <option value="22">22</option>
                                                                    <option value="23">23</option>
                                                                    <option value="24">24</option>
                                                                    <option value="25">25</option>
                                                                    <option value="26">26</option>
                                                                    <option value="27">27</option>
                                                                    <option value="28">28</option>
                                                                </select>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </form>
                                        </div>
                                        <a className="view_full" onclick="productdetail.viewMoreSKU()" title="Xem thêm lựa chọn khác" style={{"display": "none"}}><span className="open"></span></a>
                                    </div>
                                </div>

                                <div className="panel_info">
                                    <div className="panel3 R">
                                        <button type="button" className="btn_primary" data-id="1" onclick="productdetail.addToCart(this);">MUA NGAY<span className="arrow_W_big"></span></button>
                                        <div id="wrapperSaveMoney" style={{"display": "none"}}></div>

                                        <p className="txt_cmart" id="containerSaveMoney" style={{"display": "none"}}>
                                            Bạn tích lũy được <strong id="saveMoneyForPremium">0đ</strong> khi mua sản phẩm này.
                                        </p>

                                        <p className="txt_cmart" id="containerDisplaySaveMoney">
                                            Bạn sẽ được tích lũy<strong> 2%</strong> khi là hội viên Premium
                                        </p>

                                    </div>

                                    <p className="panel2 R">
                                            <span className="pane2_icon_delivery"></span>

                                        <span className="panel_text">Giao sản phẩm</span>
                                        <br/>
                                        <span className="panel_text1">chỉ giao ở TP lớn</span>
                                    </p>

                                    <p className="panel1 R">
                                        <span className="pane2_icon_group"></span>
                                        <span className="panel_text3">
                                            Số lượng<br/>
                                            có hạn
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
