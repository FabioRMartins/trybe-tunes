import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      isSaveButtonDisable: true,
      artistFound: '',
      loadingSearch: false,
      result: [],
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

  searchButton = async () => {
    const { artist } = this.state;
    this.setState({
      loadingSearch: true,
    });
    const expect = await searchAlbumsAPI(artist);
    this.setState({
      artist: '',
      artistFound: artist,
      loadingSearch: false,
      result: [...expect],
    });
  }

  render() {
    const {
      isSaveButtonDisable,
      artist,
      loadingSearch,
      artistFound,
      result,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {loadingSearch ? <Loading /> : (
          <form>
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
              onClick={ this.searchButton }
            >
              Pesquisar
            </button>
          </form>)}
        <div>
          {result.length > 0 && (
            <p>
              { `Resultado de álbuns de: ${artistFound}` }
            </p>
          )}
          {result.map((element) => (
            <Link
              to={ `/album/${element.collectionId}` }
              data-testid={ `link-to-album-${element.collectionId}` }
              key={ element.collectionId }
            >
              <img
                src={ element.artworkUrl100 }
                alt={ `Album ${element.collectionName}` }
              />
              <p>{element.collectionName}</p>
              <p>{ element.artistName }</p>
            </Link>
          ))}
          {(result.length < 1 && artistFound.length > 0)
          && (
            <div>
              <p>Nenhum álbum foi encontrado</p>
            </div>)}
        </div>
      </div>
    );
  }
}

export default Search;
