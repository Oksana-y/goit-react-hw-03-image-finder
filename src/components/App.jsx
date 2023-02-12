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
    isOpen: false,
    activeImage: null,
  };

  handleSubmitForm = search => {
    this.setState({ search, page: 1 });
  };

  handleOpenModal = largeImageURL => {
    this.setState({ isOpen: true, activeImage: largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ isOpen: false });
  };

  componentDidMount() {
    const { search, page } = this.state;
    this.setState({ isLoading: true });
    fetchApi(search, page)
      .then(res => {
        this.setState({
          images: res.data.hits,
        });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
    
  }

  componentDidUpdate(_, prevState) {
    if (prevState.page !== this.state.page) {
      this.setState({ isLoading: true });
      fetchApi(this.state.search, this.state.page)
        .then(res => {
          this.setState(prevState => {
            return {
              images: [...prevState.images, ...res.data.hits],
            };
          });
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
    if (prevState.search !== this.state.search) {
      this.setState({ isLoading: true });
      fetchApi(this.state.search, this.state.page)
        .then(res => {
          this.setState(prevState => {
            return {
              images: [...res.data.hits],
            };
          });
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleLoadMore = e => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmitForm} />
        {this.state.isLoading && <Loader />}
        <ImageGallery
          images={this.state.images}
          onOpenModal={this.handleOpenModal}
        />

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
