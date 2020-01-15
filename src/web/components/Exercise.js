import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import BinaryClickComponent from './UI/BinaryClick';
import { generalMessages, exercises } from '../../constants/messages';

class Exercise extends Component {
  static propTypes = {
    onCompleteSet: PropTypes.func.isRequired,
    currentExercise: PropTypes.string.isRequired,
    currentWeight: PropTypes.number.isRequired,
    currentReps: PropTypes.number.isRequired,
    currentSetFormat: PropTypes.shape([
      PropTypes.number.isRequired,
    ]).isRequired,
  }

  state = {
    responseToPerformance: '',
  };

  handleClick = (success) => {
    const {
      onCompleteSet,
      currentWeight,
      currentReps,
      currentSetFormat,
    } = this.props;

    onCompleteSet(currentWeight, currentReps, currentSetFormat, success);
    this.setState({
        responseToPerformance: success ? generalMessages.goodJob : generalMessages.keepTrying,
        });
  }

  render = () => {
    const { currentExercise, currentWeight, currentReps } = this.props;
    const { responseToPerformance } = this.state;
    return (
      <BinaryClickComponent
        title={(
          <Fragment>
            <span className="text-info">{ generalMessages.repsAre }</span>
            {currentReps}
            {' '}
            <span className="text-info">{ generalMessages.reps}</span>
            {' '}
            <span className="text-info">{ generalMessages.weightIs }</span>
            {currentWeight}
            <span className="text-info">{ generalMessages.kg }</span>
          </Fragment>
          )}
        subtitle={(
          <Fragment>
            <span className="text-info">{generalMessages.currentExerciseIs}</span>
            {' '}
            <span className="text-warning">{exercises[currentExercise]}</span>
          </Fragment>
          )}
        successButtonText={generalMessages.passedSet}
        failureButtonText={generalMessages.failedSet}
        onClick={this.handleClick}
        validationText={responseToPerformance}
      />
    );
  }
}

export default Exercise;
