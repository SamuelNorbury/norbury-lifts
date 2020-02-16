import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Exercise extends PureComponent {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    onCompleteSet: PropTypes.func.isRequired,
    exercise: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    reps: PropTypes.number.isRequired,
    isWarmingUp: PropTypes.bool.isRequired,
    isFinished: PropTypes.bool.isRequired,
    setFormat: PropTypes.shape([
      PropTypes.number.isRequired,
    ]).isRequired,
  }

  render = () => {
    const {
      Layout,
      onCompleteSet,
      exercise,
      weight,
      reps,
      setFormat,
      isWarmingUp,
      isFinished,
    } = this.props;

    return (
      <Layout
        onCompleteSet={success => onCompleteSet(weight, reps, setFormat, success)}
        exercise={exercise}
        reps={reps}
        weight={weight}
        isWarmingUp={isWarmingUp}
        isFinished={isFinished}
      />
    );
  }
}

const mapStateToProps = state => ({
  exercise: state.workouts.exercise,
  weight: state.workouts.weight,
  reps: state.workouts.reps,
  setFormat: state.workouts.setFormat,
  isWarmingUp: state.workouts.isWarmingUp,
  isFinished: state.workouts.isFinished,
});

const mapDispatchToProps = dispatch => ({
  onCompleteSet: (weight, reps, setFormat, success) => {
    dispatch.workouts.completeSet({
      weight,
      reps,
      sets: setFormat,
      success,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Exercise);
