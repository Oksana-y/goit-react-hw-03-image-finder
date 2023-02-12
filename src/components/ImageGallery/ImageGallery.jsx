import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './image-gallery.module.scss';

const ImageGallery = ({ images, onOpenModal }) => {
   if (images.length === 0) {
    return null;
  }
  return (
    <ul className={css.gallery}>
      {images.map(image => (
        <ImageGalleryItem key={nanoid()} image={image} onClick={onOpenModal} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;
