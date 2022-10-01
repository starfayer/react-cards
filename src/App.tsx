import React from 'react';
import { Search } from 'components/Search';
import { Card } from 'components/Card';
import { getRandomPhotos } from 'utils/pApi';
import { CardData, ApiData } from 'utils/types';
import './App.css';

const PHOTO_QUANTITY = 10;

interface AppState {
  photos: Array<CardData | null>;
}

class App extends React.Component {
  photoQuantity: number;

  constructor(props: Record<string, never>) {
    super(props);

    this.photoQuantity = PHOTO_QUANTITY;
  }
  state: AppState = {
    photos: [],
  };

  componentDidMount() {
    this._parsePhotos();
  }

  _parsePhotos() {
    getRandomPhotos(this.photoQuantity).then((res: Array<ApiData>) => {
      const photoCollection: Array<CardData> = res.map((el) => {
        return {
          image: el.urls.small,
          title: el.description,
          author: {
            username: el.user.username,
            link: el.user.links.html,
          },
          date: el.created_at,
          likes: el.likes,
        };
      });

      this.setState({ photos: photoCollection });
    });
  }

  render() {
    return (
      <div className="App container">
        <div className="container-search">
          <Search />
        </div>
        <div className="content">
          <Card />
        </div>
      </div>
    );
  }
}
export default App;
