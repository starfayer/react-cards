import React from 'react';
import { Search } from 'components/Search';
import { Card } from 'components/Card';
import { getRandomPhotos } from 'utils/pApi';
import { CardData, ApiData } from 'utils/types';
import './App.css';

import test from './utils/test.json';

const PHOTO_QUANTITY = 10;
const CARDS_PER_ROW = 3;

interface AppState {
  isLoading: boolean;
  cards: Array<CardData> | null;
  searchValue: string;
}

class App extends React.Component {
  cardsQuantity: number;
  _cardsPerRow: number;
  collection: Array<CardData>;

  constructor(props: Record<string, never>) {
    super(props);

    this.cardsQuantity = PHOTO_QUANTITY;
    this._cardsPerRow = CARDS_PER_ROW;
    this.collection = [];
  }
  state: AppState = {
    cards: null,
    isLoading: true,
    searchValue: '',
  };

  componentDidMount(): void {
    const searchValue = localStorage.getItem('searchValue');
    searchValue && this.setState({ searchValue: searchValue });

    this._parsePhotos(test as Array<ApiData>);
  }

  _parsePhotos(data?: Array<ApiData>) {
    if (data) {
      this.createCollection(data);
    } else {
      getRandomPhotos(this.cardsQuantity).then((data: Array<ApiData>) => {
        this.createCollection(data);
      });
    }
  }
  createCollection(data: Array<ApiData>) {
    const photoCollection: Array<CardData> = data.map((el) => {
      return {
        image: {
          small: el.urls.small,
          large: el.urls.full,
          webPage: el.links.html,
        },
        title: el.description,
        author: {
          username: el.user.username,
          link: el.user.links.html,
        },
        date: el.created_at,
        likes: el.likes,
      };
    });

    this.collection = photoCollection;
    this.setState({ isLoading: false, cards: photoCollection });
  }
  _setSearch(name: string) {
    this.setState({ searchValue: name });
  }
  render() {
    return (
      <div className="App container">
        <div className="container-search">
          <Search value={this.state.searchValue} changeHandler={this._setSearch.bind(this)} />
        </div>
        <div className="content">
          <div className="grid">
            {this.state.isLoading === true
              ? null
              : this.state
                  .cards!.filter((el) => {
                    const name = el.author.username.toLowerCase();
                    return name.includes(this.state.searchValue);
                  })
                  .map((el, index) => {
                    return <Card key={`c-${index}`} data={el} />;
                  })}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
