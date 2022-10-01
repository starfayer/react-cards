import React from 'react';
import { CardData as CardProps } from 'utils/types';

export const Card = (): JSX.Element => {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src="..." className="card-img-top" alt="card"></img>
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the bulk of the card&apos;s
          content.
        </p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
};
