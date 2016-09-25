import React, {Component} from 'react';
import newsAPI from '../../apis/news';

export default class OneNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: null
        };
    }
    componentDidMount() {
        var data = {
            id: this.props.params["news_id"]
        };
        newsAPI.getNewsById(data, (err, res) => {
            if (err) {

            } else {
                this.setState({
                    news: res.body.data
                });
            }
        });
    }
    render() {
        if (this.state.news) {
            var news = this.state.news;
            return (
                <div className="index_middle">
                    <div className="container">
                        <h1>{news.title}</h1>
                        <hr />
                        <img src={"/admin/" + news.main_image} />
                        <div dangerouslySetInnerHTML={{__html: news.content}}>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}
