import React from 'react';
import { CardData } from 'utils/types';

interface CardProps {
  data: CardData;
}

export const Card = (props: CardProps): JSX.Element => {
  const data = props.data;
  const description = (
    <>
      Random card from{' '}
      <a href="https://unsplash.com/" target="_blank" rel="noreferrer">
        unsplash.com
      </a>
      . Author could describe it but not this time :((
    </>
  );

  return (
    <div className="card card-custom rounded" style={{ width: '80%', height: '400px' }}>
      <a
        className="card-image-link"
        href={data.image.webPage}
        style={{ backgroundImage: `url(${data.image.small})` }}
        target="_blank"
        rel="noreferrer"
      ></a>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <a href={data.author.link} target="_blank" className="link-primary" rel="noreferrer">
            <span>{data.author.username}</span>
          </a>
          <div className="d-flex align-items-center">
            <div>{!data.likes ? 0 : data.likes} likes</div>
            <div className="heart-icon"></div>
          </div>
        </div>
        <p className="card-text card-text-height">{!data.title ? description : data.title}</p>
        <a href={data.image.webPage} target="_blank" className="btn btn-secondary" rel="noreferrer">
          Open unspash photo
        </a>
      </div>
    </div>
  );
};
