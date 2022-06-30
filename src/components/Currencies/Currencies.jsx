import { Component, createRef } from 'react';
import { connect } from 'react-redux';

import { fetchCurrencies, selectCurrency } from '../../redux/currencies';

import './Currencies.scss';

const mapStateToProps = (state) => {
  const { currencies, selectedCurrency } = state.currencies;
  return { currencies, selectedCurrency };
};

export class Currencies extends Component {
  state = {
    selectingCurrency: false,
  };

  currencyRef = createRef();

  listener = () => {
    return (event) => {
      if (
        this.currencyRef.current &&
        event.target &&
        this.currencyRef.current.contains(event.target)
      ) {
        return;
      }
      this.setState((state) => {
        return { ...state, selectingCurrency: false };
      });
    };
  };

  componentDidMount() {
    this.props.dispatch(fetchCurrencies());
    document.addEventListener('click', this.listener(), { capture: true });
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.listener(), { capture: true });
  }

  render() {
    const { currencies, selectedCurrency } = this.props;
    const { selectingCurrency } = this.state;
    return (
      <>
        {currencies && selectedCurrency && (
          <div
            className="currencies"
            ref={this.currencyRef}
            onClick={() =>
              this.setState((state) => {
                return {
                  ...state,
                  selectingCurrency: !state.selectingCurrency,
                };
              })
            }
          >
            <span>{selectedCurrency.symbol}</span>
            {selectingCurrency ? (
              <i className="arrow up" />
            ) : (
              <i className="arrow down"></i>
            )}
            {selectingCurrency && currencies && (
              <div className="currencies-list">
                {currencies.map((currency) => (
                  <div
                    className="currency-choice"
                    key={currency.label}
                    onClick={() => {
                      this.props.dispatch(selectCurrency(currency));
                    }}
                  >
                    {currency.symbol} {currency.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </>
    );
  }
}

export default connect(mapStateToProps)(Currencies);
