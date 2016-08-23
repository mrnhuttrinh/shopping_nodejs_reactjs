import React, {Component} from 'react';
import checkfileimage from '../../utils/checkfileimage';
import _ from 'lodash';
import apis from '../../apis/news';
import Loading from '../ButtonLoading';

export default class AddNews extends Component{
    constructor(props) {
        super(props);
        this.state = {
            addNews: false,
            submit: false,
            thumbnail_data: ""
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
    chooseThumbnialChange(event) {
        var self = this;
        event.preventDefault();
        var thumbnailImage = this.refs["thumbnailImage"];
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            console.log('The File APIs are not fully supported in this browser.');
            return;
        } 
        var file = $(event.currentTarget)[0].files[0];
        if (checkfileimage(file)) {
            var fr = new FileReader();
            fr.onload = function() {
                // fr.result is base-64
                // console.log(fr.result);
                $(thumbnailImage).attr("src", fr.result);
                self.state.thumbnail_data = fr.result;
            }
            fr.readAsDataURL(file);
        } else {
            $(event.currentTarget).val("");
            $(thumbnailImage).attr("src", "");
        }
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
        var show_on_top = self.refs["show_on_top"].checked;
        var main_image = self.state.thumbnail_data;
        if (_.isEmpty(title)) {
            toastr.warning("Tiêu Đề Không Được Để Trống")
        }
        var content = $("#contentTitle").summernote("code");
        if (_.isEmpty(title)) {
            toastr.warning("Nội Dung Không Được Để Trống")
        }
        var data = {
            title: title,
            content: content,
            show_on_top: show_on_top,
            main_image: main_image
        };
        self.setState({
            submit: true
        });
        apis.createNews(data, function(err, result) {
            if (err) {
                toastr.error("Tạo Bài Viết Không Thành Công");
            } else {
                toastr.success("Tạo Bài Viết Thành Công");
                if (show_on_top) {
                    _.forEach(self.props.news.listNews, (_new)=> {
                        _new.show_on_top = false;
                    });
                    self.props.news.listNews.push({
                        id: result.body.data.id,
                        title: result.body.data.title,
                        show_on_top: true,
                        main_image: result.body.data.main_image
                    })
                } else {
                    self.props.news.listNews.push({
                        id: result.body.data.id,
                        title: result.body.data.title,
                        main_image: result.body.data.main_image
                    });
                }
                self.props.getListNews(self.props.news.listNews, "list")
                self.props.getListNews(self.props.news.total + 1, "total")
                self.setState({
                    submit: false,
                    addNews: false
                });
                $("#contentTitle").summernote("code", "");
                self.refs["title"].value = "";
                self.refs["show_on_top"].checked = false;
                self.refs["mainImage"].value = "";
            }
            self.setState({
                submit: false
            });
        })
    }
    onCancelForm(event) {
        event.preventDefault();
        var self = this;
        $("#contentTitle").summernote("code", "");
        self.refs["title"].value = "";
        self.refs["show_on_top"].checked = false;
        self.refs["mainImage"].value = "";
        self.setState({
            addNews: !self.state.addNews
        });
    }
    searchPress(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            var search_value = this.refs["inputSearch"].value;
            var pathName = window.location.pathname;
            if (_.isEmpty(search_value)) {
                window.location = pathName + "#/news";
            } else {
                window.location = pathName + "#/news/search/" + search_value;
            }
            return;
        }
    }
    render() {
        var buttonStyle = this.state.addNews ? {"display": "none"} : {"display": "block", "marginBottom": "-20px"}
        var formStyle = this.state.addNews ? {"display": "block"} : {"display": "none"}
        return (
            <div>
                <div className="row" style={formStyle}>
                    <div className="col-md-12">
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">
                                    Tiều Đề Bài Viết
                                </label>
                                <input ref="title" type="text" className="form-control" id="title" placeholder="Tiêu Đề Bài Viết"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="mainImage">
                                    Hình Ảnh Bài Viết
                                </label>
                                <div>
                                    <img src="" ref="thumbnailImage" style={{"minWidth": "200px", "minHeight": "200px"}}>
                                    </img>
                                    <input onChange={this.chooseThumbnialChange.bind(this)} className="form-control" ref="mainImage" id="mainImage" type="file">
                                    </input>
                                </div>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input ref="show_on_top" type="checkbox" /> Hiển Thị Khi Vào Trang Chính
                                </label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Content">
                                    Nội Dung
                                </label>
                                <div id="contentTitle" ></div>
                            </div>
                            {
                                this.state.submit ? (
                                    <Loading classCSS="pull-right"/>
                                ) : (
                                    <div>
                                        <button onClick={this.onCancelForm.bind(this)} type="submit" className="btn btn-warning pull-right">
                                            Hủy
                                        </button>
                                        <button onClick={this.onSubmitForm.bind(this)} type="submit" className="btn btn-primary pull-right">
                                            Lưu
                                        </button>
                                    </div>
                                )
                            }
                        </form>
                    </div>
                </div>
                <div className="row" style={buttonStyle}>
                    <div className="col-md-12">
                        <input onKeyUp={this.searchPress.bind(this)} ref="inputSearch"  type="text" placeholder="Tìm Kiếm Bài Viết" />
                        <button onClick={this.addFormNew.bind(this)} type="button" className="btn btn-success pull-right">Thêm Mới</button>
                    </div>
                </div>
                <br />
            </div>
        )
    }
}