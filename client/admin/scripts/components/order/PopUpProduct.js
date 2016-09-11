import React, {Component} from 'react';
import _ from 'lodash';
import Modal from '../Modal';

export default class PopUpProduct extends Component {
    componentDidUpdate() {
        if (this.props.listProduct.length) {
            $('#listProduct').modal('show');
        }
    }
    render() {
        return (
            <Modal ref="modalListProduct"
                modalName={"listProduct"}
                modalTitle={"Chọn Sản Phẩm"}>
                <div className="row">
                    <div className="col-md-12">
                        <p>Hình Ảnh Sản Phẩm</p>
                        <div>
                            aaaaaaaaaaaaaaaaaa
                        </div> 
                        <br />
                    </div>
                </div>
            </Modal>
        );
    }
}