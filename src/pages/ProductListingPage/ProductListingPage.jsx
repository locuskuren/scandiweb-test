import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BadRoute from '../../components/BadRoute/BadRoute';
import ProductCard from '../../components/ProductCard/ProductCard';
import { fetchCategory } from '../../redux/category';

import './ProductListingPage.scss';

const mapStateToProps = (state) => {
  const { category, loading } = state.category;
  return { category, loading };
};

export class ProductListingPage extends Component {
  componentDidMount() {
    const cateogoryPathname =
      this.props.match.url === '/' ? 'all' : this.props.match.url.substring(1);
    (!this.props.category || cateogoryPathname !== this.props.category.name) &&
      this.props.dispatch(fetchCategory(cateogoryPathname));
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.url !== prevProps.match.url) {
      this.props.dispatch(
        fetchCategory(
          this.props.match.url === '/'
            ? 'all'
            : this.props.match.url.substring(1)
        )
      );
    }
  }

  render() {
    const { category, loading } = this.props;

    if (!loading && !category) {
      return <BadRoute />;
    }

    return (
      <div className="product-listing-page">
        <div className="content">
          {category.name && (
            <h1>
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </h1>
          )}
          <div className="product-list">
            {category.products &&
              category.products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withRouter(ProductListingPage));
