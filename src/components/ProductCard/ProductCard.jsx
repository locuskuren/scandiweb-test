import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactComponent as CartInCircle } from '../../assets/cartInCircle.svg';
import { addToCart } from '../../redux/cart';
import numberWithCommas from '../../util/numberWithCommas';

import './ProductCard.scss';

const mapStateToProps = (state) => {
  const { selectedCurrency } = state.currencies;
  return { selectedCurrency };
};

export class ProductCard extends Component {
  state = {
    addToCartVisible: false,
  };

  handleClick = () => {
    const selectedAttributes = {};
    this.props.product.attributes.forEach(
      (attribute) => (selectedAttributes[attribute.id] = attribute.items[0].id)
    );
    this.props.dispatch(
      addToCart({ ...this.props.product, selectedAttributes, quantity: 1 })
    );
  };

  render() {
    const { id, brand, name, inStock, prices, gallery } = this.props.product;
    const { addToCartVisible } = this.state;
    const selectedCurrency = this.props.selectedCurrency;
    const currencyIndex = prices.findIndex(
      (price) => price.currency.label === selectedCurrency.label
    );

    return (
      <div
        className={`product-card ${inStock ? '' : 'out-of-stock'}`}
        onMouseEnter={() =>
          this.setState((state) => {
            return { ...state, addToCartVisible: true };
          })
        }
        onMouseLeave={() =>
          this.setState((state) => {
            return { ...state, addToCartVisible: false };
          })
        }
      >
        {inStock && addToCartVisible && (
          <CartInCircle className="add-to-cart" onClick={this.handleClick} />
        )}
        <Link to={`/product/${id}`}>
          <img
            src={gallery[0]}
            alt={`${brand} ${name}`}
            className="product-image"
          />
          {!inStock && <div className="out-of-stock-text">OUT OF STOCK</div>}
          <div className="product-name">
            {brand} {name}
          </div>
          <div className="price">
            {prices[currencyIndex].currency.symbol}{' '}
            {numberWithCommas(
              parseFloat(prices[currencyIndex].amount).toFixed(2)
            )}
          </div>
        </Link>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProductCard);
