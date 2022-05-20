import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    buttonIsDisabled: true,
    searchInput: '',
    loading: false,
    albunsList: [],
    searched: '',
  }

  handleSearchOnChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value },
      () => this.validateSearch());
  }

  validateSearch = () => {
    const { searchInput } = this.state;
    const minLength = 2;
    if (searchInput.length >= minLength) {
      return this.setState({ buttonIsDisabled: false });
    }
    return this.setState({ buttonIsDisabled: true });
  }

  handleSearchOnClick = async () => {
    const { searchInput } = this.state;
    this.setState({ loading: true,
      searched: searchInput,
      searchInput: '' });
    const getApi = await searchAlbumsAPI(searchInput);
    this.setState(({ albunsList: getApi,
      loading: false }));
  }

  render() {
    const { buttonIsDisabled, albunsList, loading, searchInput, searched } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="searchInput">
          <input
            name="searchInput"
            value={ searchInput }
            onChange={ this.handleSearchOnChange }
            data-testid="search-artist-input"
          />
        </label>
        <button
          onClick={ this.handleSearchOnClick }
          disabled={ buttonIsDisabled }
          type="button"
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
        <section>
          {
            albunsList.length === 0 && (<p>Nenhum álbum foi encontrado</p>)
          }
          {
            albunsList.length > 0 && (<p>{`Resultado de álbuns de: ${searched}`}</p>)
          }
          {
            loading ? (<p>Carregando...</p>)
              : albunsList.map((album) => (
                <div key={ album.collectionId }>
                  <img alt={ album.collectionName } src={ album.artworkUrl100 } />
                  <p>{ album.artistName }</p>
                  <p>{ album.collectionName }</p>
                  <p>{ album.collectionPrice }</p>
                  <Link
                    data-testid={ `link-to-album-${album.collectionId}` }
                    to={ `/album/${album.collectionId}` }
                  >
                    Album

                  </Link>
                </div>
              ))
          }

        </section>
      </div>
    );
  }
}
