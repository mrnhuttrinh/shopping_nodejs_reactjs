import React, {Component} from 'react'

export default class AddNews extends Component{
    constructor(props) {
        super(props);
        this.state = {
            addNews: false
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
    render() {
        var buttonStyle = this.state.addNews ? {"display": "none"} : {"display": "block"}
        var formStyle = this.state.addNews ? {"display": "block"} : {"display": "none"}
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <form>
                            <div className="form-group">
                                <label for="title">
                                    Tiều Đề Bài Viết
                                </label>
                                <input type="email" className="form-control" id="title" placeholder="Tiêu Đề Bài Viết"/>
                            </div>
                            <div className="form-group">
                                <label for="Content">
                                    Nội Dung
                                </label>
                                <div id="contentTitle" ></div>
                            </div>
                            <button type="submit" className="btn btn-primary pull-right">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button onClick={this.addFormNew.bind(this)} type="button" className="btn btn-success pull-right">Thêm Mới</button>
                    </div>
                </div>
                <br />
            </div>
        )
    }
}