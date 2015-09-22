import React from 'react';

export default React.createClass({
    render() {
        return <div id="footer">
            <div className="container">
                <div className="row">
                    <div className="col-xs-6">
                        &copy; App
                    </div>
                    <div className="col-xs-6 text-rigth small">
                        <a href="https://github.com/paveleremin/express-react-es6" target="_blank">
                            github.com/paveleremin/express-react-es6
                        </a>
                    </div>
                </div>
            </div>
        </div>;
    }
});
