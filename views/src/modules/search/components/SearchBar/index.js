import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './style';
import * as searchActionCreators from '../../index.actionCreators';
import * as recipesActionCreators from '../../../recipes/index.actionCreators';
import * as globalSelectors from '../../index.selectors';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.retrieveFilteredRecipes = this.retrieveFilteredRecipes.bind(this);
  }

  handleTextChange(e) {
    const { setTextSearch } = this.props;
    const input = e.target.value;
    setTextSearch(input);

    return this.retrieveFilteredRecipes(e.target.value);
  }

  retrieveFilteredRecipes(search) {
    const { maxCookingTimeMinutes, retrieveRecipes } = this.props;
    const filterParams = {
      search,
      maxCookingTimeMinutes,
    };
    return retrieveRecipes(filterParams);
  }

  render() {
    const { textInput } = this.props;

    return (
      <div style={styles.searchBarContainer}>
        <input
          type="text"
          style={styles.inputBox}
          placeholder="Search by recipe or by ingredient..."
          value={textInput}
          onChange={this.handleTextChange}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  textInput: PropTypes.string,
  maxCookingTimeMinutes: PropTypes.number,
  retrieveRecipes: PropTypes.func.isRequired,
  setTextSearch: PropTypes.func.isRequired,
  // setMaxCookingTime: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  textInput: undefined,
  maxCookingTimeMinutes: undefined,
};

const mapStateToProps = state => ({
  textInput: globalSelectors.getText(state),
  maxCookingTimeMinutes: globalSelectors.getMaxCookingTime(state),
});

const mapDispatchToProps = dispatch => ({
  retrieveRecipes: params => dispatch(recipesActionCreators.retrieveRecipes(params)),
  setMaxCookingTime: value => dispatch(searchActionCreators.setMaxCookingTime(value)),
  setTextSearch: value => dispatch(searchActionCreators.setTextSearch(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
