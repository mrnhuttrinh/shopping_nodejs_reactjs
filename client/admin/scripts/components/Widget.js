import React, {Component} from 'react'
import Modal from './Modal';
import _ from 'lodash';
import checkfileimage from '../utils/checkfileimage';

class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownCategory: false
        }
    }
    expandCategory(event) {
        var self = this;
        event.preventDefault();
        this.setState({
            dropdownCategory: !this.state.dropdownCategory
        });
    }
    render() {
        var self = this;
        var dropdownContent = this.state.dropdownCategory ? "block" : "none";
        var listChoose = _.map(this.props.menus, function(menu) {
            if (menu.id !== 1 && menu.id !== 2 && menu.level === 1) {
                return (
                    <li className="list-group-item">
                        <span className="icon expand-icon glyphicon glyphicon-plus"></span>
                        {"  " + menu.name}
                    </li>
                );
            }
        })
        return (
            <div id="dropdownCategory" className="dropdown">
                <button onClick={this.expandCategory.bind(this)} aria-expanded="true" aria-haspopup="true" className="btn btn-default dropdown-toggle" id="dropdownMenu1" type="button">
                    Chọn Loại Sản Phẩm
                    <span className="caret">
                    </span>
                </button>
                <ul className="list-group" 
                    style={{
                        "display": dropdownContent,
                        "position": "absolute",
                        "zIndex": "9999",
                        "width": "100%"
                    }}>
                    {listChoose}
                </ul>
            </div>
        );
    }
}

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myDropzone: null
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

    render() {
        var modalTitle = "Thêm Sản Phẩm Mới";
        var modalExcute = this.modalExcute;
        return (
            <Modal modalName={this.props.modalName}
                modalExcute={modalExcute.bind(this)}
                modalTitle={modalTitle}>
                <div className="row">
                    <div className="col-md-3">
                        <p>Hình Ảnh Sản Phẩm</p>
                        <div>
                            <form style={{"overflowY": "scroll", "height": "400px"}} id="mydropzone" className="dropzone dz-clickable dz-started" enctype="multipart/form-data">
                            </form>
                        </div> 
                        <br />
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-12">
                                <strong>Thông Tin Cần Thiết</strong>
                                <hr style={{"marginTop": "10px"}} />
                                <form style={{"overflowY": "scroll","overflowX": "hidden", "height": "400px"}} className="form-horizontal">
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" for="employerName">
                                            Loại Sản Phẩm
                                        </label>
                                        <div className="col-sm-10">
                                            <DropDown {...this.props} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" for="employerUsername">
                                            Tên Sản Phẩm
                                        </label>
                                        <div className="col-sm-10">
                                            <input  className="form-control" ref="employerUsername" id="employerUsername" placeholder="Tên Đăng Nhập" type="text">
                                            </input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" for="employerPassword">
                                            Mã Sản Phẩm (Mã Code)
                                        </label>
                                        <div className="col-sm-10">
                                            <input className="form-control" ref="employerPassword" id="employerPassword" placeholder="Email" type="text">
                                            </input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" for="employerEmail">
                                            Ảnh Đại Diện (Thumbnail)
                                        </label>
                                        <div className="col-sm-10">
                                            <input className="form-control" ref="employerEmail" id="employerEmail" placeholder="Email" type="email">
                                            </input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" for="employerPhone">
                                            Đơn Giá
                                        </label>
                                        <div className="col-sm-10">
                                            <input className="form-control" ref="employerPhone" id="employerPhone" placeholder="Số Điện Thoại" type="text">
                                            </input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" for="employerAddress">
                                            Số Lượng Size S
                                        </label>
                                        <div className="col-sm-10">
                                            <input className="form-control" ref="employerAddress" id="employerAddress" placeholder="Địa Chỉ" type="text">
                                            </input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" for="employerRole">
                                            Số Lượng Size M
                                        </label>
                                        <div className="col-sm-10">
                                            <input className="form-control" ref="employerAddress" id="employerAddress" placeholder="Địa Chỉ" type="text">
                                            </input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" for="employerRole">
                                            Số Lượng Size X
                                        </label>
                                        <div className="col-sm-10">
                                            <input className="form-control" ref="employerAddress" id="employerAddress" placeholder="Địa Chỉ" type="text">
                                            </input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label" for="employerRole">
                                            Chọn Màu
                                        </label>
                                        <div className="col-sm-10">
                                            <input className="form-control" ref="employerAddress" id="employerAddress" placeholder="Địa Chỉ" type="text">
                                            </input>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default class Widget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberImage: 0,
            tabChoose: "home"
        }
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
    chooseTab(tab, event) {
        event.preventDefault();
        this.setState({
            tabChoose: tab
        });
    }
    render() {
        var self = this;
        var listTabHeader = _.map(this.props.menus, function(menu) {
            if (menu.level === 1) {
                return (
                    <li className="">
                        <a onClick={self.chooseTab.bind(self, menu.name)} aria-controls="dropdown2" aria-expanded="false" data-toggle="tab" href={"#" + menu.name} id="dropdown2-tab" role="tab">
                            {menu.name}
                        </a>
                    </li>
                );
            }
        })
        var modalName = "addProduct"
        return (
            <div>
                <AddProduct {...this.props} modalName={modalName}/>
                <ul className="nav nav-tabs" role="tablist">
                    <li className="active" role="presentation">
                        <a onClick={this.chooseTab.bind(this, "home")} aria-controls="home" data-toggle="tab" href="#home" role="tab">
                            Tất Cả
                        </a>
                    </li>
                    <li className="dropdown" role="presentation">
                        <a aria-controls="myTabDrop1-contents" aria-expanded="false" className="dropdown-toggle" data-toggle="dropdown" href="#" id="myTabDrop1">
                            Chọn Theo Loại
                            <span className="caret">
                            </span>
                        </a>
                        <ul aria-labelledby="myTabDrop1" className="dropdown-menu" id="myTabDrop1-contents">
                            {listTabHeader}
                        </ul>
                    </li>
                    <li className="pull-right" role="presentation">
                        <button type="button" className="btn btn-success" data-target={"#" + modalName} data-toggle="modal">Thêm Mới</button>
                    </li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane active" id={this.state.tabChoose} role="tabpanel">
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
                </div>
            </div>
        );
    }
}