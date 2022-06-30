import { Component } from 'react';

import './ProductDetailsName.scss';

export class ProductDetailsName extends Component {
  render() {
    const { brand, name, mini } = this.props;
    return (
      <div className={`${mini ? 'mini-' : ''}product-details-name`}>
        <div className={`brand ${mini ? 'mini' : ''}`}>{brand}</div>
        <div className={`name${mini ? 'mini' : ''}`}>{name}</div>
      </div>
    );
  }
}

export default ProductDetailsName;
