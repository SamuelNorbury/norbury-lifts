import React from 'react';
import { Button, CustomFileInput } from 'reactstrap';
import { generalMessages } from '../../../constants/messages';

const ImportProgressButton = props => (
  <Button
    color="secondary"
    size="lg"
    block
  >
    <CustomFileInput hidden>
      Import your progress
    </CustomFileInput>
  </Button>
);

export default ImportProgressButton;
