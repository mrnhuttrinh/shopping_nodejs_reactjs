import React, {Component} from 'react'
import apis from '../../apis/news'
import _ from 'lodash'
import DivLoading from '../DivLoading';

export default class ViewNews extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            news: {}
        }
    }
    componentWillReceiveProps(nextProps) {
        var self = this;
        var openDialog = nextProps.openDialog;
        if (!_.isEmpty(openDialog)) {
            self.setState({
                loading: true
            })
            apis.getNewsById(openDialog.id, function(err, res) {
                if (err) {
                    toastr.error("Tải Bài Viết Không Thành Công!")
                } else {
                    self.setState({
                        news: res.body.data,
                        loading: false
                    })
                }
            })
        }
    }
    render() {
        return (
            <div className="modal modal-wide fade" id="viewNewsModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button aria-label="Close" className="close" data-dismiss="modal" type="button">
                                <span aria-hidden="true">
                                    ×
                                </span>
                            </button>
                            <h4 className="modal-title">
                                Bài Viết: {this.state.news.title}
                            </h4>
                        </div>
                        <div className="modal-body">
                            <div className="row scroll-customize inline-modal" >
                            {
                                this.state.loading ? (
                                    <DivLoading />
                                ) : (
                                    <div>
                                        <div className="col-md-12">
                                            <p style={{marginBottom: "-20px"}}>Ảnh Hiển Thị</p>
                                            <hr />
                                        </div>
                                        <div className="col-md-12">
                                            <img src={this.state.news.main_image}/>
                                        </div>
                                        <div className="col-md-12">
                                            <p style={{marginBottom: "-20px"}}>Nội Dung Bài Viết</p>
                                            <hr />
                                        </div>
                                        <div className="col-md-12" dangerouslySetInnerHTML={{__html: this.state.news.content}}>
                                        </div>
                                    </div>
                                )
                            }
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref="cancelUpdateSize" className="btn btn-default" data-dismiss="modal" type="button">
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}