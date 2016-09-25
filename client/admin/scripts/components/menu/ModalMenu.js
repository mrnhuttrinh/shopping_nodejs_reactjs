import React, {Component} from 'react'
import checkfileimage from '../../utils/checkfileimage';
import apis from '../../apis/menu';
import _ from 'lodash';
import ButtonLoading from '../ButtonLoading';

export default class ModalMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updatingLogo: false,
            selectMenu: {
                logo_image: ""
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
                var data = {
                    imageData: fr.result,
                    id: self.state.selectMenu.id,
                    logo_image: self.state.selectMenu.logo_image,
                    link: self.state.selectMenu.link
                }
                self.setState({
                    updatingLogo: !self.state.updatingLogo
                })
                apis.updateThumbnailCategory(data, function(err, res) {
                    if (err) {
                        toastr.error("Thay Đổi Logo Không Thành Công!");
                    } else {
                        self.state.selectMenu.thumbnail = fr.result;
                        self.setState({
                            selectMenu: self.state.selectMenu,
                            updatingLogo: !self.state.updatingLogo
                        })
                        self.props.updateMenu(self.state.selectMenu);
                        toastr.success("Thay Đổi Logo Thành Công!");
                    }
                })
            }
            fr.readAsDataURL(file);
        } else {
            $(inputPhoto).val("");
        }
    }
    render() {
        return (
            <div id={this.props.name} className="modal modal-wide fade" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="exampleModalLabel">
                                Thay Đổi Thumbnail [<strong>{this.state.selectMenu.name}</strong>]
                            </h4>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-1">
                                </div>
                                <div className="col-md-10">
                                    <div>
                                        <img src={this.state.selectMenu.thumbnail} alt="Hình Ảnh Mới" style={{"width": "100%", "height": "387px"}}/>
                                        {
                                            this.state.updatingLogo ? (
                                                <ButtonLoading />
                                            ) : (
                                                <input onChange={this.changePhoto.bind(this)} ref="exampleInputFile" id="exampleInputFile" type="file"/>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="col-md-1">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
