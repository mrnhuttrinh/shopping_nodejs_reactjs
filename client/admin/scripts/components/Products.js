import React, {Component} from 'react'

class Grid extends Component {
    componentDidMount() {
        $(document).ready(function() {
            $('.superbox').SuperBox();
        });
    }
    render() {
        return (
            <div className="row">
                <div className="superbox col-sm-12">
                    <div className="superbox-list">
                        <img src="img/superbox/superbox-thumb-1.jpg" data-img="img/superbox/superbox-full-1.jpg" alt="My first photoshop layer mask on a high end PSD template theme" title="Miller Cine" className="superbox-img" />
                    </div>
                    <div className="superbox-list">
                        <img src="img/superbox/superbox-thumb-2.jpg" data-img="img/superbox/superbox-full-2.jpg" alt="My first photoshop layer mask on a high end PSD template theme" title="Bridge of Edgen" className="superbox-img" />
                    </div>
                    <div className="superbox-list">
                        <img src="img/superbox/superbox-thumb-3.jpg" data-img="img/superbox/superbox-full-3.jpg" alt="My first photoshop layer mask on a high end PSD template theme" title="Lines of Friendship" className="superbox-img" />
                    </div>
                    <div className="superbox-list">
                        <img src="img/superbox/superbox-thumb-4.jpg" data-img="img/superbox/superbox-full-4.jpg" alt="My first photoshop layer mask on a high end PSD template theme" title="My new car!" className="superbox-img" />
                    </div>
                    <div className="superbox-list">
                        <img src="img/superbox/superbox-thumb-5.jpg" data-img="img/superbox/superbox-full-5.jpg" alt="My first photoshop layer mask on a high end PSD template theme" title="Study Time" className="superbox-img" />
                    </div>
                    <div className="superbox-list">
                        <img src="img/superbox/superbox-thumb-6.jpg" data-img="img/superbox/superbox-full-6.jpg" alt="My first photoshop layer mask on a high end PSD template theme" title="San Francisco Bridge"  className="superbox-img" />
                    </div>
                    <div className="superbox-list">
                        <img src="img/superbox/superbox-thumb-7.jpg" data-img="img/superbox/superbox-full-7.jpg" alt="My first photoshop layer mask on a high end PSD template theme" title="New Styla"  className="superbox-img" />
                    </div>
                    <div className="superbox-list">
                        <img src="img/superbox/superbox-thumb-8.jpg" data-img="img/superbox/superbox-full-8.jpg" alt="My first photoshop layer mask on a high end PSD template theme" title="Cristpta"  className="superbox-img" />
                    </div>
                    <div className="superbox-list">
                        <img src="img/superbox/superbox-thumb-9.jpg" data-img="img/superbox/superbox-full-9.jpg" alt="My first photoshop layer mask on a high end PSD template theme" title="Cristine Dine"  className="superbox-img" />
                    </div>
                    <div className="superbox-list">
                        <img src="img/superbox/superbox-thumb-10.jpg" data-img="img/superbox/superbox-full-10.jpg" alt="My first photoshop layer mask on a high end PSD template theme" title="Mosaic Clock"  className="superbox-img" />
                    </div>
                    <div className="superbox-list">
                        <img src="img/superbox/superbox-thumb-11.jpg" data-img="img/superbox/superbox-full-11.jpg" alt="My first photoshop layer mask on a high end PSD template theme" title="Elegance"  className="superbox-img" />
                    </div>
                    <div className="superbox-list">
                        <img src="img/superbox/superbox-thumb-12.jpg" data-img="img/superbox/superbox-full-12.jpg" alt="My first photoshop layer mask on a high end PSD template theme" title="China Town"  className="superbox-img" />
                    </div>
                    <div className="superbox-list">
                        <img src="img/superbox/superbox-thumb-13.jpg" data-img="img/superbox/superbox-full-13.jpg" alt="My first photoshop layer mask on a high end PSD template theme" title="Sky Diving"  className="superbox-img" />
                    </div>
                    <div className="superbox-list">
                        <img src="img/superbox/superbox-thumb-14.jpg" data-img="img/superbox/superbox-full-14.jpg" alt="My first photoshop layer mask on a high end PSD template theme" title="Country Music"  className="superbox-img" />
                    </div>
                    <div className="superbox-float"></div>
                </div>
                <div className="superbox-show" style={{"height":"300px", "display": "none"}}></div>
            </div>
        )
    }
}

class Table extends Component {
    render() {
        return (
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Mã Sp</th>
                            <th>Tên Sp</th>
                            <th>Đơn Giá</th>
                            <th>Số lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Row 1</td>
                            <td>Row 2</td>
                            <td>Row 3</td>
                            <td>Row 4</td>
                        </tr>
                        <tr>
                            <td>Row 1</td>
                            <td>Row 2</td>
                            <td>Row 3</td>
                            <td>Row 4</td>
                        </tr>
                        <tr>
                            <td>Row 1</td>
                            <td>Row 2</td>
                            <td>Row 3</td>
                            <td>Row 4</td>
                        </tr>
                        <tr>
                            <td>Row 1</td>
                            <td>Row 2</td>
                            <td>Row 3</td>
                            <td>Row 4</td>
                        </tr>
                        <tr>
                            <td>Row 1</td>
                            <td>Row 2</td>
                            <td>Row 3</td>
                            <td>Row 4</td>
                        </tr>
                        <tr>
                            <td>Row 1</td>
                            <td>Row 2</td>
                            <td>Row 3</td>
                            <td>Row 4</td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
        )
    }
}

export default class Products extends Component{
    constructor() {
        super();
        this.state = {
            viewType: "grid"
        };
    }

    _grid(self) {
        self.setState({
            viewType: "grid"
        })
    }

    _table(self) {
        self.setState({
            viewType: "table"
        })
    }

    render() {
        var ViewContent = this.state.viewType == "table" ? Table : Grid;
        return (
            <div id="main" role="main">
                <div id="ribbon">
                    <span className="ribbon-button-alignment"> 
                        <span id="refresh" className="btn btn-ribbon" data-action="resetWidgets" data-title="refresh"  rel="tooltip" data-placement="bottom" data-original-title="<i className='text-warning fa fa-warning'></i> Warning! This will reset all your widget settings." data-html="true">
                            <i className="fa fa-refresh"></i>
                        </span> 
                    </span>
                    <ol className="breadcrumb">
                        <li>Home</li><li>Products</li>
                    </ol>
                </div>
                <div id="content">
                    <div className="row">
                        <div className="btn-group col-sm-12"> 
                            <button onClick={this._grid.bind(null, this)} type="button" className="btn btn-default" aria-label="Left Align">
                                <span className="glyphicon glyphicon-th" aria-hidden="true"></span>
                            </button> 
                            <button onClick={this._table.bind(null, this)} type="button" className="btn btn-default" aria-label="Justify">
                                <span className="glyphicon glyphicon-align-justify" aria-hidden="true"></span>
                            </button> 
                        </div>
                    </div>
                    <ViewContent />
                </div>
            </div>
        )
    }
}