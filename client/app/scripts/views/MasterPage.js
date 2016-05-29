import React, {Component}   from 'react'
import { connect }          from 'react-redux'
import {getMenu}            from '../actions/main'

import Header               from '../components/headers'
import Menu                 from '../components/menus'
import ScrollTop            from '../components/ScrollTop'
import Footer               from '../components/footers'
import MainMenu             from '../components/MainMenu'
import NewsOnTop            from '../components/NewsOnTop'

import apis                 from '../apis/main';
import newsApis             from '../apis/news';
import _                    from 'lodash'
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
        var firstLoad = sessionItem.getItem('first_load');
        if (_.isNull(firstLoad) || _.isUndefined(firstLoad) || !firstLoad) {
            var newsOnTop = _.find(listNews, (news) => {
                return news.show_on_top;
            });
            self.setState({
                NewsOnTop: (<NewsOnTop news={newsOnTop}/>)
            });
            sessionItem.setItem("first_load", true);
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
    render() {
        return (
            <div className="index">
                <MainMenu />
                <Header menus={this.props.menus}/>
                <Menu {...this.props}/>
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