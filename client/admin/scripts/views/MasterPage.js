import React, {Component}   from 'react'
import Header               from '../components/Header';
import LeftMenu             from '../components/LeftMenu';
import Footer               from '../components/Footer';
import BreadCrumb           from '../components/BreadCrumb';
import apis from '../apis/main';
import _ from 'lodash'
import localItem from '../utils/localItem';

export default class MasterPage extends Component {
    constructor(props) {
        super(props);
        // this.authentication();
        this.state = {
            authenticate: true
        };
    }
    authentication() {
        var tokenLocal = localItem.getItem("token");
        var self = this;
        if(_.isEmpty(tokenLocal) 
            || _.isNull(tokenLocal)
            || _.isUndefined(tokenLocal)
            || tokenLocal === "null") {
            window.location = "/admin/#/login";
        } else if (_.isNull(self.props.user) 
                || _.isEmpty(self.props.user) ) {
            apis.getMe(function(err, res) {
                if (err) {
                    localItem.removeItem("token");
                    window.location = "/admin/#/login";
                } else {
                    if (res.status === 200) {
                        self.state.authenticate = true;
                        self.props.signIn(res.body.data);
                    } else {
                        self.state.authenticate = false;
                        localItem.removeItem("token");
                        window.location = "/admin/#/login";
                    }
                }
            });
        }
    }
    componentWillMount() {
        this.authentication();
    }
    componentDidUpdate() {
        var self = this;
        if (!_.isNull(self.props.user) 
                && !_.isEmpty(self.props.user)) {
            if (_.isNull(self.props.menus) 
                || _.isEmpty(self.props.menus) ) {

                if (self.props.firstRequest) {
                    self.props.gettingMenu();
                }
            }
        }
    }

    render() {
        var self = this;
        var contentRender = "";
        if(this.state.authenticate) {
            contentRender = this.props.children;
        }
        return (
            <div>
                <Header {...this.props} />
                <LeftMenu {...this.props} pathName={this.props.pathname}/>
                <div id="main" role="main">
                    <BreadCrumb title={this.props.title} />
                    {contentRender}
                </div>
            </div>
        );
    }
}
