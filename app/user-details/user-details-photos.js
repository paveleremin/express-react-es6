import React from 'react';

import ImgBackground from './user-details-photos-bg';

export default React.createClass({
    render() {
        const photos = this.props.photos;

        if (!photos || !photos.count) {
            return false;
        }

        const onLoad = (index) => {
            if (index === false) {
                return;
            }

            const li = document.querySelectorAll('.photos li')[index];
            const bg = new ImgBackground(li);
            bg.setBackgroud();
        };

        return <div>
            <h3>
                Photos
            </h3>
            <ul className="photos">
                { photos.items.map((photo, index) => {
                    return photo.sizes.map((size) => {
                        if (size.type == 'm') {
                            const photoIndex = size.width != 130 || size.height != 130
                                ? index
                                : false;
                            return <li key={ photo.id }>
                                <img onLoad={ onLoad.bind(null, photoIndex) } src={ size.src } alt=""/>
                            </li>;
                        }
                    });
                }) }
            </ul>
        </div>;
    }
});
