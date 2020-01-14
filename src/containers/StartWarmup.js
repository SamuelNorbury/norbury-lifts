import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class StartWarmup extends PureComponent {
  static propTypes = {
    onStart: PropTypes.func.isRequired,
    Layout: PropTypes.func.isRequired,
    currentExercise: PropTypes.string.isRequired,
  }

  render = () => {
    const { Layout, currentExercise, onStart } = this.props;
    return (
      <Layout
        currentExercise={currentExercise}
        onClick={onStart}
        nextPage="exercise"
      />
    );
  }
}

const mapStateToProps = state => ({
  currentExercise: state.workouts.currentExercise,
});

const mapDispatchToProps = dispatch => ({
  onStart: dispatch.workouts.startExercise,
});

export default connect(mapStateToProps, mapDispatchToProps)(StartWarmup);
