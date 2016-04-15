import React, {Component} from 'react'
import Chat from './Chat'
export default class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            listChat: []
        }
    }
    logOut(event) {
        event.preventDefault();
        this.props.logOut();
        window.location = "/admin/#/login";
    }
    openChat(self, e) {
        $(".ajax-dropdown").fadeOut(150);
        self.state.listChat.push(<Chat chatNo={"chat_window_1"}/>);
        self.setState({
            listChat: self.state.listChat
        })
        e.preventDefault()
    }
    clickActivity(event) {
        var elementActivity = this.refs["activity"];
        var self = $(elementActivity);
        if (self.find(".badge").hasClass("bg-color-red")) {
            self.find(".badge").removeClass("bg-color-red");
            self.find(".badge").text("0");
        }
        if (self.next(".ajax-dropdown").is(":visible")) {
            self.next(".ajax-dropdown").fadeOut(150);
            self.removeClass("active");
        } else {
            self.next(".ajax-dropdown").fadeIn(150);
            self.addClass("active");
        }
        event.preventDefault();
    }
    render() {
        var listChat = this.state.listChat;
        return (
            <header id="header">
                <div id="logo-group">
                    <span id="logo"> <img src="img/logo.png" alt="SmartAdmin" /> </span>
                    <span onClick={this.clickActivity.bind(this)} ref="activity" id="activity" className="activity-dropdown">
                        <i className="fa fa-user"></i>
                        <b className="badge"> 4 </b>
                    </span>
                    <div className="ajax-dropdown">
                        <div className="btn-group btn-group-justified" data-toggle="buttons">
                            <label className="btn btn-default">
                                Tin Nhắn
                            </label>
                        </div>
                        <div className="ajax-notifications custom-scroll" style={{"opacity": "1"}}>
                            <ul className="notification-body">
                                <li data-message="1" onClick={this.openChat.bind(null, this)}>
                                    <span className="unread">
                                        <a href="javascript:void(0);" className="msg">
                                            <img src="img/avatars/4.png" alt="" className="air air-top-left margin-top-5" width="40" height="40" />
                                            <span className="from">John Doe <i className="icon-paperclip"></i></span>
                                            <time>2 minutes ago</time>
                                            <span className="subject">Msed quia non numquam eius modi tempora</span>
                                            <span className="msg-body">Hello again and thanks for being a part of the newsletter. </span>
                                        </a>
                                    </span>
                                </li>
                                <li data-message="2" onClick={this.openChat.bind(null, this)}>
                                    <span>
                                        <a href="javascript:void(0);" className="msg">
                                            <img src="img/avatars/female.png" alt="" className="air air-top-left margin-top-5" width="40" height="40" />
                                            <span className="from">Sonya Birthday</span>
                                            <time>Thursday, September 19th</time>
                                            <span className="subject">Incidunt ut labor</span>
                                            <span className="msg-body">sed quia non numquam eius modi tempora incidunt ut labor</span>
                                        </a>
                                    </span>
                                </li>
                                <li data-message="3" onClick={this.openChat.bind(null, this)}>
                                    <span>
                                        <a href="javascript:void(0);" className="msg">
                                            <img src="img/avatars/1.png" alt="" className="air air-top-left margin-top-5" width="40" height="40" />
                                            <span className="from">Cristina Algera</span>
                                            <time>Sunday, September 15th</time>
                                            <span className="subject">Best-Selling Teethers</span>
                                            <span className="msg-body"> ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</span>
                                        </a>
                                    </span>
                                </li>
                                <li data-message="4" onClick={this.openChat.bind(null, this)}>
                                    <span>
                                        <a href="javascript:void(0);" className="msg">
                                            <img src="img/avatars/male.png" alt="" className="air air-top-left margin-top-5" width="40" height="40" />
                                            <span className="from">Lam Tampora</span>
                                            <time>Saturday, September 14th</time>
                                            <span className="subject">Deadline due date</span>
                                            <span className="msg-body">imus qui blanditiis praesentium voluptatum deleniti atque corrup</span>
                                        </a>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <span> Last updated on: 12/12/2013 9:43AM
                            <button type="button" data-loading-text="<i class='fa fa-refresh fa-spin'></i> Loading..." className="btn btn-xs btn-default pull-right">
                                <i className="fa fa-refresh"></i>
                            </button> 
                        </span>
                    </div>
                </div>
                <div className="pull-right">
                    <div id="hide-menu" className="btn-header pull-right">
                        <span> <a href="javascript:void(0);" data-action="toggleMenu" title="Collapse Menu"><i className="fa fa-reorder"></i></a> </span>
                    </div>
                    <div id="logout" className="btn-header transparent pull-right">
                        <span> <a onClick={this.logOut.bind(this)} href="javascript:void(0);" title="Sign Out" ><i className="fa fa-sign-out"></i></a> </span>
                    </div>
                </div>
                {listChat}
            </header>
        );
    }
}