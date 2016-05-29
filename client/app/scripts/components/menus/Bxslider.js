import React, {Component} from 'react';
import {Link} from 'react-router';
import _ from 'lodash';

export default class Bxslider extends Component {
    componentDidUpdate() {
        var props = this.props;
        var listNews = props.news.listNews;
        if (listNews.length > 0) {
            var slider = $('.bxslider');
            self.bxSlider = slider.bxSlider({
                pager: true,
                controls: true,
                auto: true,
                autoHover: true,
                onSliderLoad: function() {
                    slider.css("visibility", "visible")
                }
            });
        }
    }
    render() {
        var props = this.props;
        var listNews = props.news.listNews;
        var listImages = _.map(listNews, (news) => {
            if (!_.isEmpty(news.main_image))
                return (<li key={"bxslider_" + news.id}><Link target="_blank" to="/"><img src={"admin/" + news.main_image} /></Link></li>);
        });
        if (listImages.length === 0) {
            listImages.push(<li key={"bxslider_null"}><img src="" /></li>);
        }
        return (
            <ul className="bxslider">
                {listImages}
            </ul>
        );
    }
}