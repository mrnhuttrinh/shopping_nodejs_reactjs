import React, {Component} from 'react'
import Header from './headers'
import Menu from './menus'

export default class Main extends Component{
    render() {
        return (
            <div className="index">
                <Header />
                <Menu />
            </div>
        );
    }
}
