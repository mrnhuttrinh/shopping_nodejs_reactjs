import React, {Component} from 'react'

export default class Chat extends Component {
    onFocusWriteMessage(event) {
        self = $(event.currentTarget);
        var miniChatWindow = $(this.refs["minim_chat_window"]);
        if (miniChatWindow.hasClass('panel-collapsed')) {
            self.parents('.panel').find('.panel-body').slideDown();
            miniChatWindow.removeClass('panel-collapsed');
            miniChatWindow.removeClass('glyphicon-plus').addClass('glyphicon-minus');
        }
    }
    panelHeadingClick(event) {
        self = $(event.currentTarget);
        event.preventDefault();
        if (!self.hasClass('panel-collapsed')) {
            self.parents('.panel').find('.panel-body').slideUp();
            self.addClass('panel-collapsed');
            self.removeClass('glyphicon-minus').addClass('glyphicon-plus');
        } else {
            self.parents('.panel').find('.panel-body').slideDown();
            self.removeClass('panel-collapsed');
            self.removeClass('glyphicon-plus').addClass('glyphicon-minus');
        }
    }
    iconCloseClick(event) {
        this.refs["chat_window"].remove();
        event.preventDefault();
    }
    render() {
        return (
            <div className="container">
                <div ref="chat_window" className="row chat-window" id="chat_window">
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
                                <div className="col-md-4 col-xs-4">
                                    <a href="#">
                                        <span ref="icon_minim" onClick={this.panelHeadingClick.bind(this)} className="glyphicon icon_minim panel-collapsed glyphicon-plus" ref="minim_chat_window" id="minim_chat_window">
                                        </span>
                                    </a>
                                    <a href="#">
                                        <span onClick={this.iconCloseClick.bind(this)} ref="icon_close" className="glyphicon glyphicon-remove icon_close" data-id="chat_window_1">
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
                                    <input onFocus ={this.onFocusWriteMessage.bind(this)} className="form-control input-sm chat_input" id="btn-input" placeholder="Write your message here..." type="text"/>
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
            </div>
        );
    }
}
