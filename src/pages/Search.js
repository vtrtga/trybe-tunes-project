import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    buttonIsDisabled: true,
    searchInput: '',
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

  handleSearchOnclick = () => {

  }

  render() {
    const { buttonIsDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="searchInput">
          <input
            name="searchInput"
            onChange={ this.handleSearchOnChange }
            data-testid="search-artist-input"
          />
        </label>
        <button
          onClick={ this.handleSearchOnclick }
          disabled={ buttonIsDisabled }
          type="button"
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </div>
    );
  }
}
