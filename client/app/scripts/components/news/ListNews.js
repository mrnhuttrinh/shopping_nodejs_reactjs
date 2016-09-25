import React, {Component} from 'react';
import _ from 'lodash';
import newsAPI from '../../apis/news';

export default class ListNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listNews: []
        };
    }
    componentDidMount() {
        newsAPI.getList((err, res) => {
            if (err) {

            } else {
                this.setState({
                    listNews: res.body.data
                });
            }
        });
    }
    renderListNews() {
        var listNews = this.state.listNews;
        return _.map(listNews, news => {
            return (
                <tr>
                    <td>
                        <a href={"/news/" + news.id}>{news.title}</a>
                    </td>
                </tr>
            );
        });
    }
    render() {
        return (
            <div className="index_middle">
                <div className="container">
                    <h1>Tin Tức Khuyến Mãi</h1>
                    <hr />
                    <table className="table">
                        {this.renderListNews()}
                    </table>
                </div>
            </div>
        );
    }
}
