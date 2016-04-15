import React, {Component} from 'react'

export default class NotFound extends Component{
    render() {
        return (
            <div>
                <div className="not-found">
                    <div className="info-label">
                        <div className="error">
                            <h2>
                                404
                            </h2>
                        </div>
                    </div>
                    <div className="info-text">
                        <h1>
                            Trang Không Tồn Tại
                        </h1>
                        <p>
                            <h6>Đi đâu mà vội mà vàng</h6>
                            <h6>Mà vấp phải đá mà quàng phải dây</h6>
                            <h6>Thong thả như chúng em đây</h6>
                            <h6>Thì đá chẳng vấp mà dây chẳng quàng</h6>
                            <h6>Đi đâu mà vội công danh</h6>
                            <h6>Khoa này chẳng được, để dành khoa sau</h6>
                            <h6>Đi đâu mà vội phong trần</h6>
                            <h6>Sớm khuya cũng có một lần mà thôi</h6>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}