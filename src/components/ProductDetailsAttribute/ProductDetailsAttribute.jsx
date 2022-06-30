import { Component } from 'react';

import './ProductDetailsAttribute.scss';

export class ProductDetailsAttributes extends Component {
  render() {
    const { attribute, handleAttribute, selectedAttributes, mini } = this.props;

    return (
      <div className="attributes">
        <div className={`title ${mini ? 'mini-title' : ''}`}>
          {mini ? attribute.id : attribute.id.toUpperCase()}:
        </div>
        <div className="list">
          {attribute.type === 'text'
            ? attribute.items.map((item) => (
                <div
                  className={`attribute ${
                    selectedAttributes[attribute.id] === item.id &&
                    'selected-attribute'
                  } ${mini ? 'mini-attribute' : ''} ${
                    attribute.id === 'Capacity' && mini
                      ? 'capacity-attribute-mini'
                      : ''
                  }`}
                  key={item.id}
                  onClick={() =>
                    !mini && handleAttribute(attribute.id, item.id)
                  }
                  style={{
                    backgroundColor:
                      attribute.type === 'swatch' ? item.value : '',
                  }}
                >
                  {item.value}
                </div>
              ))
            : attribute.items.map((item) => (
                <div
                  className={`color-attribute-wrapper ${
                    selectedAttributes[attribute.id] === item.id &&
                    'selected-color-attribute'
                  } ${mini ? 'mini-color-attribute-wrapper' : ''}`}
                  key={item.id}
                >
                  <div
                    className={`color-attribute ${
                      item.displayValue === 'White' && 'white'
                    } ${mini ? 'mini-color' : ''}`}
                    onClick={() =>
                      !mini && handleAttribute(attribute.id, item.id)
                    }
                    style={{
                      backgroundColor: item.value,
                    }}
                  ></div>
                </div>
              ))}
        </div>
      </div>
    );
  }
}

export default ProductDetailsAttributes;
