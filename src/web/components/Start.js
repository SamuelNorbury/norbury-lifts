import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SingleClickComponent from './UI/SingleClick';
import { generalMessages } from '../../constants/messages';

class Start extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    nextPage: PropTypes.string.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }


  handleClick = () => {
    const { onClick, history, nextPage } = this.props;
    onClick();
    history.push(`/${nextPage}`);
  }

  render = () => (
    <SingleClickComponent
      onClick={this.handleClick}
      title={generalMessages.readyForWorkout}
    />
  )
}

export default withRouter(Start);
