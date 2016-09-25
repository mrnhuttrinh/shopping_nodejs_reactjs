import React, {Component} from 'react';
import OneNews from './OneNews';
import ListNews from './ListNews';

export default class News extends Component {
    constructor(props) {
        super(props);
        var type = false;
        var newsId = props.params["news_id"];
        if (newsId) {
            type = true;
        }
        this.state = {
            type: type
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        var props = this.props;
        if (props.params["news_id"] !== nextProps.params["news_id"]) {
            var type = false;
            var newsId = nextProps.params["news_id"];
            if (newsId) {
                type = true;
            }
            nextState.type = type;
            return true;
        }
        return false;
    }
    renderFullNews() {
        return (
            <div className="index_middle">
                <div className="container">
                    <ListNews />
                </div>
            </div>
        );
    }
    renderOneNews() {
        return (
            <div className="index_middle">
                <div className="container">
                    <OneNews {...this.props} />
                </div>
            </div>
        );
    }
    render() {
        return this.state.type ? this.renderOneNews() : this.renderFullNews();
    }
}
