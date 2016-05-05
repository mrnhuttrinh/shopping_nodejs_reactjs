import React, {Component} from 'react'

export default class ModalMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newImageStatus: false,
            newImage: {
                link: "",
                image: ""
            }
        }
    }

    addMorePicture(event) {
        event.preventDefault();
        $('.scroll-customize').animate({scrollTop: 0}, 'slow');
        this.setState({
            newImageStatus: !this.state.newImageStatus
        });
    }

    render() {
        var addImageContent = "";
        if (this.state.newImageStatus) {
            addImageContent = (
                <div className="col-md-12">
                    <div className="panel panel-success">
                        <div className="panel-heading">
                            Thêm Hình Ảnh Mới
                        </div>
                        <div className="panel-body">
                            <img src="" alt="Hình Ảnh Mới" style={{"width": "100%", "height": "387px"}}/>
                            <div>
                                <input type="file"/>
                            </div>
                            <br />
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <input type="text" className="form-control" id="link" placeholder="Đường Dẫn Liên Kết"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <hr />
                </div>
            );
        }
        return (
            <div id={this.props.name} className="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="exampleModalLabel">
                                Danh Sách Hình Ảnh (4)
                            </h4>
                        </div>
                        <div className="modal-body">
                            <div className="row inline-modal500px scroll-customize">
                                {addImageContent}
                                <div className="col-md-12">
                                    <table className="table table-hover">
                                        <tr>
                                            <td width="30px">
                                                1
                                            </td>
                                            <td>
                                                <div className="panel panel-primary">
                                                    <div className="panel-heading">
                                                        <h3 className="panel-title">Panel title
                                                            <button type="button" className="btn btn-danger pull-right">Xóa</button>
                                                        </h3>
                                                    </div>
                                                    <div className="panel-body">
                                                        <a href="#">
                                                            <img src="http://localhost:8000/admin/img/data/products/thumbnail_344790CC-9ADC-4697-B792-663C383ECCC0.gif" alt="..." />
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                2
                                            </td>
                                            <td>
                                                <div className="panel panel-primary">
                                                    <div className="panel-heading">
                                                        <h3 className="panel-title">Panel title
                                                            <button type="button" className="btn btn-danger pull-right">Xóa</button>
                                                        </h3>
                                                    </div>
                                                    <div className="panel-body">
                                                        <a href="#">
                                                            <img src="http://localhost:8000/admin/img/data/products/thumbnail_344790CC-9ADC-4697-B792-663C383ECCC0.gif" alt="..." />
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={this.addMorePicture.bind(this)} className="btn btn-success">Thêm</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
