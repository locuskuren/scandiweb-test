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

  render() {
    const { id, brand, name, inStock, prices, gallery, attributes } =
      this.props.product;
    const selectedCurrency = this.props.selectedCurrency;
    const { addToCartVisible } = this.state;
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
        {addToCartVisible && attributes.length === 0 && inStock && (
          <CartInCircle
            className="add-to-cart"
            onClick={() =>
              this.props.dispatch(
                addToCart({ ...this.props.product, quantity: 1 })
              )
            }
          />
        )}
        <Link to={`/product/${id}`}>
          <div
            style={{ backgroundImage: `url(${gallery[0]})` }}
            alt={`${brand} ${name}`}
            className={`product-image`}
          >
            {inStock ? '' : 'OUT OF STOCK'}
          </div>
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
