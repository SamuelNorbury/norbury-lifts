import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
  onFinish: dispatch.workouts.finishWorkout,
})

export default connect(mapStateToProps, mapDispatchToProps)(Finish);
