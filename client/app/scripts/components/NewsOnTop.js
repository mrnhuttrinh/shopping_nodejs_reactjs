import React, {Component} from 'react'
import {Link} from 'react-router';

export default class NewsOnTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        };
    }
    componentWillMount() {
        document.body.style.overflowY = "hidden";
    }
    turnOffShowOnTop(event) {
        document.body.style.overflowY = "visible";
        this.setState({
            show: false
        });
    }
    render() {
        if (this.state.show) {
            var news = this.props.news;
            return (
                <div className="popup_news" onClick={this.turnOffShowOnTop.bind(this)}>
                    <div className="popup_news_inside">
                        <span onClick={this.turnOffShowOnTop.bind(this)} className="cursor-pointer button_close_popup"></span>
                        <Link onClick={this.turnOffShowOnTop.bind(this)} to={"/news/" + news.id}>
                            <img className="popup_news_image" src={"admin/" + news.main_image}></img>
                        </Link>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}