import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Finish extends PureComponent {
  static propTypes = {
    onFinish: PropTypes.func.isRequired,
    Layout: PropTypes.func.isRequired,
  }

  render = () => {
    const {
      Layout, onFinish, history, importProgress,
    } = this.props;
    return (
      <Layout
        onClick={onFinish}
        workoutHistory={workoutHistory}
        onClickImport={importProgress}
      />
    );
  }
}

const mapStateToProps = state => ({
  history: state.workouts.history,
});

const mapDispatchToProps = dispatch => ({
  onFinish: dispatch.workouts.finishWorkout,
  importProgress: dispatch.workouts.importHistory,
});

export default connect(mapStateToProps, mapDispatchToProps)(Finish);
