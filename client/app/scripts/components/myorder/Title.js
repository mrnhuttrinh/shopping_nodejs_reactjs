import React, {Component} from 'react';

export default class Title extends Component {
    render() {
        return (
            <div className="row payment_step">
                <p className="title_inside1 col-md-4 col-sm-12"><strong>{this.props.id}</strong><span></span></p>
                <div className="col-md-8 col-sm-12 intro_menu_div">
                    <ul className="intro_menu">
                        <li>
                            <span className="intro_menu_L">1</span>
                            <a className="intro_menu_ce">Thanh Toán</a>
                            <span className="intro_menu_R"></span>
                        </li>
                        <li className="actived">
                            <span className="intro_menu_L">2</span>
                            <a className="intro_menu_ce">Vận Chuyển</a>
                            <span className="intro_menu_R"></span>
                        </li>
                        <li className="">
                            <span className="intro_menu_L">3</span>
                            <a className="intro_menu_ce">Hoàn tất</a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
