import React, {Component} from 'react'
import _ from 'lodash'
import apis from '../../apis/news';
import Loading from '../ButtonLoading'

export default class AddNews extends Component{
    constructor(props) {
        super(props);
        this.state = {
            addNews: false,
            submit: false
        }
    }
    componentDidMount() {
        $(function() {
            $("#contentTitle").summernote({
                height: 500,
                placeholder: 'Nội Dung Bài Viết...'
            });
        })
    }
    addFormNew(event) {
        event.preventDefault();
        this.setState({
            addNews: !this.state.addNews
        });
    }
    onSubmitForm(event) {
        event.preventDefault();
        var self = this;
        var title = self.refs["title"].value;
        if (_.isEmpty(title)) {
            toastr.warning("Tiêu Đề Không Được Để Trống")
        }
        var content = $("#contentTitle").summernote("code");
        if (_.isEmpty(title)) {
            toastr.warning("Nội Dung Không Được Để Trống")
        }
        var data = {
            title: title,
            content: content
        };
        self.setState({
            submit: true
        })
        apis.createNews(data, function(err, result) {
            if (err) {
                toastr.error("Tạo Bài Viết Không Thành Công");
            }
            toastr.success("Tạo Bài Viết Thành Công");
            self.props.listNews.push({
                id: result.body.data.id,
                title: result.body.data.title
            })
            self.props.getListNews(self.props.listNews)
            self.setState({
                submit: false,
                addNews: false
            })
            $("#contentTitle").summernote("code", "");
            self.refs["title"].value = "";
        })
    }
    render() {
        var buttonStyle = this.state.addNews ? {"display": "none"} : {"display": "block"}
        var formStyle = this.state.addNews ? {"display": "block"} : {"display": "none"}
        return (
            <div>
                <div className="row" style={formStyle}>
                    <div className="col-md-12">
                        <form>
                            <div className="form-group">
                                <label for="title">
                                    Tiều Đề Bài Viết
                                </label>
                                <input ref="title" type="text" className="form-control" id="title" placeholder="Tiêu Đề Bài Viết"/>
                            </div>
                            <div className="form-group">
                                <label for="Content">
                                    Nội Dung
                                </label>
                                <div id="contentTitle" ></div>
                            </div>
                            {
                                this.state.submit ? (
                                    <Loading classCSS="pull-right"/>
                                ) : (
                                    <button onClick={this.onSubmitForm.bind(this)} type="submit" className="btn btn-primary pull-right">
                                        Submit
                                    </button>
                                )
                            }
                        </form>
                    </div>
                </div>
                <div className="row" style={buttonStyle}>
                    <div className="col-md-12">
                        <button onClick={this.addFormNew.bind(this)} type="button" className="btn btn-success pull-right">Thêm Mới</button>
                    </div>
                </div>
                <br />
            </div>
        )
    }
}