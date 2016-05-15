import React, {Component} from 'react'
import Chat from './Chat'
import _ from "lodash";
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
    searchProduct(event) {
        event.preventDefault();
        var searchValue = this.refs["inputSearch"].value;
        if (_.isEmpty(searchValue)) return;
        var pathName = window.location.pathname;
        window.location = pathName + "#/dashboard/search/" + searchValue;
    }
    render() {
        var listChat = this.state.listChat;
        return (
            <header id="header">
                <div id="logo-group">
                    <span id="logo"> <img src="img/logo.png" alt="SmartAdmin" /> </span>
                </div>
                <div className="pull-right">
                    <div id="logout" className="btn-header transparent pull-right">
                        <span> <a onClick={this.logOut.bind(this)} href="javascript:void(0);" title="Sign Out" ><i className="fa fa-sign-out"></i></a> </span>
                    </div>
                    <div id="hide-menu" className="btn-header pull-right">
                        <span> <a href="javascript:void(0);" data-action="toggleMenu" title="Collapse Menu"><i className="fa fa-reorder"></i></a> </span>
                    </div>
                    <div id="search-mobile" className="btn-header transparent pull-right">
                        <span> <a href="javascript:void(0)" title="Search"><i className="fa fa-search"></i></a> </span>
                    </div>
                    <form onSubmit={this.searchProduct.bind(this)} className="header-search pull-right">
                        <input ref="inputSearch" id="search-fld"  type="text" name="param" placeholder="Tìm Kiếm Sản Phẩm (Tên, Mã)" />
                        <button type="submit">
                            <i className="fa fa-search"></i>
                        </button>
                        <a href="javascript:void(0);" id="cancel-search-js" title="Cancel Search"><i className="fa fa-times"></i></a>
                    </form>
                </div>
                {listChat}
            </header>
        );
    }
}