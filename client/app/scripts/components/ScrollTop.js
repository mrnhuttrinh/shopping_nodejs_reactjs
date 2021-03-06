import React, {Component} from 'react'

export default class ScrollTop extends Component {
    scrollTop() {
        $("html, body").animate({
            scrollTop: 0
        }, 0)
        return false;
    }

    componentDidMount() {
        $(function() {
            $(window).on("scroll", function() {
                var chatWindow = $(".chat-window");
                if (chatWindow.length) {
                    var height = chatWindow[0].offsetHeight + 12;
                    $(".top_control").css("bottom", height +"px")
                }
                window.requestAnimationFrame(HandleOnScrolling)
            })

            function HandleOnScrolling() {
                var windowScrollTop = $(window).scrollTop();
                if (windowScrollTop <= 100) {
                    $(".top_control").fadeOut();
                } else {
                    $(".top_control").fadeIn()
                }
            }
        });
    }

    render() {
        return (
            <div className="top_control" style={{"display": "none"}} onClick={this.scrollTop}><a href="javascript:void(0);" className="btn_top"></a>
            </div>
        );
    }
}
