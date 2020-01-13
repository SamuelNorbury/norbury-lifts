import React, { Fragment } from 'react';
import SingleClickComponent from './UI/SingleClick';
import { generalMessages, exercises } from '../../constants/messages';

const Start = props => (
  <SingleClickComponent
    {...props}
    title={(
      <Fragment>
        <span className="text-info">{generalMessages.firstExercise}</span>
        {' '}
        <span className="text-warning">{exercises[props.currentExercise]}</span>
      </Fragment>
)}
    subtitle={generalMessages.firstAWarmup}
    buttonText={generalMessages.ok}
  />
);

export default Start;
