import React, {Component} from 'react'
import Header from './headers'
import Menu from './menus'
import ScrollTop from './ScrollTop'
import Contents from './contents'
import Footer from './footers'

export default class Main extends Component {
    render() {
        return (
            <div className="index">
                <Header />
                <Menu />
                <Contents />
                <ScrollTop />
                <Footer />
            </div>
        );
    }
}
