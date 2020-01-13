import React from 'react';
import SingleClickComponent from './UI/SingleClick';
import { generalMessages } from '../../constants/messages';

const Start = props => (
  <SingleClickComponent
    {...props}
    title={generalMessages.firstExercise + props.exerciseName}
    buttonText={generalMessages.ok}
  />
);

export default Start;
