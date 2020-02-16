import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SingleClickComponent from './UI/SingleClick';
import { generalMessages } from '../../constants/messages';

class Finish extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  handleClick = () => {
    const { onClick, history } = this.props;
    onClick();
    history.push('/');
  }

  render = () => (
    <SingleClickComponent
      onClick={this.handleClick}
      title={generalMessages.workoutFinished}
      subtitle={generalMessages.comeBackIn2Days}
      buttonText={generalMessages.readyForNextWorkout}
    />
  )
}
export default withRouter(Finish);
