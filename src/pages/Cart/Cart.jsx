import { Component } from 'react';
import { connect } from 'react-redux';
import CartItem from '../../components/CartItem/CartItem';
import numberWithCommas from '../../util/numberWithCommas';

import './Cart.scss';

const mapStateToProps = (state) => {
  const { items, itemsQuantity, totalPrice } = state.cart;
  const { selectedCurrency } = state.currencies;
  return { items, itemsQuantity, selectedCurrency, totalPrice };
};

export class Cart extends Component {
  render() {
    const { items, itemsQuantity, selectedCurrency, totalPrice } = this.props;
    const tax = selectedCurrency
      ? Math.round(
          (totalPrice[selectedCurrency.label] * 0.21 + Number.EPSILON) * 100
        ) / 100 || 0
      : 0;

    return (
      <div className="cart-page">
        <div className="content">
          <h1>CART</h1>
          <div className="cart-items-list">
            {items.length === 0 && (
              <div>You don't have any items in the cart</div>
            )}
            {items.length > 0 && <div className="line"></div>}
            {items.map((item, index) => (
              <div key={item.id + index}>
                <CartItem item={item} />
                <div className="line"></div>
              </div>
            ))}
          </div>
          <div className="order-details">
            <div className="items">
              <div className="detail">Tax 21%:</div>
              <div className="detail">Quantity:</div>
              <div className="detail">Total:</div>
            </div>
            <div className="items">
              <div className="detail bold">
                {selectedCurrency && selectedCurrency.symbol}
                {numberWithCommas(parseFloat(tax).toFixed(2))}
              </div>
              <div className="detail bold">{itemsQuantity}</div>
              <div className="detail bold">
                {selectedCurrency && selectedCurrency.symbol}
                {numberWithCommas(
                  parseFloat(totalPrice[selectedCurrency.label] || 0).toFixed(2)
                )}
              </div>
            </div>
          </div>
          <button className="order-button">ORDER</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Cart);
