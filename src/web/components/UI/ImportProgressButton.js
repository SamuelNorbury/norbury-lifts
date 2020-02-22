import React from 'react';
import { Button } from 'reactstrap';
import { generalMessages } from '../../../constants/messages';

const ImportProgressButton = props => (
  <Button
    color="secondary"
    onClick={props.onClick}
    size="lg"
    block
  >
      Import your progress
  </Button>
);

export default ImportProgressButton;
