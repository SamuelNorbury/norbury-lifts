import React from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';
import SingleClickComponent from './UI/SingleClick';
import { generalMessages } from '../../constants/messages';

const Start = props => (
  <SingleClickComponent
    {...props}
    title={generalMessages.readyForWorkout}
  />
);

export default Start;
