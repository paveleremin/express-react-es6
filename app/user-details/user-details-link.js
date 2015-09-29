import React from 'react';
import { Link } from 'react-router';

export default class extends Link {
    handleDisabledClick(e) {
        e.preventDefault();
    }

    render() {
        if (this.props.params.deactivated) {
            return <a href="#" onClick={ this.handleDisabledClick } className="disabled">
                { this.props.children }
            </a>;
        }
        return super.render();
    }
}
