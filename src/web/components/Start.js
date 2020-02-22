import React, { PureComponent, Fragment } from 'react';
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


    render = () => {
      const { onClickExport } = this.props;
      return (
        <Fragment>
          <button
            className="btn btn-primary"
            onClick={onClickExport}
          >
              Export your progress
          </button>
          <SingleClickComponent
            onClick={this.handleClick}
            title={generalMessages.readyForWorkout}
          />
        </Fragment>
      );
    }
}

export default withRouter(Start);
