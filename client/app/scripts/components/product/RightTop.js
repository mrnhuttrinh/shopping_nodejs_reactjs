import React, {Component} from 'react';
import formatCurrency from '../../utils/formatcurrency';

export default class RightTop extends Component {
    render() {
        var product = this.props.product;
        var percentSale = 0;
        if (product.price_wholesale !== product.price_wholesale_promotion) {
            percentSale = 100 - Math.ceil((product.price_wholesale_promotion/product.price_wholesale)*100);
        }
        return (
            <div className="detail_co">
                <h1 className="deal_detail_name">
                    {product.name}
                </h1>
                <p className="market_note">Sản phẩm giao bởi Áo Thun Phong Cách</p>
                <h2 className="deal_detail_name_long">
                    {product.description}
                </h2>
                <div className="detail_bar">
                    <p className="bg_price">
                        <span className="detail_trueprice" id="detail_trueprice">
                            {formatCurrency(product.price_wholesale)}đ
                        </span>
                        <br/>
                        <span className="detail_price" id="price">
                            {formatCurrency(product.price_wholesale_promotion)}đ
                        </span>
                    </p>
                    <p className="detail_precent">
                        {percentSale}
                        <span>
                            %
                        </span>
                    </p>
                    <div className="likeface">
                        Mã SP: {product.code}
                        <br/>
                        <div className="fb-like header_R new_TT fb_iframe_widget" data-action="like" data-href="http://www.cungmua.com/thoi-trang-nu/dam-vay/dam-suong/dam-suong-phoi-mau-xu-huong-thoi-trang-moi_p71320.html?cmpid=71320&cmps=home_page&cmpm=list_t3&cmpc=2" data-layout="button_count" data-share="true" data-show-faces="false" fb-iframe-plugin-query="action=like&app_id=137523489610094&container_width=0&href=http%3A%2F%2Fwww.cungmua.com%2Fthoi-trang-nu%2Fdam-vay%2Fdam-suong%2Fdam-suong-phoi-mau-xu-huong-thoi-trang-moi_p71320.html%3Fcmpid%3D71320%26cmps%3Dhome_page%26cmpm%3Dlist_t3%26cmpc%3D2&layout=button_count&locale=en_US&sdk=joey&share=true&show_faces=false" fb-xfbml-state="rendered">
                            <span style={{
                                    "verticalAlign": "bottom",
                                    "width": "124px",
                                    "height": "20px"
                                }}>
                                <iframe 
                                    allowfullscreen="true" 
                                    allowtransparency="true" 
                                    className="" 
                                    frameborder="0" 
                                    height="20px" 
                                    name="f35d1093d86f0d" 
                                    scrolling="no" 
                                    src="https://www.facebook.com/plugins/like.php?action=like&app_id=137523489610094&channel=http%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D42%23cb%3Df38deb318a044d8%26domain%3Dwww.cungmua.com%26origin%3Dhttp%253A%252F%252Fwww.cungmua.com%252Ff228071b453c14%26relation%3Dparent.parent&container_width=0&href=http%3A%2F%2Fwww.cungmua.com%2Fthoi-trang-nu%2Fdam-vay%2Fdam-suong%2Fdam-suong-phoi-mau-xu-huong-thoi-trang-moi_p71320.html%3Fcmpid%3D71320%26cmps%3Dhome_page%26cmpm%3Dlist_t3%26cmpc%3D2&layout=button_count&locale=en_US&sdk=joey&share=true&show_faces=false" 
                                    title="fb:like Facebook Social Plugin" 
                                    width="124px">
                                </iframe>
                            </span>
                        </div>
                    </div>
                    <br className="clean"/>
                </div>
                <span className="text_note">
                    Chọn số lượng
                </span>
                <div className="bg_detail" id="SkuList">
                    <div className="detail_listcart">
                        <form autocomplete="off">
                            <table border="0" cellpadding="0" cellspacing="0" class="shopping_cart_detail" id="tblListSkus">
                                <tbody>
                                    <tr className="first">
                                        <td className="left_col" data-abc="" width="78">
                                            <a href="javascript:;" onclick="productdetail.changeSkuImages(159321);">
                                                <img alt="" height="45" src="http://resources.cungmua.com/SKU/Small/159321.jpg" width="45">
                                                </img>
                                            </a>
                                        </td>
                                        <td className="name_book" width="221">
                                            <a href="javascript:;" is-cmoprice="" onclick="productdetail.changeSkuImages(159321);" price="">
                                                Đầm Suông MixCorlor xu hướng - Nude
                                            </a>
                                        </td>
                                        <td className="bg_price" width="126">
                                            <span className="book_true_price">
                                                310.000đ
                                            </span>
                                            <br/>
                                            <span className="book_price">
                                                159.000đ
                                            </span>
                                        </td>
                                        <td className="bg_price" width="75">
                                            <select className="select_number" data-id="159321" data-price="159000" data-saveprice="3180" id="159321" name="select">
                                                <option value="0">
                                                    0
                                                </option>
                                                <option selected="selected" value="1">
                                                    1
                                                </option>
                                                <option value="2">
                                                    2
                                                </option>
                                                <option value="3">
                                                    3
                                                </option>
                                                <option value="4">
                                                    4
                                                </option>
                                                <option value="5">
                                                    5
                                                </option>
                                                <option value="6">
                                                    6
                                                </option>
                                                <option value="7">
                                                    7
                                                </option>
                                                <option value="8">
                                                    8
                                                </option>
                                                <option value="9">
                                                    9
                                                </option>
                                                <option value="10">
                                                    10
                                                </option>
                                                <option value="11">
                                                    11
                                                </option>
                                                <option value="12">
                                                    12
                                                </option>
                                                <option value="13">
                                                    13
                                                </option>
                                                <option value="14">
                                                    14
                                                </option>
                                                <option value="15">
                                                    15
                                                </option>
                                                <option value="16">
                                                    16
                                                </option>
                                                <option value="17">
                                                    17
                                                </option>
                                                <option value="18">
                                                    18
                                                </option>
                                                <option value="19">
                                                    19
                                                </option>
                                                <option value="20">
                                                    20
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                    <a className="view_full" onclick="productdetail.viewMoreSKU()" title="Xem thêm lựa chọn khác">
                        <span className="open">
                        </span>
                    </a>
                </div>
            </div>
        );
    }
};