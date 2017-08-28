// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setSearchTerm } from './actionCreators';

class Landing extends Component {
  constructor(props: { searchTerm: string }) {
    super(props);
    this.state = {
      inputSearchTerm: '',
    };
  }

  handleInputFieldChange = e => {
    this.setState({ inputSearchTerm: e.target.value });
  };

  handleFormSubmit = (e, props: { history: {}, shows: [] }) => {
    e.preventDefault();
    const show = props.shows
      .filter(
        c =>
          c.title
            .toLowerCase()
            .includes(this.state.inputSearchTerm.toLowerCase()) ||
          c.description
            .toLowerCase()
            .includes(this.state.inputSearchTerm.toLowerCase()),
      )
      .pop();
    if (show) props.history.push(`/details/${show.imdbID}`);
  };

  render() {
    return (
      <div className="landing">
        <h1>svideo</h1>
        <form onSubmit={e => this.handleFormSubmit(e, this.props)}>
          <input
            type="text"
            onChange={this.handleInputFieldChange}
            placeholder="Search"
          />
        </form>
        <Link to="/search">or Browse All</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({ searchTerm: state.searchTerm });
const mapDispatchToProps = (dispatch: Function) => ({
  handleSearchTermChange(e) {
    dispatch(setSearchTerm(e.target.value));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
