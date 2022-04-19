import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      isSaveButtonDisable: true,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    const minLength = 2;
    this.setState({
      [name]: value,
    });
    const activeButton = value.length >= minLength;
    if (activeButton) {
      this.setState({ isSaveButtonDisable: false });
    } else {
      this.setState({ isSaveButtonDisable: true });
    }
  }

  render() {
    const {
      isSaveButtonDisable,
      artist,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <input
          data-testid="search-artist-input"
          label="search-artist-input"
          type="text"
          name="artist"
          value={ artist }
          placeholder="Nome do Artista"
          onChange={ this.onInputChange }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          name="button-search"
          disabled={ isSaveButtonDisable }
          onChange={ this.onSaveButtonClick }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
