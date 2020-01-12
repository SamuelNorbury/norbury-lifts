import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Templates
import TemplateNothing from '../components/Templates/Nothing';
import TemplateSidebar from '../components/Templates/Sidebar';

// Routes
import StartContainer from '../../containers/Start';
import StartWarmupContainer from '../../containers/StartWarmup';
import FinishContainer from '../../containers/Finish';
import ExerciseContainer from '../../containers/Exercise';

import StartComponent from '../components/Start';
import ExerciseComponent from '../components/Exercise';
import StartWarmupComponent from '../components/StartWarmup';
import FinishComponent from '../components/Finish';

import Error from '../components/UI/Error';

const Index = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={props => (
        <TemplateNothing>
          <StartContainer {...props} Layout={StartComponent} />
        </TemplateNothing>
      )}
    />
    <Route
      exact
      path="/warmup"
      render={props => (
        <TemplateNothing>
          <StartWarmupContainer {...props} Layout={StartWarmupComponent} />
        </TemplateNothing>
      )}
    />
    <Route
      exact
      path="/finish"
      render={props => (
        <TemplateNothing>
          <FinishContainer {...props} Layout={FinishComponent} />
        </TemplateNothing>
      )}
    />
    <Route
      path="/exercise"
      render={props => (
        <TemplateNothing pageTitle="Workout In Progress">
          <ExerciseContainer {...props} Layout={ExerciseComponent} />
        </TemplateNothing>
      )}
    />
    <Route
      render={props => (
        <TemplateNothing pageTitle="404 - Page not found">
          <Error {...props} title="404" content="Sorry, the route you requested does not exist" />
        </TemplateNothing>
      )}
    />
  </Switch>
);

export default Index;
