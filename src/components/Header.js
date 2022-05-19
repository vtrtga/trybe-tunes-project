import React, { Component } from 'react';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    user: '',
    loading: true,
  }

  async componentDidMount() {
    const getApi = await getUser();
    this.setState({
      user: getApi.name,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="header-component">
        { loading ? (<p>Carregando...</p>)
          : (<p data-testid="header-user-name">{ user }</p>)}
        header
      </div>
    );
  }
}
