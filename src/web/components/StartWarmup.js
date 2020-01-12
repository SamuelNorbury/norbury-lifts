import React from 'react';
import SingleClickComponent from './UI/SingleClick';
import { Jumbotron, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { generalMessages } from '../../constants/messages';

const SingleClick = (props) => (
  <div>
    <Jumbotron>
      <Container fluid>
        <h1 className="display-3 text-primary">{props.title}</h1>
        {props.subtitle && <p className="lead">{props.subtitle}</p>}
        <div>
          <Button onClick={props.onClick} color="info" size="lg">
            {props.buttonText || generalMessages.lets_go}
          </Button>
        </div>
      </Container>
    </Jumbotron>
  </div>
);

export default SingleClick;
