import React, {Component} from 'react';

export default class PopUpWarn extends Component {
    render() {
        return (
            <div className="popup_news">
                <div className="popup_news_inside">
                    <span className="cursor-pointer button_close_popup"></span>
                    <div 
                        className="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable" 
                        tabindex="-1" 
                        role="dialog" 
                        aria-describedby="ui-id-3" 
                        aria-labelledby="ui-id-4">
                        <div 
                            className="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix ui-draggable-handle">
                            <span id="ui-id-4" className="ui-dialog-title">&nbsp;</span>
                            <button 
                                type="button" 
                                className="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close" 
                                role="button" 
                                title="Close">
                                <span className="ui-button-icon-primary ui-icon ui-icon-closethick"></span>
                                <span className="ui-button-text">Close</span>
                            </button>
                        </div>
                        <div className="popup_brand ui-dialog-content ui-widget-content">
                            <div className="popup_brand_top">
                                <span className="logo_pop"></span>
                            </div>
                            <div className="popup_co">
                                <p className="txt_center">Vui lòng chọn số lượng.</p>
                                <p className="list_btn_pop">
                                    <button type="button" className="btn_brand" >Đồng ý</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
