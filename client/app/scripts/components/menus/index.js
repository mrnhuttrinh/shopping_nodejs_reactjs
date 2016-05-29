import React, {Component} from 'react'
import Bxslider from './Bxslider'
import JumpMenu from './JumpMenu'
import HeaderMenu from "../commons/HeaderMenu"

export default class Menu extends Component {
    render() {
        return (
            <div className="index_middle">
                <div className="container dad">
                    <div className="menu_cate">
                        <HeaderMenu menus={this.props.menus} />
                    </div>
                    <div className="banner_home slider">
                        <Bxslider {...this.props}/>
                    </div>
                    <br className="clean" />
                </div>
                <JumpMenu menus={this.props.menus}/>
            </div>
        );
    }
}
