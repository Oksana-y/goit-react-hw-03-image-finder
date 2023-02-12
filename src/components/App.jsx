import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import fetchApi from './Services/fetchApi';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    page: 1,
    search: '',
    images: [],
    isLoading: false,
    error: null,

    // total_pages: 1,
    isOpen: false,
    activeImage: null,
  };

  handleChangeSearch = search => {
    this.setState({ search, page: 1, images: [] });
    console.log(search);
  };

  handleOpenModal = ({ largeImageURL }) => {
    this.setState({ isOpen: true, activeImage: largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ isOpen: false });
  };

  // handleToggleModal = () => {
  //   this.setState(prevState => ({ IsOpen: !prevState.IsOpen }));
  // };

  componentDidMount() {
    const { search, page } = this.state;
    this.setState({ isLoading: true });
    fetchApi(search, page)
      .then(res => {
        this.setState({
          images: res.data.hits,
          // total_pages: Math.ceil(res.data.totalHits / 12),
          // search: this.state.search,
        });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
    console.log(this.state.isOpen);
  }

  componentDidUpdate(_, prevState) {
    // if (prevState.page !== this.state.page) {
    //   this.setState({ isLoading: true });
    //   fetchApi(this.state.search, this.state.page)
    //     .then(res => {
    //       this.setState(prevState => {
    //         return {
    //           images: [...prevState.images, ...res.data.hits],
    //         };
    //       });
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     })
    //     .finally(() => {
    //       this.setState({ isLoading: false });
    //     });
    // }
    console.log(this.state.isOpen);
  }

  //  async fetchImage(){
  //  try {
  //   this.setState({ isLoading: true });
  //   const { search, page } = this.state;
  //   const res = await fetchApi(search, page);
  //  (prevState => ({
  //   images: [...prevState.images, ...res.data.hits],
  //   total_pages: res.data.total_pages,
  // }))

  //  } catch (error) {
  //   this.setState({ error: error.message })
  //   }finally{
  //     this.setState({ isLoading: false })

  // }}

  handleLoadMore = e => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    // const isShowButton = this. state.images.length > 0 && !isLoading;
    // const { images, isLoading, IsOpen, activeImage } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleChangeSearch} />
        {this.state.isLoading && <Loader />}
        <ImageGallery
          images={this.state.images}
          onOpenModal={this.handleOpenModal}
        />
        {/* {isShowButton ? <Button onClick={this.handleLoadMore}/> : null} */}
        {this.state.images.length > 0 && (
          <Button onClick={this.handleLoadMore}>Load More</Button>
        )}

        {this.state.isOpen && (
          <Modal
            activeImage={this.state.activeImage}
            onCloseModal={this.handleCloseModal}
          />
        )}
      </>
    );
  }
}
