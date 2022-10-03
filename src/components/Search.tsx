import React from 'react';

interface SearchProps {
  value: string;
  changeHandler: (name: string) => void;
}

class Search extends React.Component<SearchProps> {
  value: string;

  constructor(props: SearchProps) {
    super(props);

    this.value = '';
  }
  componentWillUnmount(): void {
    localStorage.setItem('searchValue', this.value);
  }

  _onInputChange(e: React.FormEvent<HTMLInputElement>) {
    const val = e.currentTarget.value;
    this.value = val;

    this.props.changeHandler(val);
  }

  render() {
    return (
      <>
        <div className="form-floating">
          <input
            type="search"
            onChange={(e) => this._onInputChange(e)}
            className="form-control"
            placeholder="Find your card"
            value={this.props.value}
          ></input>
          <label htmlFor="floatingTextarea" className="text-secondary">
            <span>Finder</span>
          </label>
        </div>
        <div className="text-start">
          You can find each image on page by <span style={{ fontWeight: '600' }}>username</span>
        </div>
      </>
    );
  }
}

export { Search };
