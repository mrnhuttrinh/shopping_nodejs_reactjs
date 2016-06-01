import React, {Component} from 'react'
import apis from '../../apis/news'
import _ from 'lodash'
export default class ViewNews extends Component{
    onDeleteNews(_news, event) {
        event.preventDefault();
        var self = this;
        var data = {
            id: _news.id,
            status: !_news.status,
            show_on_top: _news.show_on_top
        }
        apis.deleteNews(data, function(err, res) {
            if (err) {
                toastr.error("Xóa Bài Viết Không Thành Công!")
            } else {
                toastr.success("Xóa Bài Viết Thành Công!")
                var updateNews = _.find(self.props.news.listNews, (_removeNews) => {
                    if (_removeNews.id === _news.id)
                        return _removeNews;
                });
                updateNews.status = data.status;
                if (!data.status && updateNews.show_on_top) 
                    updateNews.show_on_top = false;
                self.props.getListNews(self.props.news.listNews, "list")
                $(self.refs["onCancelDeleteNews"]).click();
            }
        })
    }
    render() {
        return (
            <div className="modal fade" id="deleteNewsModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button aria-label="Close" className="close" data-dismiss="modal" type="button">
                                <span aria-hidden="true">
                                    ×
                                </span>
                            </button>
                            <h4 className="modal-title">
                                Xóa bài viết này
                            </h4>
                        </div>
                        <div className="modal-body">
                            {this.props.deleteNews.title}
                        </div>
                        <div className="modal-footer">
                            <button ref="onCancelDeleteNews" className="btn btn-default" data-dismiss="modal" type="button">
                                Hủy
                            </button>
                            {
                                this.props.deleteNews.status ? (
                                    <button onClick={this.onDeleteNews.bind(this, this.props.deleteNews)} className="btn btn-danger pull-right" type="button">
                                        Ẩn Bài Viết
                                    </button>
                                ) : (
                                    <button onClick={this.onDeleteNews.bind(this, this.props.deleteNews)} className="btn btn-primary pull-right" type="button">
                                        Sử Dụng Bài Viết
                                    </button>
                                )
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}