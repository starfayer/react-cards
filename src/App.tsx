import React from 'react';
import { Search } from 'components/Search';
import { Card } from 'components/Card';
import { Skeleton } from 'components/Skeleton';
import { getRandomPhotos } from 'utils/pApi';
import { CardData, ApiData } from 'utils/types';
import './App.css';

import test from './utils/test.json';

const PHOTO_QUANTITY = 10;
const CARDS_PER_ROW = 3;

interface AppState {
  isLoading: boolean;
  cards: Array<CardData> | null;
}

class App extends React.Component {
  cardsQuantity: number;
  _cardsPerRow: number;

  constructor(props: Record<string, never>) {
    super(props);

    this.cardsQuantity = PHOTO_QUANTITY;
    this._cardsPerRow = CARDS_PER_ROW;
  }
  state: AppState = {
    cards: null,
    isLoading: true,
  };

  componentDidMount() {
    // this._parsePhotos();
    this._setTestPhotos();
  }

  _setTestPhotos() {
    const arr = test as Array<ApiData>;
    const photoCollection: Array<CardData> = arr.map((el) => {
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
    this.setState({ isLoading: false, cards: photoCollection });
  }
  _parsePhotos() {
    getRandomPhotos(this.cardsQuantity).then((res: Array<ApiData>) => {
      const photoCollection: Array<CardData> = res.map((el) => {
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
      this.setState({ isLoading: false, cards: photoCollection });
    });
  }

  render() {
    return (
      <div className="App container">
        <div className="container-search">
          <Search />
        </div>
        <div className="content">
          <div className="grid">
            {this.state.isLoading === true
              ? new Array(this.cardsQuantity).fill(<Skeleton />)
              : this.state.cards!.map((el, index) => {
                  return <Card key={index} data={el} />;
                })}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
