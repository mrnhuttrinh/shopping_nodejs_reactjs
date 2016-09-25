import React from 'react'

export default class Mid extends React.Component {
    render() {
        return (
            <footer className="index_footer">
                <div className="container1">
                    <div className="col-md-6 col-sm-12">
                        <div className="col-md-6 col-sm-6 mB">
                            <h4 className="footer_title">GIỚI THIỆU</h4>
                            <ul className="footer_item">
                                <li><a rel="nofollow" href="/ve-cung-mua">Về aothun Mua</a></li>
                                <li><a rel="nofollow" href="/hop-tac-voi-cung-mua">Hợp tác với aothun Mua</a></li>
                                <li><a rel="nofollow" href="/co-hoi-nghe-nghiep">Cơ hội nghề nghiệp</a></li>
                                <li><a rel="nofollow" href="/quy-che-san-giao-dich">Quy chế sàn giao dịch</a></li>
                                <li><a rel="nofollow" href="/cac-khuyen-mai-da-ban.html">Các khuyến mãi đã bán</a></li>
                                <li><a href="http://blog.cungmua.com/">Blog aothun Mua</a></li>
                                <li><a rel="nofollow" href="/thuong-hieu">Thương hiệu nổi tiếng</a></li>
                            </ul>
                        </div>
                        <div className="col-md-6 col-sm-6 mB">
                            <h4 className="footer_title">THÔNG TIN HỮU ÍCH</h4>
                            <ul className="footer_item">
                                <li><a rel="nofollow" href="/tai-khoan-va-don-hang">Những câu hỏi thường gặp</a></li>
                                <li><a rel="nofollow" href="/hinh-thuc-thanh-toan">Hình thức thanh toán</a></li>
                                <li><a rel="nofollow" href="/huong-dan-dat-hang">Hướng dẫn đặt hàng</a></li>
                                <li><a rel="nofollow" href="/su-dung-voucher">Sử dụng voucher/e-voucher</a></li>
                                <li><a rel="nofollow" href="/phuong-thuc-van-chuyen">Phương thức vận chuyển</a></li>
                                <li><a rel="nofollow" href="/chinh-sach-doi-tra">Chính sách đổi trả</a></li>
                                <li><a rel="nofollow" href="/huong-dan-su-dung-the-premium">Hướng dẫn sử dụng thẻ Premium</a></li>
                                <li><a rel="nofollow" href="/dat-hang-tai-cungmua">Đặt hàng tại aothun Mua</a></li>
                            </ul>
                        </div>
                        <br className="clean"/>
                        <div className="col-md-12 footer_surport">
                            <h4 className="footer_title">HỖ TRỢ THANH TOÁN</h4>
                            <ul className="pay_home">
                                <li><span className="ic_cm icon-pay">B</span><span className="text">Tiền mặt</span></li>
                                <li><span className="ic_cm icon-pay">l</span><span className="text">Thẻ ATM</span></li>
                                <li><span className="ic_cm icon-visa"></span><span className="text">Visa</span></li>
                                <li><span className="ic_cm icon-master"></span><span className="text">Master</span></li>
                            </ul>
                            <h4 className="footer_title">TẢI ỨNG DỤNG aothun MUA</h4>
                            <p className="btn_android_ios"> <a className="btn_ios" target="_blank" href="http://itunes.apple.com/lb/app/truecaller-caller-id-number/id833357298?mt=8"></a> <a class="btn_android" target="_blank" href="https://play.google.com/store/apps/details?id=com.cungmua.app&amp;hl=en"></a> </p>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="col-md-6 col-sm-6">
                            <h4 className="footer_title">HOTLINE </h4>
                            <p><span className="icon-phone ic_cm">D</span>1900 6637</p>
                            <p>(8h-20h kể cả Thứ 7 - Chủ Nhật)</p>
                            <h4 className="footer_title">NHẬN KHUYẾN MÃI MỚI NHẤT </h4>
                            <div className="send_email">
                                <div id="errorSubscribeEmail" className="buy_err">
                                </div>
                                <p>
                                    <button className="btn_brand mR" onclick="layout.SubscribeEmail(1, 0)">NAM</button>
                                    <button className="btn_brand" onclick="layout.SubscribeEmail(1, 1)">NỮ</button>
                                </p>
                            </div>
                            <div className="connect">
                                <h4 className="footer_title">KẾT NỐI VỚI aothun MUA</h4>
                                <ul className="list_connect">
                                    <li><a className="face" href="https://www.facebook.com/cungmuachamcom"></a></li>
                                    <li><a className="print" href="https://www.pinterest.com/cungmuacom/"></a></li>
                                    <li><a className="youtube" href="https://www.youtube.com/channel/UCSA2L3AEKM6S8bjfqt1EQZQ"></a></li>
                                    <li><a className="google" href="https://plus.google.com/+cungmua"></a></li>
                                </ul>
                            </div>
                            <div className="link">
                                <h4 className="footer_title">LIÊN KẾT</h4>
                                <a href="http://www.nhommua.com/">www.nhommua.com</a>
                                <a href="http://www.shipto.vn/">www.ShipTo.vn</a>
                                <a href="/doi-tac">Hợp tác &amp; Đối tác</a>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <h4 className="footer_title">VĂN PHÒNG aothun MUA</h4>
                            <ul className="footer_item1">
                                <li><strong>Trụ sở TP.Hồ Chí Minh</strong><br/>
                                    180 - 182 Lý Chính Thắng, Phường 9, Q.3
                                </li>
                                <li>
                                    <strong>Tại Hà Nội</strong> <br/>
                                    Số 252 Lê Trọng Tấn, Phường Khương Mai, Q.Thanh Xuân
                                </li>
                                <li>
                                    <strong>Tại Biên Hòa</strong> <br/>
                                    Số E8, Đường N4, KDC Bửu Long
                                </li>
                                <li>
                                    <strong>Tại Bình Dương</strong><br/>
                                    Liên hệ văn phòng Biên Hòa
                                </li>
                                <li>
                                    <strong>Tại Cần Thơ</strong><br/>
                                    227/7 Trần Bình Trọng, Q.Ninh Kiều
                                </li>
                                <li>
                                    <strong>Tại Đà Nẵng</strong><br/>
                                    16 Núi Thành, Phường Hòa Thuận Đông, Q. Hải Châu
                                </li>
                                <li>
                                    <strong>Tại Nha Trang</strong> <br/>
                                    1130 Lê Hồng Phong, P.Phước Long
                                </li>
                                <li>
                                    <strong>Tại Bà Rịa - Vũng Tàu</strong><br/>
                                    89B Nguyễn Văn Trỗi, Phường 4, Thành phố Vũng Tàu
                                </li>
                            </ul>
                        </div>
                    </div>
                    <br className="clean"/>
                    <div className="footer_des">
                        <p>aothun Mua là website tập hợp các ưu đãi hấp dẫn nhất trên thị trường, cung cấp đa dạng các sản phầm từ thời trang nữ, vật dụng gia đình, đồ cho bé, thực phẩm...</p>
                        <p>Chúng tôi luôn nỗ lực mang lại sự tiện lợi khi mua sắm, nhiều ưu đãi chất  lượng aothun dịch vụ chu đáo cho  người dùng. Giờ đây bạn có thể trải nghiệm mua sắm trực tuyến thỏa thích mà aothun Mua mang lại chỉ với 1 click chuột. Dù bạn là một nhân viên văn phòng, người nội trợ hay sinh viên, chắc chắn bạn cũng sẽ yêu thích trải nghiệm mua hàng tại CungMua.com.</p>
                    </div>
                </div>
            </footer>
        )
    }
}