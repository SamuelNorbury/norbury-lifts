import React from 'react';
import {
  ButtonGroup, Jumbotron, Container, Button,
} from 'reactstrap';
import { generalMessages } from '../../../constants/messages';

const BinaryClick = props => (
  <div>
    <Jumbotron>
      <Container fluid>
        <h1 className="text-center display-3 text-primary">{props.title}</h1>
        {props.subtitle && <p className="lead text-center">{props.subtitle}</p>}
        <div className="d-flex flex-column">
          <ButtonGroup size="lg">
            <Button onClick={() => props.onClick(false)} color="danger" size="lg">
              {props.failureButtonText || generalMessages.no}
            </Button>
            <Button onClick={() => props.onClick(true)} color="success" size="lg">
              {props.successButtonText || generalMessages.yes}
            </Button>
          </ButtonGroup>
        </div>
        {props.validationText && (
        <div className="text-center">
          {props.validationText}
        </div>
        )}
      </Container>
    </Jumbotron>
  </div>
);

export default BinaryClick;
