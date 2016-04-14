import React, {Component}   from 'react'
import Header           from '../components/headers'
import Menu             from '../components/menus'
import ScrollTop        from '../components/ScrollTop'
import Footer           from '../components/footers'
import MainMenu         from '../components/MainMenu'
import Chat             from '../components/Chat'

export default class MasterPage extends Component{
    render() {
        return (
            <div className="index">
                <MainMenu />
                <Header menus={this.props.menus}/>
                <Menu menus={this.props.menus}/>
                <div>
                    {this.props.children}
                </div>
                <ScrollTop />
                <Footer />
                <Chat />
            </div>
        );
    }
}
