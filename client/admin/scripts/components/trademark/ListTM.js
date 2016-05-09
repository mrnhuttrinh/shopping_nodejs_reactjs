import React, {Component} from 'react'
import Table from '../Table';
import DivLoading from '../DivLoading';
import apis from '../../apis/trademark';
import _ from 'lodash'

export default class ListTM extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingData: true
        }
    }
    componentDidMount() {
        var self = this;
        if (!self.props.trademades) {
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
                j++;
            }
            return (
                <div>
                    <Table 
                        head={head}
                        rows={rows}/>
                </div>
            )
        }
    }
}