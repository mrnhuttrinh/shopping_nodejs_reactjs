import React, {Component} from 'react'

export default class JumpMenu extends Component {
    componentDidMount() {
        $(function() {
            var floorjumping = $('#floorjumping');
            $(window).scroll(function() {
                var footer = $(".cont_pre_bottom");
                if (footer.length) {
                    var preFooter = $(".cont_pre_bottom").offset().top - 400;
                    var elementTop = floorjumping.offset().top;
                    var windowTop = $(window).scrollTop();
                    if (windowTop >= 400 && elementTop <= preFooter){
                        floorjumping.addClass('H_cate_fixed');
                    } else {
                        floorjumping.removeClass('H_cate_fixed');
                    }
                }
            });
        })
    }
    render() {
        return (
            <div id="dataVoucher" data-floor="T0">
                <div id="floorjumping" className="bg_menu_fix_H">
                    <div className="fix_H">
                        <ul className="menu_fix_H">
                            <li data-floor-index="T0"><a href="javascript:void(0);" className="ic_cm icon-logonm">e</a><div className="menu_H_info">Tầng trệt: Voucher Nhóm Mua</div></li>
                            <li data-floor-index="T1"><a href="javascript:void(0);" className="ic_cm icon-flash">w</a><div className="menu_H_info">Tầng 1: Flash sale</div></li>
                            <li data-floor-index="T2"><a href="javascript:void(0);" className="ic_cm icon-airplane"></a><div className="menu_H_info">Tầng 2: Du lịch - Khách Sạn</div></li>
                            <li data-floor-index="T3"><a href="javascript:void(0);" className="ic_cm ">z</a><div className="menu_H_info">Tầng 3: Thời trang nữ</div></li>
                            <li data-floor-index="T4"><a href="javascript:void(0);" className="ic_cm">y</a><div className="menu_H_info">Tầng 4: Thời trang nam</div></li>
                            <li data-floor-index="T5"><a href="javascript:void(0);" className="ic_cm">q</a><div className="menu_H_info">Tầng 5: Mỹ phẩm - Sức khỏe</div></li>
                            <li data-floor-index="T6"><a href="javascript:void(0);" className="ic_cm">x</a><div className="menu_H_info">Tầng 6: Nhà cửa - Gia dụng</div></li>
                            <li data-floor-index="T7"><a href="javascript:void(0);" className="ic_cm">m</a><div className="menu_H_info">Tầng 7: Đồ chơi - Bé yêu</div></li>
                            <li data-floor-index="T8"><a href="javascript:void(0);" className="ic_cm">F</a><div className="menu_H_info">Tầng 8: Công nghệ - Phụ kiện</div></li>
                            <li data-floor-index="T9"><a href="javascript:void(0);" className="ic_cm">v</a><div className="menu_H_info">Tầng 9: Thực phẩm - Dinh dưỡng</div></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}