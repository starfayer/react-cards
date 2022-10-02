import React from 'react';

export const Search = (): JSX.Element => {
  return (
    <>
      <div className="form-floating">
        <input type="text" className="form-control" placeholder="Find your card"></input>
        <label htmlFor="floatingTextarea" className="text-secondary">
          <span>Finder</span>
        </label>
      </div>
      <div className="text-start">
        You can find each image on page by <span style={{ fontWeight: '600' }}>username</span>
      </div>
    </>
  );
};
