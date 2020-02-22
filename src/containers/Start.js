import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { exportJsonToFile } from '../utils/export';

class Start extends PureComponent {
  static propTypes = {
    onStart: PropTypes.func.isRequired,
    Layout: PropTypes.func.isRequired,
    workoutHistory: PropTypes.shape({}).isRequired,
  }

  render = () => {
    const { Layout, onStart, workoutHistory } = this.props;
    return (
      <Layout
        onClick={onStart}
        nextPage="warmup"
        workoutHistory={workoutHistory}
      />
    );
  }
}

const mapStateToProps = state => ({
  workoutHistory: state.workouts.history,
});

const mapDispatchToProps = dispatch => ({
  onStart: dispatch.workouts.startWorkout,
});

export default connect(mapStateToProps, mapDispatchToProps)(Start);
