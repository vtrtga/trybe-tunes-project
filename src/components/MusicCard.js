import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
    state = {
      checked: false,
      loading: false,
    }

    componentDidMount() {
      const { getFavorites } = this.props;
      this.setState({
        checked: getFavorites,
      });
    }

  getFavoriteApi = async ({ target }) => {
    const { checked } = target;
    const { obj } = this.props;
    this.setState({ loading: true, checked });
    await addSong(obj);
    this.setState({ loading: false });
  }

  render() {
    const { track, trackId } = this.props;
    const { checked, loading } = this.state;
    return (
      <div>
        <audio data-testid="audio-component" src={ track } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        {loading ? <p>Carregando...</p>
          : (
            <label htmlFor="favorita">
              Favorita

              <input
                name="favorita"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.getFavoriteApi }
                type="checkbox"
                checked={ checked }
              />
            </label>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.string.isRequired,
  obj: PropTypes.shape({
    trackId: PropTypes.string,
  }).isRequired,
  trackId: PropTypes.string.isRequired,
  getFavorites: PropTypes.bool.isRequired,
};
