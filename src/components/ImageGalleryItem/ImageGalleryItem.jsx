import css from './image-gallery-Item.module.scss';

const ImageGalleryItem = ({ image, onClick }) => {
  const { webformatURL, largeImageURL, tags } = image;

  return (
    <li
      onClick={() => {
        onClick(largeImageURL);
      }}
      className={css.item}
    >
      <img className={css.image} src={webformatURL} alt={tags} width="150px" />
    </li>
  );
};

export default ImageGalleryItem;
