import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const person = await getUser();
    this.setState({
      user: person,
      loading: false,
    });
  }

  render() {
    const {
      user,
      loading,
    } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <header data-testid="header-component">
        { loading ? <Loading />
          : <h4 data-testid="header-user-name">{user.name}</h4>}
      </header>
    );
  }
}

export default Header;
