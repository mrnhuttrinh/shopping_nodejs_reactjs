import React, {Component} from 'react'
import Table from '../Table';
import DivLoading from '../DivLoading';
import UpdateTM from './UpdateTM';
import apis from '../../apis/trademark';
import _ from 'lodash'

export default class ListTM extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingData: true,
            selectedTM: {
                id: "",
                name: "",
                address: "",
                phone: "",
                email: "",
                detail: ""
            }
        }
    }
    componentDidMount() {
        var self = this;
        if (self.props.trademark.listTrademark.length === 0) {
            apis.getListTrademark(function(err, result) {
                if (err) {
                    toastr.error("Tải Không Thành Công")
                } else {
                    self.props.getListTradeMark(result.body.data)
                    self.setState({
                        loadingData: !self.state.loadingData
                    })
                }
            })
        } else {
            self.setState({
                loadingData: !self.state.loadingData
            })
        }
    }
    onChangeStatus(_trademark, event) {
        event.preventDefault();
        var self = this;
        var inputElement = event.currentTarget;
        var data = {
            id: _trademark.id,
            status: !_trademark.status
        };
        apis.deleteTrademark(data, function(err, res) {
            if (err) {
                toastr.error("Cập Nhật Trạng Thái Không Thành Công!");
            } else  {
                inputElement.checked = !inputElement.checked;
                _trademark.status = !_trademark.status;
                self.props.getListTradeMark(self.props.trademark.listTrademark);
                toastr.success("Cập Nhật Trạng Thái Thành Công!");
            }
        })
    }
    selectedTM(_trademark, event) {
        event.preventDefault();
        this.setState({
            selectedTM: _trademark
        })
    }
    render() {
        if (this.state.loadingData) {
            return (
                <DivLoading />
            )
        } else {
            var self = this;
            var head= [
                {
                    name: "number",
                    text: "No."
                }, {
                    name: "name",
                    text: "Tên Nhà Cung Cấp"
                }, {
                    name: "address",
                    text: "Địa Chỉ"
                }, {
                    name: "phone",
                    text: "Số Điện Thoại"
                }, {
                    name: "email",
                    text: "Email"
                }, {
                    name: "edit_button",
                    text: ""
                }, {
                    name: "delete_button",
                    text: ""
                }
            ];
            var indexNo = 0;
            var page = this.props.page;
            var startElement = (page - 1)* 10;
            var rows = [];
            var j = 0;
            for (var i = startElement; i < this.props.trademark.listTrademark.length && i < startElement + 10; i++) {
                rows.push(this.props.trademark.listTrademark[i]);
                rows[j].number = ++indexNo;

                rows[j].edit_button = (
                    rows[j].status ? (
                        <button onClick={this.selectedTM.bind(this, rows[j])} className="btn btn-primary btn-xs" data-target="#updateTMModal" data-toggle="modal" type="button">
                            Cập Nhật
                        </button>
                    ) : (
                        <button className="btn btn-danger btn-xs" type="button">
                            Không Sử Dụng
                        </button>
                    )
                )
                rows[j].delete_button = (
                    <form className="smart-form">
                        <label className="toggle">
                            <input onChange={this.onChangeStatus.bind(this, rows[j])} ref="inputStatus" type="checkbox" name="checkbox-toggle" defaultChecked={rows[j].status ? "checked" : "" } />
                            <i data-swchon-text="ON" data-swchoff-text="OFF"></i>
                        </label>
                    </form>
                )
                j++;
            }
            return (
                <div>
                    <Table 
                        head={head}
                        rows={rows}/>
                    <UpdateTM {...this.props} selectedTM={this.state.selectedTM}/>
                </div>
            )
        }
    }
}