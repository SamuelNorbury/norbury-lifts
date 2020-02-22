import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SingleClickComponent from './UI/SingleClick';
import ExportProgressButton from './UI/ExportProgressButton';
// import ImportProgressButton from './UI/ImportProgressButton';
import { generalMessages } from '../../constants/messages';

class Finish extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    workoutHistory: PropTypes.object.isRequired,
  }

  handleClick = () => {
    const { onClick, history } = this.props;
    onClick();
    history.push('/');
  }

    render = () => {
      const { workoutHistory } = this.props;
      return (
        <Fragment>
          <SingleClickComponent
            onClick={this.handleClick}
            title={generalMessages.workoutFinished}
            subtitle={generalMessages.comeBackIn2Days}
            buttonText={generalMessages.readyForNextWorkout}
          />
          <ExportProgressButton history={workoutHistory} />
        </Fragment>
      );
    }
}
export default withRouter(Finish);
