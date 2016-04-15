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

        var self = this;
        if(_.isEmpty(localItem.getItem("token")) 
            || _.isNull(localItem.getItem("token"))
            || _.isUndefined(localItem.getItem("token"))
            || localItem.getItem("token") === "null") {
            window.location = "/admin/#/login";
        } else if (_.isNull(self.props.user) ) {
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
                <Header logOut={this.props.logOut} />
                <LeftMenu pathName={this.props.pathname}/>
                <div id="main" role="main">
                    <BreadCrumb title={this.props.title} />
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
}
