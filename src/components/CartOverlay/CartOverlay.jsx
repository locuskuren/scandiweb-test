import { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactComponent as CartLogo } from '../../assets/cart.svg';
import numberWithCommas from '../../util/numberWithCommas';
import CartItem from '../CartItem/CartItem';

import './CartOverlay.scss';

const mapStateToProps = (state) => {
  const { itemsQuantity, items, totalPrice } = state.cart;
  const { selectedCurrency } = state.currencies;
  return { itemsQuantity, items, totalPrice, selectedCurrency };
};

export class CartOverlay extends Component {
  state = {
    cartIsShown: false,
  };
  cartRef = createRef();
  cartLogoRef = createRef();

  listener = () => {
    return (event) => {
      if (
        this.cartRef.current &&
        this.cartLogoRef.current &&
        event.target &&
        (this.cartRef.current.contains(event.target) ||
          this.cartLogoRef.current.contains(event.target))
      ) {
        return;
      }
      this.setState((state) => {
        return { ...state, cartIsShown: false };
      });
    };
  };

  componentDidMount() {
    document.addEventListener('click', this.listener(), { capture: true });
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.listener(), { capture: true });
  }

  render() {
    const { cartIsShown } = this.state;
    const { itemsQuantity, items, totalPrice, selectedCurrency } = this.props;
    const tax = selectedCurrency
      ? Math.round(
          (totalPrice[selectedCurrency.label] * 0.21 + Number.EPSILON) * 100
        ) / 100
      : 0;

    const totalPriceWithTax = selectedCurrency
      ? totalPrice[selectedCurrency.label] + tax || 0
      : 0;

    return (
      <div className="cart">
        <div
          className="cart-logo"
          ref={this.cartLogoRef}
          onClick={() =>
            this.setState((state) => {
              return {
                ...state,
                cartIsShown: !cartIsShown,
              };
            })
          }
        >
          <CartLogo />
          {itemsQuantity > 0 && <div className="badge"> {itemsQuantity} </div>}
        </div>
        {cartIsShown && (
          <div
            className="cart-overlay-background"
            style={{
              height: `${document.documentElement.scrollHeight - 80}px`,
            }}
          ></div>
        )}
        {cartIsShown && (
          <div className="mini-cart" ref={this.cartRef}>
            <div className="min-details">
              <span>My Bag,</span>{' '}
              {`${itemsQuantity} item${
                itemsQuantity > 1 || itemsQuantity === 0 ? 's' : ''
              }`}
            </div>
            <div className="cart-items">
              {items.map((item, index) => (
                <CartItem item={item} key={item.id + index} mini={true} />
              ))}
            </div>
            <div className="total-price">
              <div className="item">Total</div>
              <div className="item">
                {selectedCurrency.symbol}
                {numberWithCommas(
                  parseFloat(
                    Math.round((totalPriceWithTax + Number.EPSILON) * 100) / 100
                  ).toFixed(2)
                )}
              </div>
            </div>
            <div className="buttons">
              <Link to="/cart">
                <button
                  className="white"
                  onClick={() =>
                    this.setState((state) => {
                      return { ...state, cartIsShown: false };
                    })
                  }
                >
                  VIEW BAG
                </button>
              </Link>
              <Link to="/cart">
                <button
                  className="green"
                  onClick={() =>
                    this.setState((state) => {
                      return { ...state, cartIsShown: false };
                    })
                  }
                >
                  CHECK OUT
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(CartOverlay);
