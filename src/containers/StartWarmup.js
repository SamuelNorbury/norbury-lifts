import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class StartWarmup extends PureComponent {
  static propTypes = {
    onStart: PropTypes.func.isRequired,
    Layout: PropTypes.func.isRequired,
    exercise: PropTypes.string.isRequired,
  }

  render = () => {
    const { Layout, exercise, onStart } = this.props;
    return (
      <Layout
        exercise={exercise}
        onClick={onStart}
        nextPage="exercise"
      />
    );
  }
}

const mapStateToProps = state => ({
  exercise: state.workouts.exercise,
});

const mapDispatchToProps = dispatch => ({
  onStart: dispatch.workouts.startExercise,
});

export default connect(mapStateToProps, mapDispatchToProps)(StartWarmup);
