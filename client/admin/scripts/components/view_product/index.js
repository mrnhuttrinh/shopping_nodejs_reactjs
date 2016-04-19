import React, {Component} from 'react'

export default class ViewProduct extends Component{
    changePhoto(event) {
        event.preventDefault();
        var self = this;
        var inputPhoto = self.refs["exampleInputFile"];
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            console.log('The File APIs are not fully supported in this browser.');
            return;
        } 
        var file = $(inputPhoto)[0].files[0];
        if (checkfileimage(file)) {
            var fr = new FileReader();
            fr.onload = function() {
                // fr.result is base-64
                // console.log(fr.result);
                apis.updateEmployerPhoto(fr.result, function(err, res) {
                    if (err) {

                    } else {
                        var user = _.cloneDeep(self.props.user);
                        user.image = fr.result;
                        $(inputPhoto).val("");
                        self.props.signIn(user);
                    }
                })
            }
            fr.readAsDataURL(file);
        } else {
            $(inputPhoto).val("");
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="carousel profile-carousel" id="myCarousel">
                        <div className="carousel-inner">
                            <div className="item active">
                                <img style={{"width": "100%"}} alt="demo user" src="img/clothes.jpg">
                                </img>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-4 profile-pic">
                            <div className="col-sm-3 profile-pic" style={{"width": "100%"}}>
                                <img src="" alt="Ảnh Đại Diện" style={{"maxWidth": "100%","width": "250px", "height": "250px", "top": "-100px"}}/>
                                <div style={{"marginTop": "-60px", "marginLeft": "70px"}} className="padding-10">
                                    <input type="file" onChange={this.changePhoto.bind(this)} id="exampleInputFile" ref="exampleInputFile" />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <h1>
                                Thông Tin
                            </h1>
                            <table className="table table-bordered table-striped" id="user">
                                <tbody>
                                    <tr>
                                        <td style={{"width": "50%"}}>
                                            Loại Sản Phẩm
                                        </td>
                                        <td style={{"width": "50%"}}>
                                            Loại Sản Phẩm
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Tên
                                        </td>
                                        <td>
                                            Tên
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Mã (code)
                                        </td>
                                        <td>
                                            Mã (code)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Giá Bán Lẻ
                                        </td>
                                        <td>
                                            Giá Bán Lẻ
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Giá Bán Lẻ Khuyến Mãi
                                        </td>
                                        <td>
                                            Giá Bán Lẻ Khuyến Mãi
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Giá Bán Sỉ
                                        </td>
                                        <td>
                                            Giá Bán Sỉ
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Giá Bán Sỉ Khuyến Mãi
                                        </td>
                                        <td>
                                            Giá Bán Sỉ Khuyến Mãi
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Tổng Số Lượng
                                        </td>
                                        <td>
                                            Tổng Số Lượng
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Số Lượng Size S
                                        </td>
                                        <td>
                                            Số Lượng Size S
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Số Lượng Size M
                                        </td>
                                        <td>
                                            Số Lượng Size M
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Số Lượng Size X
                                        </td>
                                        <td>
                                            Số Lượng Size X
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Màu Sắc
                                        </td>
                                        <td>
                                            Màu Sắc
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Thương Hiệu
                                        </td>
                                        <td>
                                            Thương Hiệu
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Mô Tả Chi Tiết
                                        </td>
                                        <td>
                                            Mô Tả Chi Tiết
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
