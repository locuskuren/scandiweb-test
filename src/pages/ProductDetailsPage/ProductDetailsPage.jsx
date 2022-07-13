import { Component } from 'react';
import { connect } from 'react-redux';
import parse from 'html-react-parser';
import { fetchproduct, productReset } from '../../redux/product';
import { addToCart } from '../../redux/cart';
import { withRouter } from 'react-router-dom';

import BadRoute from '../../components/BadRoute/BadRoute';
import ProductDetailsName from '../../components/ProductDetailsName/ProductDetailsName';
import ProductDetailsPrice from '../../components/ProductDetailsPrice/ProductDetailsPrice';
import ProductDetailsAttributes from '../../components/ProductDetailsAttribute/ProductDetailsAttribute';

import './ProductDetailsPage.scss';

const mapStateToProps = (state) => {
  const { product, loading } = state.product;
  const { selectedCurrency } = state.currencies;
  return { product, selectedCurrency, loading };
};

export class ProductDetailsPage extends Component {
  state = {
    selectedImageIndex: 0,
    attributes: {},
    attributesMessage: '',
  };

  componentDidMount() {
    this.props.dispatch(fetchproduct(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.dispatch(productReset());
  }

  handleAttribute = (attributeName, attributeValue) => {
    this.setState((state) => {
      return {
        ...state,
        attributes: { ...state.attributes, [attributeName]: attributeValue },
      };
    });
  };

  addToCart = () => {
    const product = {
      ...this.props.product,
      selectedAttributes: this.state.attributes,
      quantity: 1,
    };

    if (
      this.props.product.attributes.length ===
      Object.keys(this.state.attributes).length
    ) {
      this.props.dispatch(addToCart(product));
      this.setState((state) => {
        return { ...state, attributes: {}, attributesMessage: '' };
      });
    } else {
      this.setState((state) => {
        return { ...state, attributesMessage: 'please select attributes' };
      });
    }
  };

  render() {
    const { product, loading, selectedCurrency } = this.props;
    const { selectedImageIndex, attributes, attributesMessage } = this.state;
    const currencyIndex = product.prices
      ? product.prices.findIndex(
          (price) => price.currency.label === selectedCurrency.label
        )
      : 0;

    if (!loading && !product) {
      return <BadRoute />;
    }

    return (
      <div className="product-details-page">
        <div className="content">
          {product.gallery && (
            <div className="product-images">
              <div className="gallery">
                {product.gallery.map((image, index) => (
                  <img
                    className="image"
                    src={image}
                    alt={`${product.name} first gallery item`}
                    key={image}
                    onClick={() =>
                      this.setState((state) => {
                        return { ...state, selectedImageIndex: index };
                      })
                    }
                  />
                ))}
              </div>
              <img
                className="selected-image"
                src={product.gallery[selectedImageIndex]}
                alt={product.name}
              />
            </div>
          )}
          <div className="product-details">
            {product.brand && product.name && (
              <ProductDetailsName brand={product.brand} name={product.name} />
            )}
            {product.attributes && (
              <div className="attributes">
                {product.attributes.map((attribute) => (
                  <ProductDetailsAttributes
                    selectedAttributes={attributes}
                    attribute={attribute}
                    handleAttribute={this.handleAttribute}
                    key={attribute.id}
                  />
                ))}
              </div>
            )}
            <div className="price-title">PRICE: </div>
            {product.prices && (
              <ProductDetailsPrice
                price={product.prices[currencyIndex]}
                multiplier={1}
              />
            )}
            <div className="add-to-cart">
              {attributesMessage && (
                <div className="attributes-message">{attributesMessage}</div>
              )}
              <button
                disabled={!product.inStock}
                onClick={() => this.addToCart()}
              >
                ADD TO CART
              </button>
            </div>

            {product.description && (
              <div className="description">{parse(product.description)}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withRouter(ProductDetailsPage));
