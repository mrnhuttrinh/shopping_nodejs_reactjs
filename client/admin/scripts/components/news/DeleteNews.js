import React, {Component} from 'react'
import apis from '../../apis/news'
import _ from 'lodash'
export default class ViewNews extends Component{
    onDeleteNews(_news, event) {
        event.preventDefault();
        var self = this;
        apis.deleteNews(_news.id, function(err, res) {
            if (err) {
                toastr.error("Xóa Bài Viết Không Thành Công!")
            } else {
                toastr.success("Xóa Bài Viết Thành Công!")
                _.remove(self.props.news.listNews, (_removeNews) => {
                    return _removeNews.id === _news.id;
                });
                self.props.getListNews(self.props.news.listNews, "list")
                self.props.getListNews(self.props.news.total - 1, "total")
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
                            <button onClick={this.onDeleteNews.bind(this, this.props.deleteNews)} className="btn btn-danger pull-right" type="button">
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}