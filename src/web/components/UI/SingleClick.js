import React from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';
import { generalMessages } from '../../../constants/messages';

const SingleClick = (props) => (
  <div>
    <Jumbotron>
      <Container fluid>
        <h1 className="text-center display-3 text-primary" >{props.title}</h1>
        {props.subtitle && <p className="lead text-center">{props.subtitle}</p>}
        <div>
          <Button onClick={props.onClick} color="info" size="lg" block>
            {props.buttonText || generalMessages.letsGo}
          </Button>
        </div>
      </Container>
    </Jumbotron>
  </div>
);

export default SingleClick;
