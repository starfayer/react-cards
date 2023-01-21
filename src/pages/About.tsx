import React from 'react';
import { Link } from 'react-router-dom';

const About = (): JSX.Element => (
  <div className="container d-flex flex-column align-items-center">
    <div className="about-container">
      <h2>&quot;Container&quot; page: about</h2>
      <p className="lead">
        &quot;Container&quot; is my first React project, which uses Router and is provided with
        tests.
      </p>
      <p>
        On a <Link to={'/'}>main page</Link> you can find out cards and try searching them by
        username of author.
      </p>
    </div>
  </div>
);

export default About;
