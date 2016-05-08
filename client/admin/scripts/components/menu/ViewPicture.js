import React, {Component} from 'react'
import apis from '../../apis/menu';
import ButtonLoading from '../ButtonLoading';

export default class ViewPicture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deletingData: false
        }
    }
    DeletePicture(_image , event) {
        event.preventDefault();
        var self = this;
        self.setState({
            deletingData: !self.state.deletingData
        })
        apis.deleteGalleryMenu(_image.id, function(err, res) {
            if (err) {
                toastr.error("Xóa Hình Ảnh Không Thành Công!");
            } else {
                self.props.deleteGallery(_image);
                toastr.success("Xóa Hình Ảnh Thành Công!");
            }
            self.setState({
                deletingData: !self.state.deletingData
            })
        })
    }
    render() {
        return (
            <tr>
                <td width="30px">
                    {this.props.indexCount}
                </td>
                <td>
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title">
                                {"Link"} Liên Kết: <a target="_blank" href={this.props.image.link}>{this.props.image.link}</a>
                            </h3>
                        </div>
                        <div className="panel-body banner_home ">
                            <a target="_blank" href={this.props.image.link}>
                                <img className="banner_home" src={this.props.image.image} alt={this.props.image.link} />
                            </a>
                        </div>
                        <div className="panel-footer">
                            <div className="row">
                                <div className="col-md-12">
                                {
                                    this.state.deletingData ? (
                                        <ButtonLoading classCSS="pull-right"/>
                                    ) : (
                                        <button onClick={this.DeletePicture.bind(this, this.props.image)} type="button" className="btn btn-danger pull-right">Xóa</button>
                                    )
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }
}