import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import BinaryClickComponent from './UI/BinaryClick';
import { generalMessages, exercises } from '../../constants/messages';
import { exerciseUrls } from '../../constants/urls';
import { rotateColors } from '../styles/utils';

class Exercise extends Component {
  static propTypes = {
    onCompleteSet: PropTypes.func.isRequired,
    exercise: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    reps: PropTypes.number.isRequired,
    isWarmingUp: PropTypes.bool.isRequired,
    isFinished: PropTypes.bool.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    responseToPerformance: '',
  };

  handleClick = (success) => {
    const {
      onCompleteSet,
    } = this.props;

    onCompleteSet(success);

    this.setState({
      responseToPerformance:
        success
          ? generalMessages.goodJob
          : generalMessages.keepTrying,
    });
  }

  renderSubtitle = () => {
    const { exercise, isWarmingUp } = this.props;

    let exerciseText = <span className={`text-${rotateColors()}`}>{exercises[exercise]}</span>;

    if (exerciseUrls[exercise]) {
      exerciseText = (
        <a href={exerciseUrls[exercise]}>
          {exerciseText}
        </a>
      );
    }

    if (isWarmingUp) {
      return (
        <Fragment>
          <span className={`text-${rotateColors()}`}>{generalMessages.exerciseIs}</span>
          {' '}
          {exerciseText}
          <br />
          <span className={`text-${rotateColors()}`}>{generalMessages.thisIsAWarmupSet}</span>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <span className={`text-${rotateColors()}`}>{generalMessages.exerciseIs}</span>
        {' '}
        {exerciseText}
      </Fragment>
    );
  }

  render = () => {
    const {
      weight, reps, isFinished, history,
    } = this.props;
    const { responseToPerformance } = this.state;

    if (isFinished) {
      history.push('/finish');
    }

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

export default withRouter(Exercise);
