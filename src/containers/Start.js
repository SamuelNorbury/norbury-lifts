import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Start extends PureComponent {
  static propTypes = {
    onStart: PropTypes.func.isRequired,
    Layout: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  render = () => {
    const { Layout, onStart } = this.props;
    return (
      <Layout
        onClick={onStart}
        nextPage="warmup"
      />
    );
  }
}

const mapStateToProps = () => ({ });

const mapDispatchToProps = dispatch => ({
  onStart: dispatch.workouts.startWorkout,
});

export default connect(mapStateToProps, mapDispatchToProps)(Start);
