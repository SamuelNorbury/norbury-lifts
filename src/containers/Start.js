import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { exportJsonToFile } from '../utils/export';

class Start extends PureComponent {
  static propTypes = {
    onStart: PropTypes.func.isRequired,
    Layout: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  render = () => {
    const { Layout, onStart, history } = this.props;
    return (
      <Layout
        onClick={onStart}
        nextPage="warmup"
        onClickExport={e => exportJsonToFile(e, history)}
      />
    );
  }
}

const mapStateToProps = state => ({
  history: state.workouts.history,
});

const mapDispatchToProps = dispatch => ({
  onStart: dispatch.workouts.startWorkout,
});

export default connect(mapStateToProps, mapDispatchToProps)(Start);
