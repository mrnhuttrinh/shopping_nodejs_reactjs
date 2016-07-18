import React, {Component}   from 'react';
import { connect }          from 'react-redux';
import {getMenu}            from '../actions/main';

import Header               from '../components/headers';
import Menu                 from '../components/menus';
import ScrollTop            from '../components/ScrollTop';
import Footer               from '../components/footers';
import MainMenu             from '../components/MainMenu';
import NewsOnTop            from '../components/NewsOnTop';

import BannerCenter         from '../components/BannerCenter';
import BreadCrumb           from '../components/BreadCrumb';
import MenuHorizon          from '../components/MenuHorizon';

import apis                 from '../apis/main';
import newsApis             from '../apis/news';
import _                    from 'lodash';
import localItem            from '../utils/localItem';
import sessionItem          from '../utils/sessionItem';

class MasterPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            NewsOnTop: null
        };
    }
    showNewsOnTop(listNews) {
        var self = this;
        
        var firstLoad = localItem.getItem('first_load');
        if (!firstLoad) {
            var newsOnTop = _.find(listNews, (news) => {
                return news.show_on_top;
            });
            self.setState({
                NewsOnTop: (<NewsOnTop news={newsOnTop}/>)
            });
            localItem.setItem("first_load", newsOnTop.id, 3600);
        }
    }
    componentDidMount() {
        var self = this;
        if (self.props.news.listNews.length === 0) {
            newsApis.getList(function(err, res) {
                if (err) {
                } else {
                    if (res.status === 200) {
                        var listNews = res.body.data;
                        self.props.getListNews(listNews);
                        self.showNewsOnTop(listNews);
                    }
                }
            });
        }

        if (_.isNull(self.props.menus) 
                || _.isEmpty(self.props.menus) ) {
            apis.getMenu(function(err, res) {
                if (err) {
                } else {
                    if (res.status === 200) {
                        self.props.getMenu(res.body.data);
                    }
                }
            });
        }
    }
    checkSegment(segment) {
        if (segment === "product" ||
            segment === "news" ||
            segment === "checkout" ||
            segment === "register") {
            return true;
        }
        return false;
    }
    render() {
        var pathName = this.props.location.pathname.split("/")[1];
        return (
            <div className="index">
                <MainMenu />
                <Header {...this.props}/>
                <Menu {...this.props}/>
                {
                    pathName === "" ? null : (
                        this.checkSegment(pathName) ? null : (
                            <BannerCenter {...this.props}>
                                <BreadCrumb {...this.props}>
                                    <MenuHorizon {...this.props}/>
                                </BreadCrumb>
                            </BannerCenter>
                        )
                    )
                }
                <div>
                    {this.props.children}
                </div>
                <ScrollTop />
                <Footer />
                {this.state.NewsOnTop}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.default
    }
}

export default connect(
    mapStateToProps,
    {
        getMenu
    }
)(MasterPage)