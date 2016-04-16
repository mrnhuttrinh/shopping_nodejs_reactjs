import React, {Component}   from 'react'
import Header               from '../components/Header';
import LeftMenu             from '../components/LeftMenu';
import Footer               from '../components/Footer';
import BreadCrumb           from '../components/BreadCrumb';
import apis from '../apis/main';
import _ from 'lodash'
import localItem from '../utils/localItem';

export default class MasterPage extends Component{

    componentDidMount() {
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
                    window.location = "/admin/#/login";
                } else {
                    if (res.status === 200) {
                        self.props.signIn(res.body.data);
                    } else {
                        window.location = "/admin/#/login";
                    }
                }
            });
        }
    }

    render() {
        return (
            <div>
                <Header {...this.props} />
                <LeftMenu {...this.props} pathName={this.props.pathname}/>
                <div id="main" role="main">
                    <BreadCrumb title={this.props.title} />
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
}
