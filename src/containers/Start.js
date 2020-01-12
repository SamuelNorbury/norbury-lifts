import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Exercise extends Component {
  static propTypes = {
  }

  state = {
  }

  render = () => {
    const { Layout } = this.props;
    return (
      <Layout />
    );
  }
}

const mapStateToProps = state => ({


});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Exercise);
