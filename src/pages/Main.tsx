import React from 'react';
import { Search } from 'components/Search';
import { Gallery } from 'components/Gallery';
import '../main.css';

import { CardData, ApiData } from 'utils/types';
import test from '../utils/test.json';

export class Main extends React.Component {
  collection: Array<CardData>;
  handlers: {
    _saveValue: (e: BeforeUnloadEvent) => void;
  };

  constructor(props: Record<string, never>) {
    super(props);

    this.collection = [];
    this.handlers = {
      _saveValue: this._saveValue.bind(this),
    };
  }
  state = {
    searchValue: '',
  };
  componentDidMount() {
    window.addEventListener('beforeunload', this.handlers._saveValue);

    const searchValue = localStorage.getItem('searchValue');
    if (searchValue) {
      this._setSearch(searchValue);
    }
  }
  componentWillUnmount(): void {
    window.removeEventListener('beforeunload', this.handlers._saveValue);
  }

  _saveValue(e: BeforeUnloadEvent) {
    e.preventDefault();
    localStorage.setItem('searchValue', this.state.searchValue);
  }
  _setSearch(name: string) {
    this.setState({ searchValue: name });
  }
  render() {
    return (
      <div className="main container">
        <div className="container-search">
          <Search value={this.state.searchValue} changeHandler={this._setSearch.bind(this)} />
        </div>
        <div className="content">
          <Gallery data={test as Array<ApiData>} filterValue={this.state.searchValue} />
        </div>
      </div>
    );
  }
}
