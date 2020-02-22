import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SingleClickComponent from './UI/SingleClick';
import ExportProgressButton from './UI/ExportProgressButton';
import ImportProgressButton from './UI/ImportProgressButton';
import { generalMessages } from '../../constants/messages';

class Start extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    nextPage: PropTypes.string.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    onClickExport: PropTypes.func.isRequired,
    workoutHistory: PropTypes.shape({}).isRequired,
  }


  handleClick = () => {
    const { onClick, history, nextPage } = this.props;
    onClick();
    history.push(`/${nextPage}`);
  }


    render = () => {
      const { workoutHistory, onClickImport } = this.props;
      return (
        <Fragment>
          <SingleClickComponent
            onClick={this.handleClick}
            title={generalMessages.readyForWorkout}
          />
          <ExportProgressButton workoutHistory={workoutHistory} />
          <ImportProgressButton onClick={onClickImport} />
        </Fragment>
      );
    }
}

export default withRouter(Start);
