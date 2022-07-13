import { Component } from 'react';
import numberWithCommas from '../../util/numberWithCommas';

import './ProductDetailsPrice.scss';

export class ProductDetailsPrice extends Component {
  render() {
    const { price, mini } = this.props;
    return (
      <div className={`${mini ? 'mini-' : ''}product-details-price`}>
        {price.currency.symbol}{' '}
        {numberWithCommas(parseFloat(price.amount).toFixed(2))}
      </div>
    );
  }
}

export default ProductDetailsPrice;
