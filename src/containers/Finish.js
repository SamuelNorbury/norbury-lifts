import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

class Finish extends PureComponent {
  static propTypes = {
    onFinish: PropTypes.func.isRequired,
    Layout: PropTypes.func.isRequired,
  }

  render = () => {
    const { Layout, onFinish } = this.props;
    return (
      <Layout
        onClick={onFinish}
      />
    );
  }
}

const mapStateToProps = () => ({ });

const mapDispatchToProps = dispatch => ({
  onFinish: () => {
    const history = useHistory();
    dispatch.workouts.finishWorkout()
      .then(() => {
        history.push('/');
      });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Finish);
