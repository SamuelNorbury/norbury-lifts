import React from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';
import { generalMessages } from '../../../constants/messages';

const SingleClick = (props) => (
  <div>
    <Jumbotron>
      <Container fluid>
        <h1 className="display-3 text-primary">{props.title}</h1>
        {props.subtitle && <p className="lead">{props.subtitle}</p>}
        <div>
          <Button onClick={props.onClick} color="info" size="lg">
            {props.buttonText || generalMessages.letsGo}
          </Button>
        </div>
      </Container>
    </Jumbotron>
  </div>
);

export default SingleClick;
