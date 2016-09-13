import React, {Component} from 'react'
import Loading from '../ButtonLoading'
import checkfileimage from '../../utils/checkfileimage';
import _ from 'lodash'
import apis from '../../apis/main';
export default class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveUpdateStatus: false,
            myDropzone: null,
            fileGallery: [],
            galleries: _.cloneDeep(this.props.product.galleries),
            galleryRemove: []
        }
    }
    saveUpdate(event) {
        event.preventDefault();
        var self = this;
        var id = self.props.product.id;
        var newgallery = self.state.fileGallery;
        var remove = self.state.galleryRemove;
        var data = {
            new: newgallery,
            remove: remove
        };
        self.setState({
            saveUpdateStatus: true
        })
        apis.updateProduct(id, "gallery", data, function(err, res) {
            if (err) {
                toastr.error("Cập Nhật Hình Ảnh Không Thành Công")
            } else {
                apis.getProduct(id, function(err, res) {
                    if (err) {
                    } else {
                        self.props.getProduct(res.body.data);
                    }
                })
                toastr.success("Cập Nhật Hình Ảnh Thành Công")
                $(self.refs["cancelUpdateGallery"]).click();
                self.state.myDropzone.removeAllFiles();
                self.setState({
                    fileGallery: [],
                    galleries: _.cloneDeep(self.props.product.galleries),
                    galleryRemove: [],
                    saveUpdateStatus: false
                })

            }
            self.setState({
                saveUpdateStatus: false
            })
        })
    }
    addMoreGallery(event) {
        event.preventDefault();
        $("#dropZoneGallery").trigger("click");
    }
    componentDidMount() {
        var self = this;
        $(function() {
            self.state.myDropzone = new Dropzone("#dropZoneGallery", { 
                url: "/file/post",
                addRemoveLinks : true,
                maxFilesize: 0.5,
                dictResponseError: 'Error uploading file!',
                autoProcessQueue: false
            });
            self.state.myDropzone.on("addedfile", function(file) {
                if (!checkfileimage(file)) {
                    self.state.myDropzone.removeFile(file);
                } else {
                    self.readFileImage(file, function(dataImage) {
                        self.state.fileGallery.push({
                            name: file.name,
                            data: dataImage
                        })
                    })
                }
            });

            self.state.myDropzone.on("removedfile", function(file) {
                _.remove(self.state.fileGallery, (gallery) => {
                    return gallery.name === file.name;
                })
            });
        });
    }

    readFileImage(file, cb) {
        // read file content in dropzone
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            console.log('The File APIs are not fully supported in this browser.');
            return;
        } 
        var fr = new FileReader();
        fr.onload = function () {
            // fr.result is base-64
            cb(fr.result);
        }
        fr.readAsDataURL(file);
        // remove file in dropzone if successed
        // self.state.myDropzone.removeAllFiles();
    }
    removeImage(galleryId, event) {
        event.preventDefault();
        var self = this;
        self.state.galleryRemove.push(galleryId);
        _.remove(self.state.galleries, (gallery)=> {
            return gallery.id === galleryId
        })
        self.setState({
            galleryRemove: self.state.galleryRemove,
            galleries: self.state.galleries
        });
    }
    componentWillReceiveProps (nextProps) {
        this.setState({
            galleries: _.cloneDeep(nextProps.product.galleries)
        })
    }
    cancelUpdateGallery(event) {
        event.preventDefault();
        this.state.myDropzone.removeAllFiles();
        this.setState({
            fileGallery: [],
            galleries: _.cloneDeep(this.props.product.galleries),
            galleryRemove: []
        })
    }
    render() {
        var totalGallery = 0;
        if (this.props.product) {
            if (this.props.product.galleries) {
                totalGallery = this.props.product.galleries.length;
            }
        }
        var galleries = this.state.galleries;
        var viewGallery = "Chưa Có Hình Ảnh Nào";
        if (galleries) {
            totalGallery = galleries.length;
            viewGallery = _.map(galleries, (gallery) => {
                return (
                    <div className="col-xs-6 col-md-3">
                        <a className="thumbnail">
                            <img src={gallery.image}/>
                            <span onClick={this.removeImage.bind(this, gallery.id)}
                                style={{"position": "absolute", "top": "10px", "right": "25px", "zIndex": "5000"}} 
                                className="glyphicon glyphicon-remove cursor-pointer" />
                        </a>
                    </div>
                );
            })
        }
        return (
            <tr>
                <td>
                    Hình Ảnh
                </td>
                <td>
                    <span className="label label-info">{totalGallery}</span>
                    <button data-target="#galleryModal" data-toggle="modal" type="button" className="btn btn-default btn-xs pull-right">
                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    </button>
                    <div className="modal fade" id="galleryModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button aria-label="Close" className="close" data-dismiss="modal" type="button">
                                        <span aria-hidden="true">
                                            ×
                                        </span>
                                    </button>
                                    <h4 className="modal-title">
                                        Thay Hình Ảnh
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    <div className="row scroll-customize inline-modal">
                                        <div className="col-md-3">
                                            <p>Hình Ảnh Sản Phẩm</p>
                                            <div>
                                                <form id="dropZoneGallery" className="inline-modal dropzone dz-clickable dz-started scroll-customize" enctype="multipart/form-data">
                                                </form>
                                            </div> 
                                            <br />
                                        </div>
                                        <div className="col-md-9">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <strong>Hình Ảnh Đã Có</strong>
                                                    <hr style={{"marginTop": "10px"}} />
                                                    <div className="row">
                                                        {viewGallery}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button onClick={this.addMoreGallery.bind(this)} type="button" className="btn btn-default pull-left">
                                        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>Thêm Hình Ảnh
                                    </button>
                                    <button onClick={this.cancelUpdateGallery.bind(this)} ref="cancelUpdateGallery" className="btn btn-default" data-dismiss="modal" type="button">
                                        Hủy
                                    </button>
                                    {
                                        this.state.saveUpdateStatus ? (
                                            <Loading />
                                        ) : (
                                            <button onClick={this.saveUpdate.bind(this)} className="btn btn-primary" type="button">
                                                Lưu
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }
}