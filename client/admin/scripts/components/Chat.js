import React, {Component} from 'react'

export default class Chat extends Component {
    componentDidMount() {
        $(document).on('click', '.panel-heading span.icon_minim', function (e) {
            var $this = $(this);
            if (!$this.hasClass('panel-collapsed')) {
                $this.parents('.panel').find('.panel-body').slideUp();
                $this.addClass('panel-collapsed');
                $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
            } else {
                $this.parents('.panel').find('.panel-body').slideDown();
                $this.removeClass('panel-collapsed');
                $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
            }
        });
        $(document).on('focus', '.panel-footer input.chat_input', function (e) {
            var $this = $(this);
            if ($('#minim_chat_window').hasClass('panel-collapsed')) {
                $this.parents('.panel').find('.panel-body').slideDown();
                $('#minim_chat_window').removeClass('panel-collapsed');
                $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
            }
        });
        $(document).on('click', '#new_chat', function (e) {
            var size = $( ".chat-window:last-child" ).css("margin-left");
             size_total = parseInt(size) + 400;
            alert(size_total);
            var clone = $( "#chat_window_1" ).clone().appendTo( ".container" );
            clone.css("margin-left", size_total);
        });
        $(document).on('click', '.icon_close', function (e) {
            //$(this).parent().parent().parent().parent().remove();
            $( "#chat_window_1" ).remove();
        });
    }
    render() {
        return (
            <div className="container">
                <div className="row chat-window" id={this.props.chatNo} style={{"margin-left": "10px"}}>
                    <div className="col-xs-12 col-md-12">
                        <div className="panel panel-default">
                            <div className="panel-heading top-bar">
                                <div className="col-md-8 col-xs-8">
                                    <h3 className="panel-title">
                                        <span className="glyphicon glyphicon-comment">
                                        </span>
                                        Chat - Miguel
                                    </h3>
                                </div>
                                <div className="col-md-4 col-xs-4" style={{"text-align": "right"}}>
                                    <a href="#">
                                        <span className="glyphicon icon_minim glyphicon-minus" id="minim_chat_window">
                                        </span>
                                    </a>
                                    <a href="#">
                                        <span className="glyphicon glyphicon-remove icon_close" data-id="chat_window_1">
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div className="panel-body msg_container_base">
                                <div className="row msg_container base_sent">
                                    <div className="col-md-10 col-xs-10">
                                        <div className="messages msg_sent">
                                            <p>
                                                that mongodb thing looks good, huh?
                                            tiny master db, and huge document store
                                            </p>
                                            <time datetime="2009-11-13T20:00">
                                                Timothy • 51 min
                                            </time>
                                        </div>
                                    </div>
                                    <div className="col-md-2 col-xs-2 avatar">
                                        <img className=" img-responsive " src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg">
                                        </img>
                                    </div>
                                </div>
                                <div className="row msg_container base_receive">
                                    <div className="col-md-2 col-xs-2 avatar">
                                        <img className=" img-responsive " src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg">
                                        </img>
                                    </div>
                                    <div className="col-md-10 col-xs-10">
                                        <div className="messages msg_receive">
                                            <p>
                                                that mongodb thing looks good, huh?
                                            tiny master db, and huge document store
                                            </p>
                                            <time datetime="2009-11-13T20:00">
                                                Timothy • 51 min
                                            </time>
                                        </div>
                                    </div>
                                </div>
                                <div className="row msg_container base_receive">
                                    <div className="col-md-2 col-xs-2 avatar">
                                        <img className=" img-responsive " src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg">
                                        </img>
                                    </div>
                                    <div className="col-xs-10 col-md-10">
                                        <div className="messages msg_receive">
                                            <p>
                                                that mongodb thing looks good, huh?
                                            tiny master db, and huge document store
                                            </p>
                                            <time datetime="2009-11-13T20:00">
                                                Timothy • 51 min
                                            </time>
                                        </div>
                                    </div>
                                </div>
                                <div className="row msg_container base_sent">
                                    <div className="col-xs-10 col-md-10">
                                        <div className="messages msg_sent">
                                            <p>
                                                that mongodb thing looks good, huh?
                                            tiny master db, and huge document store
                                            </p>
                                            <time datetime="2009-11-13T20:00">
                                                Timothy • 51 min
                                            </time>
                                        </div>
                                    </div>
                                    <div className="col-md-2 col-xs-2 avatar">
                                        <img className=" img-responsive " src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg">
                                        </img>
                                    </div>
                                </div>
                                <div className="row msg_container base_receive">
                                    <div className="col-md-2 col-xs-2 avatar">
                                        <img className=" img-responsive " src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg">
                                        </img>
                                    </div>
                                    <div className="col-xs-10 col-md-10">
                                        <div className="messages msg_receive">
                                            <p>
                                                that mongodb thing looks good, huh?
                                            tiny master db, and huge document store
                                            </p>
                                            <time datetime="2009-11-13T20:00">
                                                Timothy • 51 min
                                            </time>
                                        </div>
                                    </div>
                                </div>
                                <div className="row msg_container base_sent">
                                    <div className="col-md-10 col-xs-10 ">
                                        <div className="messages msg_sent">
                                            <p>
                                                that mongodb thing looks good, huh?
                                            tiny master db, and huge document store
                                            </p>
                                            <time datetime="2009-11-13T20:00">
                                                Timothy • 51 min
                                            </time>
                                        </div>
                                    </div>
                                    <div className="col-md-2 col-xs-2 avatar">
                                        <img className=" img-responsive " src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg">
                                        </img>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-footer">
                                <div className="input-group">
                                    <input className="form-control input-sm chat_input" id="btn-input" placeholder="Write your message here..." type="text"/>
                                    <span className="input-group-btn">
                                        <button className="btn btn-primary btn-sm" id="btn-chat">
                                            Send
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btn-group dropup">
                    <button className="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button">
                        <span className="glyphicon glyphicon-cog">
                        </span>
                        <span className="sr-only">
                            Toggle Dropdown
                        </span>
                    </button>
                    <ul className="dropdown-menu" role="menu">
                        <li>
                            <a href="#" id="new_chat">
                                <span className="glyphicon glyphicon-plus">
                                </span>
                                Novo
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="glyphicon glyphicon-list">
                                </span>
                                Ver outras
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="glyphicon glyphicon-remove">
                                </span>
                                Fechar Tudo
                            </a>
                        </li>
                        <li className="divider">
                        </li>
                        <li>
                            <a href="#">
                                <span className="glyphicon glyphicon-eye-close">
                                </span>
                                Invisivel
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
