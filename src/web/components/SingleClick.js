import React from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const SingleClick = () => (
  <div>
    <Jumbotron>
      tron fluid>
      <Container fluid>
        <h1 className="display-3">{this.props.title}</h1>
        {this.props.subtitle && <p className="lead">{this.props.subtitle}</p>}
        <div>
          <Button onClick={this.props.onClick} color="info" size="lg">
            {this.props.buttonText || messages.lets_go}
          </Button>
        </div>
      </Container>
    </Jumbotron>
  </div>
);

export default SingleClick;
