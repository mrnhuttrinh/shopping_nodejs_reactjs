import React, {Component}   from 'react'
import Header               from '../components/Header';
import LeftMenu             from '../components/LeftMenu';
import Footer               from '../components/Footer';

export default class MasterPage extends Component{
    render() {
        return (
            <div>
                <Header />
                <LeftMenu pathName={this.props.pathname}/>
                <div id="main" role="main">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
}
