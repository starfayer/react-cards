import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={320}
    height={320}
    viewBox="0 0 320 320"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="80" y="20" rx="6" ry="6" width="210" height="210" />
    <rect x="60" y="250" rx="6" ry="6" width="250" height="10" />
    <rect x="60" y="270" rx="6" ry="6" width="250" height="10" />
    <rect x="60" y="290" rx="6" ry="6" width="250" height="10" />
  </ContentLoader>
);
