import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SingleClickComponent from './UI/SingleClick';
import { generalMessages, exercises } from '../../constants/messages';

class Start extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    nextPage: PropTypes.string.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    currentExercise: PropTypes.string.isRequired,
  }

  handleClick = () => {
    const { onClick, history, nextPage } = this.props;
    onClick();
    history.push(`/${nextPage}`);
  }

  render = () => {
    const { currentExercise } = this.props;
    return (
      <SingleClickComponent
        onClick={this.handleClick}
        title={(
          <Fragment>
            <span className="text-info">{generalMessages.firstExercise}</span>
            {' '}
            <span className="text-warning">{exercises[currentExercise]}</span>
          </Fragment>
          )}
        subtitle={generalMessages.firstAWarmup}
        buttonText={generalMessages.ok}
      />
    );
  }
}

export default withRouter(Start);
