import React, {Component} from 'react'

export default class ModalMenu extends Component{
    render() {
        return (
            <div id={this.props.name} className="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="exampleModalLabel">New message</h4>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Send message</button>
                      </div>
                    </div>
                </div>
            </div>
        )
    }
}
