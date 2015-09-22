﻿import React from 'react';
import {Link} from 'react-router';

class CustomLink extends Link {
    render(){
        let className = null,
            props = this.props;
        if (this.context.router.isActive(props.to, props.params, props.all)) {
            className = props.activeClassName;
        }
        return (
            <li className={className}>
                {super.render()}
            </li>
        );
    }
}

export default CustomLink;
