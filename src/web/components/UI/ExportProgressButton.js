import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { generalMessages } from '../../../constants/messages';
import { exportJsonToFile } from '../../utils/export';

const ExportProgressButton = props => (
  <Button
    color="primary"
    onClick={() => exportJsonToFile(props.workoutHistory)}
    size="lg"
    block
  >
    {generalMessages.exportProgress}
  </Button>
);

ExportProgressButton.propTypes = {
  workoutHistory: PropTypes.shape({}).isRequired,
};

export default ExportProgressButton;
