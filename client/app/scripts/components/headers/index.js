import React, {Component} from 'react'
import HeaderMain from './HeaderMain'
import HeaderMenu from './HeaderMenu'

export default class Header extends Component {
    componentDidMount() {
        $(function() {
            var myHeader = $('#mainHeader');
            myHeader.data( 'position', myHeader.position() );
            $(window).scroll(function(){
                var hPos = myHeader.data('position'), scroll = getScroll();
                if ( hPos.top < scroll.top ){
                    myHeader.addClass('scroll_fixed');
                }
                else {
                    myHeader.removeClass('scroll_fixed');
                }
            });

            function getScroll () {
                var b = document.body;
                var e = document.documentElement;
                return {
                    left: parseFloat( window.pageXOffset || b.scrollLeft || e.scrollLeft ),
                    top: parseFloat( window.pageYOffset || b.scrollTop || e.scrollTop )
                };
            }
        })
    }
    render() {
        return (
            <header id="mainHeader" className="index_header">
                <HeaderMenu />
                <HeaderMain />
            </header>
        );
    }
}
