import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class StartWarmup extends PureComponent {
  static propTypes = {
    onStart: PropTypes.func.isRequired,
    Layout: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    currentExercise: PropTypes.string.isRequired,
  }

  handleClick = () => {
    const { onStart, history } = this.props;
    onStart();
    history.push('/exercise');
  }

  render = () => {
    const { Layout, currentExercise } = this.props;
    return (
      <Layout
        currentExercise={currentExercise}
        onClick={this.handleClick}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StartWarmup));
