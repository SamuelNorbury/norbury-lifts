import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import BinaryClickComponent from './UI/BinaryClick';
import { generalMessages, exercises } from '../../constants/messages';
import { rotateColors } from '../styles/utils';

class Exercise extends Component {
  static propTypes = {
    onCompleteSet: PropTypes.func.isRequired,
    exercise: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    reps: PropTypes.number.isRequired,
    isWarmup: PropTypes.bool.isRequired,
  }

  state = {
    responseToPerformance: '',
  };

  handleClick = (success) => {
    const {
      onCompleteSet,
    } = this.props;

    onCompleteSet(success);

    // Handle warmup nicely - needs n+2 index to see next warmup (or do something smarter)
    this.setState({
      responseToPerformance:
        success
          ? generalMessages.goodJob
          : generalMessages.keepTrying,
    });
  }

  renderSubtitle = () => {
    const { exercise, isWarmup } = this.props;

    if (isWarmup) {
      return (
        <Fragment>
          <span className={`text-${rotateColors()}`}>{generalMessages.thisIsAWarmupSet}</span>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <span className={`text-${rotateColors()}`}>{generalMessages.exerciseIs}</span>
        {' '}
        <span className={`text-${rotateColors()}`}>{exercises[exercise]}</span>
      </Fragment>
    );
  }

  render = () => {
    const { weight, reps } = this.props;
    const { responseToPerformance } = this.state;
    return (
      <BinaryClickComponent
        title={(
          <Fragment>
            <span className={`text-${rotateColors()}`}>{ generalMessages.repsAre }</span>
            <span className={`text-${rotateColors()}`}>{reps}</span>
            {' '}
            <span className={`text-${rotateColors()}`}>{ generalMessages.reps}</span>
            {' '}
            <span className={`text-${rotateColors()}`}>{ generalMessages.weightIs }</span>
            <span className={`text-${rotateColors()}`}>{weight}</span>
            <span className={`text-${rotateColors()}`}>{ generalMessages.kg }</span>
          </Fragment>
          )}
        subtitle={this.renderSubtitle()}
        successButtonText={generalMessages.passedSet}
        failureButtonText={generalMessages.failedSet}
        onClick={this.handleClick}
        validationText={responseToPerformance}
      />
    );
  }
}

export default Exercise;
