import React from 'react';
import { Link } from 'react-router-dom';

const ErrorElement = (): JSX.Element => (
  <div className="container d-flex flex-column align-items-center">
    <div className="about-container">
      <h2>Oops! Something went wrong!</h2>
      <p className="lead">Please, try to open valid links in my web app, for example:</p>
      <ul>
        <li>
          <Link to={'/'} className="link">
            main page
          </Link>
        </li>
        <li>
          <Link to={'/about'} className="link">
            about page
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default ErrorElement;
