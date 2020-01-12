/* global window */
import React from 'react';
import { Col, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const SingleClick = () => (
  <div>
    <NavItem>
      <Link className={`nav-link ${window.location.pathname === '/' && 'active'}`} to="/">
        <i className="icon-home" />
        {' '}
        <span>Home</span>
      </Link>
    </NavItem>
    <NavItem>
      <Link className={`nav-link ${window.location.pathname.startsWith('/recipe') && 'active'}`} to="/recipes">
        <i className="icon-notebook" />
        {' '}
        <span>Recipes</span>
      </Link>
    </NavItem>
  </div>
);

export default SingleClick;
