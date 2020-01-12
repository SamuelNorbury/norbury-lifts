import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Start extends Component {
  static propTypes = {
    onStart: PropTypes.func.isRequired,
  }

  render = () => {
    const { Layout, onStart } = this.props;
    return (
      <Layout
        onClick={onStart}
      />
    );
  }
}

const mapStateToProps = () => ({ });

const mapDispatchToProps = dispatch => ({
  onStart: dispatch.workouts.startWorkout,
});

export default connect(mapStateToProps, mapDispatchToProps)(Start);
