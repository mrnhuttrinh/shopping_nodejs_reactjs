import React from 'react'
import Header from './Header';
import LeftMenu from './LeftMenu';
import Main from './Main';
import Footer from './Footer';

export default class App extends React.Component{
    render() {
        return (
            <div>
                <Header />
                <LeftMenu pathName={this.props.location.pathname}/>
                {this.props.children}
            </div>
        )
    }
}