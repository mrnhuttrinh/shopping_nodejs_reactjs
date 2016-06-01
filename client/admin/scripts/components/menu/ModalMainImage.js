import React, {Component} from 'react'
import checkfileimage from '../../utils/checkfileimage';
import apis from '../../apis/menu';
import _ from 'lodash';
import ViewPicture from './ViewPicture';
import ButtonLoading from '../ButtonLoading';

export default class ModalMainImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectMenu: null,
            newImageStatus: false,
            savingNewImage: false,
            newImage: {
                link: "",
                image: "",
                category_id: 0
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            selectMenu: _.cloneDeep(nextProps.menu)
        });
    }
    changePhoto(event) {
        event.preventDefault();
        var self = this;
        var inputPhoto = self.refs["exampleInputFile"];
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            console.log('The File APIs are not fully supported in this browser.');
            return;
        } 
        var file = $(inputPhoto)[0].files[0];
        if (checkfileimage(file)) {
            var fr = new FileReader();
            fr.onload = function() {
                // fr.result is base-64
                self.setState({
                    newImage: {
                        category_id: self.props.menu.id,
                        image: fr.result
                    }
                });
            }
            fr.readAsDataURL(file);
        } else {
            $(inputPhoto).val("");
        }
    }
    saveMorePicture(event) {
        event.preventDefault();
        var self = this;
        var linkTo = self.refs["linkTo"].value;
        self.state.newImage.link = linkTo;
        self.setState({
            savingNewImage: !self.state.savingNewImage
        })
        apis.addMorePicture(this.state.newImage, function(err, res) {
            if (err) {
                toastr.error("Thêm Hình Ảnh Không Thành Công")
            } else {
                self.setState({
                    newImage: {
                        link: "",
                        image: "",
                        category_id: 0
                    },
                    newImageStatus: !self.state.newImageStatus,
                    savingNewImage: !self.state.savingNewImage
                });
                if (!self.state.selectMenu.images) {
                    self.state.selectMenu.images = [];
                }
                self.state.selectMenu.images.push(res.body.data);
                self.props.addMorePicture(self.state.selectMenu);
                toastr.success("Thêm Hình Ảnh Thành Công")
            }
            self.setState({
                savingNewImage: !self.state.savingNewImage
            });
        })
    }

    addMorePicture(event) {
        event.preventDefault();
        $('.scroll-customize').animate({scrollTop: 0}, 'slow');
        this.setState({
            newImageStatus: !this.state.newImageStatus
        });
    }
    deleteGallery(_image) {
        _.remove(this.state.selectMenu.images, (image) => {
            return image.id === _image.id;
        })
        this.props.deleteGallery(this.state.selectMenu);
    }
    render() {
        var self = this;
        var addImageContent = "";
        if (this.state.newImageStatus) {
            addImageContent = (
                <div className="col-md-12">
                    <div className="panel panel-success">
                        <div className="panel-heading">
                            Thêm Hình Ảnh Mới
                        </div>
                        <div className="panel-body">
                            <img src={this.state.newImage.image} alt="Hình Ảnh Mới" style={{"width": "100%", "height": "387px"}}/>
                            <div>
                                <input onChange={this.changePhoto.bind(this)} ref="exampleInputFile" id="exampleInputFile" type="file"/>
                            </div>
                            <br />
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <input id="linkTo" ref="linkTo" type="text" className="form-control" id="link" placeholder="Đường Dẫn Liên Kết"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <hr />
                </div>
            );
        }

        var indexCount = 0;
        var listImages = _.map(self.props.menu.images, (image)=> {
            return (<ViewPicture 
                    deleteGallery={self.deleteGallery.bind(self)}
                    indexCount={++indexCount}
                    image={image} />
            )
        })
        if (!listImages.length) {
            listImages = (
                <h2>Chưa Có Hình Ảnh!</h2>
            )
        }
        return (
            <div id={this.props.name} className="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="exampleModalLabel">
                                Danh Sách Hình Ảnh - [<strong className="brand-primary">{this.props.menu.name}</strong>]({indexCount})
                            </h4>
                        </div>
                        <div className="modal-body">
                            <div className="row inline-modal500px scroll-customize">
                                {addImageContent}
                                <div className="col-md-12">
                                    <table className="table table-hover">
                                        {listImages}
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                        {
                            this.state.newImageStatus ? (
                                this.state.savingNewImage ? (
                                    <ButtonLoading />
                                ) : (
                                    <button type="button" onClick={this.saveMorePicture.bind(this)} className="btn btn-primary">Lưu</button>
                                )
                            ) : (
                                <button type="button" onClick={this.addMorePicture.bind(this)} className="btn btn-success">Thêm</button>
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
