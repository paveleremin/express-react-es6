import React from 'react';
import { Link } from 'react-router';

export default class extends Link {
    render() {
        let className = null;
        const props = this.props;
        if (this.context.history.isActive(props.to, props.query, props.onlyActiveOnIndex)) {
            className = props.activeClassName;
        }
        return <li className={ className }>
            { super.render() }
        </li>;
    }
}
