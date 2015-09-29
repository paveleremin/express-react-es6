import React from 'react';

import CustomLink from './user-details-link';

export default React.createClass({
    render() {
        const friends = this.props.friends;

        if (!friends || !friends.count) {
            return false;
        }

        const renderOthers = (friends) => {
            if (friends.count <= friends.items.length) {
                return '';
            }
            return <li className="friends-others">
                <div>
                    and<br/>
                    { friends.count-friends.items.length }<br/>
                    others
                </div>
            </li>;
        };

        return <div>
            <h3>
                Friends
            </h3>
            <ul className="list-inline">
                { friends.items.map((user) =>
                    <li key={ user.id }>
                        <CustomLink to={ `/users/${user.id}` } params={ user }>
                            <img
                                src={ user.photo_50 }
                                className="img-responsive"
                                alt=""/>
                        </CustomLink>
                    </li>
                ) }
                { renderOthers(friends) }
            </ul>
        </div>;
    }
});
