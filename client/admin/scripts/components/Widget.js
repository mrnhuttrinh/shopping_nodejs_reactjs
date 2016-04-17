import React, {Component} from 'react'
import Modal from './Modal';
import _ from 'lodash';
import checkfileimage from '../utils/checkfileimage';

export default class Widget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myDropzone: null,
            numberImage: 0
        }
    }
    modalExcute(event) {
        event.preventDefault();
        var self = this;
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            console.log('The File APIs are not fully supported in this browser.');
            return;
        } 
        var files = self.state.myDropzone.files;
        _.map(files, function(file) {
            var fr = new FileReader();
            fr.onload = function receivedText() {
            // fr.result is base-64
                console.log("fr.result");
            }
            fr.readAsDataURL(file);
        });

        // remove file in dropzone if successed
        // self.state.myDropzone.removeAllFiles();
    }
    componentDidMount() {
        var self = this;
        $(function() {
            // Dropzone.autoDiscover = false;
            self.state.myDropzone = new Dropzone("#mydropzone", { 
                url: "/file/post",
                addRemoveLinks : true,
                maxFilesize: 0.5,
                dictResponseError: 'Error uploading file!',
            });
            self.state.myDropzone.on("addedfile", function(file) {
                if (!checkfileimage(file)) {
                    self.state.myDropzone.removeFile(file);
                } else {
                    self.state.numberImage++;
                }
            });
        });
    }
    componentWillUnmount() {

    }
    render() {
        var modalName = "addProduct"
        var modalTitle = "Thêm Sản Phẩm Mới";
        var modalContent = (
            <div className="row">
                <div className="col-md-3">
                    <p>Hình Ảnh Sản Phẩm</p>
                    <div>
                        <form style={{"overflowY": "scroll", "height": "400px"}} id="mydropzone" className="dropzone dz-clickable dz-started" enctype="multipart/form-data">
                        </form>
                    </div> 
                </div>
                <div className="col-md-9">.col-md-8</div>
            </div>
        );
        var modalExcute = this.modalExcute;
        return (
            <div>
                <Modal modalName={modalName}
                    modalExcute={modalExcute.bind(this)}
                    modalContent={modalContent}
                    modalTitle={modalTitle}/>
                <ul className="nav nav-tabs" role="tablist">
                    <li className="active" role="presentation">
                        <a aria-controls="home" data-toggle="tab" href="#home" role="tab">
                            Home
                        </a>
                    </li>
                    <li className="dropdown" role="presentation">
                        <a aria-controls="myTabDrop1-contents" aria-expanded="false" className="dropdown-toggle" data-toggle="dropdown" href="#" id="myTabDrop1">
                            Dropdown
                            <span className="caret">
                            </span>
                        </a>
                        <ul aria-labelledby="myTabDrop1" className="dropdown-menu" id="myTabDrop1-contents">
                            <li>
                                <a aria-controls="dropdown1" aria-expanded="true" data-toggle="tab" href="#dropdown1" id="dropdown1-tab" role="tab">
                                    @fat
                                </a>
                            </li>
                            <li className="">
                                <a aria-controls="dropdown2" aria-expanded="false" data-toggle="tab" href="#dropdown2" id="dropdown2-tab" role="tab">
                                    @mdo
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="pull-right" role="presentation">
                        <button type="button" className="btn btn-success" data-target={"#" + modalName} data-toggle="modal">Thêm Mới</button>
                    </li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane active" id="home" role="tabpanel">
                        <div className="row">
                            <div className="col-md-3 col-sm-6">.col-md-3</div>
                            <div className="col-md-3 col-sm-6">.col-md-3</div>
                            <div className="col-md-3 col-sm-6">.col-md-3</div>
                            <div className="col-md-3 col-sm-6">.col-md-3</div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 col-sm-6">.col-md-3</div>
                            <div className="col-md-3 col-sm-6">.col-md-3</div>
                            <div className="col-md-3 col-sm-6">.col-md-3</div>
                            <div className="col-md-3 col-sm-6">.col-md-3</div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 col-sm-6">.col-md-3</div>
                            <div className="col-md-3 col-sm-6">.col-md-3</div>
                            <div className="col-md-3 col-sm-6">.col-md-3</div>
                            <div className="col-md-3 col-sm-6">.col-md-3</div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 col-sm-6">.col-md-3</div>
                            <div className="col-md-3 col-sm-6">.col-md-3</div>
                            <div className="col-md-3 col-sm-6">.col-md-3</div>
                            <div className="col-md-3 col-sm-6">.col-md-3</div>
                        </div>
                        <div className="row">
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                <nav>
                                    <ul className="pagination">
                                        <li>
                                            <a aria-label="Previous" href="#">
                                                <span aria-hidden="true">
                                                    «
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                1
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                2
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                3
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                4
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                5
                                            </a>
                                        </li>
                                        <li>
                                            <a aria-label="Next" href="#">
                                                <span aria-hidden="true">
                                                    »
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="col-md-4"></div>
                        </div>
                    </div>
                    <div className="tab-pane" id="dropdown1" role="tabpanel">
                        Messages
                    </div>
                    <div className="tab-pane" id="dropdown2" role="tabpanel">
                        Settings
                    </div>
                </div>
            </div>
        );
    }
}