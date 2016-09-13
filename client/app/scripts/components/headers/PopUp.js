import React, {Component} from 'react';

export default class PopUpWarn extends Component {
    turnOffShowOnTop(event) {
        document.body.style.overflowY = "visible";
        event.preventDefault();
        if (this.props.turnOffShowOnTop) {
            this.props.turnOffShowOnTop();
        }
    }
    componentWillMount() {
        document.body.style.overflowY = "hidden";
    }
    render() {
        if (this.props.show) {
            return (
                <div className="popup_parent_warning">
                    <div 
                        className="popup-warning ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable" 
                        tabindex="-1" 
                        role="dialog" 
                        aria-describedby="ui-id-3" 
                        aria-labelledby="ui-id-4">
                        <div className="popup_brand ui-dialog-content ui-widget-content">
                            <span onClick={this.turnOffShowOnTop.bind(this)} className="cursor-pointer button_close_popup"></span>
                            <div className="popup_brand_top">
                                <img className="logo_pop" alt="Áo Thun Phong Cách" src="/images/logo_main.png" width="163" height="34" />
                            </div>
                            <div className="popup_co">
                                <p className="txt_center">Đăng Xuất</p>
                                <p className="list_btn_pop">
                                    <button onClick={this.turnOffShowOnTop.bind(this)} type="button" className="btn_brand" >Đồng ý</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}
