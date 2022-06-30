import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCategories } from '../../redux/categories';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import './Header.scss';
import Currencies from '../Currencies/Currencies';
import CartOverlay from '../CartOverlay/CartOverlay';

const mapStateToProps = (state) => {
  const { categories } = state.categories;
  return { categories };
};

export class Header extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCategories());
  }

  render() {
    const { categories } = this.props;

    return (
      <div className="header">
        <div className="content">
          <nav>
            {categories &&
              categories.map(({ name }) =>
                name === 'all' ? (
                  <NavLink exact to="/" key={name}>
                    {name.toUpperCase()}
                  </NavLink>
                ) : (
                  <NavLink to={`/${name}`} key={name}>
                    {name.toUpperCase()}
                  </NavLink>
                )
              )}
          </nav>
          <div className="logo">
            <Logo />
          </div>
          <div className="actions">
            <Currencies />
            <CartOverlay />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Header);
