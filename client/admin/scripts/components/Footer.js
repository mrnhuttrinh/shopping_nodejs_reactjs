import React, {Component} from 'react'
export default class Footer extends Component {
    render() {
        return (
            <div className="page-footer">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <span className="txt-color-white">SmartAdmin WebApp © 2013-2014</span>
                    </div>

                    <div className="col-xs-6 col-sm-6 text-right hidden-xs">
                        <div className="txt-color-white inline-block">
                            <i className="txt-color-blueLight hidden-mobile">Last account activity <i className="fa fa-clock-o"></i> <strong>52 mins ago &nbsp;</strong> </i>
                            <div className="btn-group dropup">
                                <button className="btn btn-xs dropdown-toggle bg-color-blue txt-color-white" data-toggle="dropdown">
                                    <i className="fa fa-link"></i> <span className="caret"></span>
                                </button>
                                <ul className="dropdown-menu pull-right text-left">
                                    <li>
                                        <div className="padding-5">
                                            <p className="txt-color-darken font-sm no-margin">Download Progress</p>
                                            <div className="progress progress-micro no-margin">
                                                <div className="progress-bar progress-bar-success"></div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="divider"></li>
                                    <li>
                                        <div className="padding-5">
                                            <p className="txt-color-darken font-sm no-margin">Server Load</p>
                                            <div className="progress progress-micro no-margin">
                                                <div className="progress-bar progress-bar-success"></div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="divider"></li>
                                    <li>
                                        <div className="padding-5">
                                            <p className="txt-color-darken font-sm no-margin">Memory Load <span className="text-danger">*critical*</span></p>
                                            <div className="progress progress-micro no-margin">
                                                <div className="progress-bar progress-bar-danger"></div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="divider"></li>
                                    <li>
                                        <div className="padding-5">
                                            <button className="btn btn-block btn-default">refresh</button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}