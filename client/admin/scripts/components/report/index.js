import React, {Component} from 'react';
import _ from 'lodash';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import orderAPI from '../../apis/order';

export default class Report extends Component{
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment().subtract(1, "days"),
            endDate: moment()
        }
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
        var startDate = this.state.startDate;
        var endDate = this.state.endDate;
        var Completed = this.refs["Completed"].checked;
        var UnCompleted = this.refs["UnCompleted"].checked;

        var data = {
            date_stard: startDate,
            date_end: endDate,
            completed: Completed,
            un_completed: UnCompleted
        };
    }
    render() {
        return this.renderFilter();
    }
    renderFilter() {
        return (
            <div className="jarviswidget" id="wid-id-3" data-widget-editbutton="false" data-widget-custombutton="false">
                <header>
                    <span className="widget-icon"> 
                        <i className="fa fa-edit"></i> 
                    </span>
                    <h2>Thống Kê</h2>
                </header>
                <div>
                    <div className="widget-body no-padding">
                        <form id="order-form" className="smart-form" noValidate="novalidate">
                            <header>
                                Tìm Kiếm
                                <a id="click_search" onClick={this._onSearch.bind(this)} className="pull-right btn btn-primary btn-sm">Tìm Kiếm</a>
                            </header>
                            <fieldset>
                                <div className="row">
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