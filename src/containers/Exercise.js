import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Exercise extends PureComponent {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    onCompleteSet: PropTypes.func.isRequired,
    currentExercise: PropTypes.string.isRequired,
    currentWeight: PropTypes.number.isRequired,
    currentReps: PropTypes.number.isRequired,
    currentSetFormat: PropTypes.shape([
      PropTypes.number.isRequired,
    ]).isRequired,
  }

  render = () => {
    const {
      Layout,
      onCompleteSet,
      currentExercise,
      currentWeight,
      currentReps,
      currentSetFormat,
    } = this.props;

    return (
      <Layout
        onCompleteSet={onCompleteSet}
        currentExercise={currentExercise}
        currentReps={currentReps}
        currentWeight={currentWeight}
        currentSets={currentSetFormat}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentExercise: state.workouts.currentExercise,
  currentWeight: state.workouts.currentWeight,
  currentReps: state.workouts.goalReps,
  currentSetFormat: state.workouts.currentSetFormat,
});

const mapDispatchToProps = dispatch => ({
  onCompleteSet: (weight, reps, currentSetFormat, success) => {
    dispatch.workouts.completeSet({
      weight,
      reps,
      sets: currentSetFormat,
      success,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Exercise);
