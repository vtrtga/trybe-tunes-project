import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    loading: true,
    artistName: '',
    albumName: '',
    filteredAlbum: [],
  }

  componentDidMount() {
    this.getMusicApi();
  }

  getMusicApi = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState(({
      artistName: musics[0].artistName,
      albumName: musics[0].collectionName,
      loading: false,
      filteredAlbum: musics.filter((item) => Object.keys(item).includes('previewUrl')),
    }));
  };

  render() {
    const { loading, artistName, albumName, filteredAlbum } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">
          { artistName }
        </h2>
        <h2 data-testid="album-name">
          { albumName }
        </h2>

        {
          loading ? (<p>Carregando...</p>)
            : filteredAlbum.map((music) => (
              <h4 key={ music.trackId }>
                <img src={ music.artworkUrl100 } alt="imagem-do-disco" />
                <p>{music.trackName}</p>
                <MusicCard
                  obj={ filteredAlbum }
                  trackId={ music.trackId }
                  track={ music.previewUrl }
                />
              </h4>
            ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
