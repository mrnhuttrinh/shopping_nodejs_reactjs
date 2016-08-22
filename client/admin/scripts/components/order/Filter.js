import React, {Component} from 'react';
import _ from 'lodash';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import orderAPI from '../../apis/order';

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment().subtract(1, "days"),
            endDate: moment()
        }
    }
    renderCategory() {
        var options = _.map(this.props.menus, (menu, index) => {
            return (<option key={"menu_" + index} value={menu.id}>{menu.name}</option>)
        });
        return (
            <select ref="Category">
                <option value="">Tất Cả</option>
                {options}
            </select>
        );
    }
    handleChangeStartDate(date) {
        this.setState({
            startDate: date
        });
    }
    handleChangeEndDate(date) {
        this.setState({
            endDate: date
        });
    }
    _onSearch(event) {
        event.preventDefault();
        var OrderId = this.refs["OrderId"].value;
        var CustomerName = this.refs["CustomerName"].value;
        var Category = this.refs["Category"].value;
        var startDate = this.state.startDate;
        var endDate = this.state.endDate;
        var ProductName = this.refs["ProductName"].value;
        var Completed = this.refs["Completed"].checked;
        var UnCompleted = this.refs["UnCompleted"].checked;

        var data = {
            order_id: OrderId,
            product_name: ProductName,
            customer_name: CustomerName,
            category_id: Category,
            date_stard: startDate,
            date_end: endDate,
            completed: Completed,
            un_completed: UnCompleted
        };
        this.props.updateFilterState(true);
        orderAPI.filterOrder(data, (err, res) => {
            if (err) {} else {
                this.props.updateListOrders(res.body.data);
            }
            this.props.updateFilterState(false);
        });
    }
    render() {
        return (
            <div className="jarviswidget" id="wid-id-3" data-widget-editbutton="false" data-widget-custombutton="false">
                <header>
                    <span className="widget-icon"> 
                        <i className="fa fa-edit"></i> 
                    </span>
                    <h2>Đơn Đặt Hàng</h2>
                </header>
                <div>
                    <div className="widget-body no-padding">
                        <form id="order-form" className="smart-form" novalidate="novalidate">
                            <header>
                                Tìm Kiếm
                                <a onClick={this._onSearch.bind(this)} className="pull-right btn btn-primary btn-sm">Small button</a>
                            </header>
                            <fieldset>
                                <div className="row">
                                    <section className="col col-4">
                                        <label className="input"> 
                                            <i className="icon-append fa fa-lock"></i>
                                            <input type="text" ref="OrderId" name="orderId" placeholder="Mã Số Đơn Đặt Hàng" />
                                        </label>
                                    </section>
                                    <section className="col col-4">
                                        <label className="input"> 
                                            <i className="icon-append fa fa-user"></i>
                                            <input type="text" ref="CustomerName" name="CustomerName" placeholder="Tên Khách Hàng" />
                                        </label>
                                    </section>
                                    <section className="col col-4">
                                        <label className="select"> 
                                            {this.renderCategory()}
                                        </label>
                                    </section>
                                </div>

                                <div className="row">
                                    <section className="col col-4">
                                        <label className="input"> 
                                            <i className="icon-append fa fa-lock"></i>
                                            <input type="text" ref="ProductName" name="ProductName" placeholder="Tên Sản Phẩm" />
                                        </label>
                                    </section>
                                    <section className="col col-2">
                                        <label className="input"> 
                                            <i className="icon-append fa fa-calendar"></i>
                                            <DatePicker
                                                showYearDropdown 
                                                dateFormatCalendar="MMMM" 
                                                dateFormat="DD/MM/YYYY"
                                                className="form-control"
                                                placeholderText="Ngày Bắt Đầu"
                                                selected={this.state.startDate}
                                                onChange={this.handleChangeStartDate.bind(this)} />
                                        </label>
                                    </section>
                                    <section className="col col-2">
                                        <label className="input"> 
                                            <i className="icon-append fa fa-calendar"></i>
                                            <DatePicker
                                                showYearDropdown 
                                                dateFormatCalendar="MMMM" 
                                                dateFormat="DD/MM/YYYY"
                                                className="form-control"
                                                placeholderText="Ngày Kết Thúc"
                                                selected={this.state.endDate}
                                                onChange={this.handleChangeEndDate.bind(this)} />
                                        </label>
                                    </section>
                                    <section className="col col-4">
                                        <div className="inline-group">
                                            <label className="checkbox">
                                                <input ref="Completed" type="checkbox" name="completed" defaultChecked="checked"/>
                                                <i></i>Hoàn Thành</label>
                                            <label className="checkbox">
                                                <input ref="UnCompleted" type="checkbox" name="uncompleted" defaultChecked="checked"/>
                                                <i></i>Chưa Hoàn Thành</label>
                                        </div>
                                    </section>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
