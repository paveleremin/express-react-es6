import React from 'react';
import { Link } from 'react-router';

export default class extends Link {
    render() {
        const props = this.props;

        const className = [];
        if (props.className) {
            className.push(props.className);
        }

        if (this.context.history.isActive(props.to, props.query, props.onlyActiveOnIndex)) {
            className.push(props.activeClassName);
        }

        return <li className={ className.join(' ') }>
            { super.render() }
        </li>;
    }
}
