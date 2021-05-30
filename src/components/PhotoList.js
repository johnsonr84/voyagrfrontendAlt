import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openUploadWidget } from '../utils/CloudinaryService';
import { photosUploaded } from '../actions';
import { CloudinaryContext } from 'cloudinary-react';


class PhotoList extends Component {
    render() {
        return (
            <div className="photoList">
                <div className="actions">
                    <div
                        className="upload_link"
                        onClick={this.uploadImageWithCloudinary.bind(this)}
                    >
                        Upload Images
                    </div>
                </div>
            </div>
        );
    }

    uploadImageWithCloudinary() {
        const uploadOptions = { tags: ['myphotoalbum'], ...this.context };
        console.log(uploadOptions);

        openUploadWidget(uploadOptions, (error, result) => {
            if (!error) {
                const { event, info } = result;
                if (event === "success") {
                    this.props.onPhotosUploaded([info]);

                    this.props.setImage(prevState => [...prevState, info.secure_url])
                    console.log(result)
                }
            } else {
                console.log(error);
            }
        });
    }
}

PhotoList.contextType = CloudinaryContext.contextType;

PhotoList.propTypes = {
    photos: PropTypes.array,
    onPhotosUploaded: PropTypes.func,
};

const PhotoListContainer = connect(
    state => ({ photos: state.photos }),
    {
        onPhotosUploaded: photosUploaded,
    }
)(PhotoList);

export default PhotoListContainer;
