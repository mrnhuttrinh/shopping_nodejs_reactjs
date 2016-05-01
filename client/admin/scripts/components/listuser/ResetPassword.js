import React, {Component} from 'react'
import apis from '../../apis/main'
import _ from 'lodash'

export default class ResetPassword extends Component{
    resetPasswordClick(event) {
        event.preventDefault();
        var self = this;
        var password = this.refs["employerPassword"].value;
        if (_.isEmpty(password)) {
            toastr.warning("Mật Khẩu Không Được Để Trống!")
            return;
        }
        apis.resetPassword({
            id: this.props.user.id,
            password: password
        }, function(err, res) {
            if (err) {
                toastr.error("Reset Mật Khẩu Không Thành Công!")
            } else {
                toastr.success("Reset Mật Khẩu Thành Công!")
                $(self.refs["cancelResetPassword"]).click();
            }
        })
    }
    render() {
        return (
            <div className="modal fade" id="resetPasswordModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button aria-label="Close" className="close" data-dismiss="modal" type="button">
                                <span aria-hidden="true">
                                    ×
                                </span>
                            </button>
                            <h4 className="modal-title">
                                Reset Password: {this.props.user.username}
                            </h4>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <form className="form-horizontal">
                                        <div className="form-group">
                                            <label className="col-sm-2 control-label" for="employerPassword">
                                                Mật Khẩu
                                            </label>
                                            <div className="col-sm-10">
                                                <input className="form-control" ref="employerPassword" id="employerPassword" placeholder="Mật Khẩu" type="text">
                                                </input>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref="cancelResetPassword" className="btn btn-default" data-dismiss="modal" type="button">
                                Hủy
                            </button>
                            <button onClick={this.resetPasswordClick.bind(this)} className="btn btn-primary" type="button">
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}