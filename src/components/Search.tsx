import React from 'react';

export const Search = (): JSX.Element => {
  return (
    <div className="form-floating">
      <input type="text" className="form-control" placeholder="Find your card"></input>
      <label htmlFor="floatingTextarea" className="text-primary">
        <span>Finder</span>
      </label>
    </div>
  );
};
