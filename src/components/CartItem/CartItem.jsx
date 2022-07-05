import { Component } from 'react';
import ProductDetailsName from '../ProductDetailsName/ProductDetailsName';
import ProductDetailsPrice from '../ProductDetailsPrice/ProductDetailsPrice';
import ProductDetailsAttributes from '../ProductDetailsAttribute/ProductDetailsAttribute';
import { decreaseQuantity, increaseQuantity } from '../../redux/cart';

import './CartItem.scss';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { selectedCurrency } = state.currencies;
  return { selectedCurrency };
};

export class CartItem extends Component {
  state = {
    selectedImageIndex: 0,
  };

  changeImage = (type) => {
    const newIndex = () => {
      if (type === 'next') {
        let index =
          this.state.selectedImageIndex + 1 <=
          this.props.item.gallery.length - 1
            ? this.state.selectedImageIndex + 1
            : 0;
        return index;
      }
      if (type === 'previous') {
        let index =
          this.state.selectedImageIndex - 1 >= 0
            ? this.state.selectedImageIndex - 1
            : this.props.item.gallery.length - 1;
        return index;
      }
    };
    this.setState((state) => {
      return { ...state, selectedImageIndex: newIndex() };
    });
  };

  render() {
    const {
      name,
      brand,
      prices,
      attributes,
      gallery,
      quantity,
      selectedAttributes,
    } = this.props.item;
    const { selectedCurrency, mini } = this.props;
    const { selectedImageIndex } = this.state;
    const currencyIndex = prices.findIndex(
      (price) => price.currency.label === selectedCurrency.label
    );

    return (
      <div className="cart-item">
        <div className="details">
          <div className="name">
            <ProductDetailsName brand={brand} name={name} mini={mini} />
          </div>
          <div className="price">
            <ProductDetailsPrice
              price={prices[currencyIndex]}
              mini={mini}
              multiplier={quantity}
            />
          </div>
          {attributes.length > 0 && (
            <div className="attributes">
              {attributes.map((attribute) => (
                <ProductDetailsAttributes
                  attribute={attribute}
                  selectedAttributes={selectedAttributes}
                  key={attribute.id}
                  mini={mini}
                />
              ))}
            </div>
          )}
        </div>
        <div className="quantity-image-container">
          <div className={`quantity ${mini ? 'mini-quantity' : ''}`}>
            <button
              onClick={() =>
                this.props.dispatch(increaseQuantity(this.props.item))
              }
            >
              &#43;
            </button>
            <div className="item-quantity">{quantity}</div>
            <button
              onClick={() =>
                this.props.dispatch(decreaseQuantity(this.props.item))
              }
            >
              &#8722;
            </button>
          </div>
          <div className="image">
            <img
              className={`${mini ? 'mini-image' : 'regular-image'}`}
              src={gallery[selectedImageIndex]}
              alt={`${brand} ${name}`}
            />
            {!mini && (
              <div className="arrows">
                <div
                  className="arrow-container left"
                  onClick={() => this.changeImage('previous')}
                >
                  <div className="arrow left"></div>
                </div>
                <div className="arrow" onClick={() => this.changeImage('next')}>
                  <div className="arrow-container right">
                    <div className="arrow right"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CartItem);
