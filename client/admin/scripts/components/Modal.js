import React, {Component} from 'react'

export default class Modal extends Component {
    componentWillUnmount() {
        $(this.refs["closeModal"]).click();
    }
    render() {
        var modalName = this.props.modalName;
        var modalTitle = this.props.modalTitle;
        var modalContent = this.props.modalContent;
        var modalExcute = this.props.modalExcute;
        return (
            <div aria-labelledby="myModalLabel" className="modal fade" id={modalName} role="dialog" tabindex="-1">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button aria-label="Close" className="close" data-dismiss="modal" type="button">
                                <span aria-hidden="true">
                                    ×
                                </span>
                            </button>
                            <h4 className="modal-title" id="myModalLabel">
                                {modalTitle}
                            </h4>
                        </div>
                        <div className="modal-body">
                            {modalContent}
                        </div>
                        <div className="modal-footer">
                            <button ref="closeModal" className="btn btn-default" data-dismiss="modal" type="button">
                                Close
                            </button>
                            <button onClick={modalExcute} className="btn btn-primary" type="button">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}