import React, {Component} from 'react';
import _ from 'lodash';

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
    jumpToSpace(index, event) {
        event.preventDefault();
        var indexContent = $(".index_middle[data-floor=T" + index + "]");
        var headerMenu = $("header .header_main").height() - 20;

        $('html,body').animate({
            scrollTop: ( indexContent.offset().top - headerMenu)
        }, 1000);
    }
    render() {
        var props = this.props;
        var menus = props.menus;
        var index = 0;
        var listJump = _.map(menus, menu => {
            if (menu.level === 1) {
                index++;
                return (
                    <li onClick={this.jumpToSpace.bind(this, index)} data-floor-index={"T" + index} key={"jump_" + index}>
                        <a href="javascript:void(0);" className={"ic_cm " + menu.icon}>{menu.char}</a><div className="menu_H_info">{menu.name}</div>
                    </li>
                );
            }
        });
        return (
            <div id="dataVoucher" data-floor="T0">
                <div id="floorjumping" className="bg_menu_fix_H">
                    <div className="fix_H">
                        <ul className="menu_fix_H">
                            {listJump}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}