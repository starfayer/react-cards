import * as React from 'react';
import { Card } from 'components/Card';

import { getRandomPhotos } from 'utils/pApi';
import { CardData, ApiData } from 'utils/types';

const PHOTO_QUANTITY = 9;

interface GalleryProps {
  data?: Array<ApiData>;
  cardsQuantity?: number;
  filterValue: string;
}
interface GalleryState {
  collection: Array<CardData>;
  isLoading: boolean;
}
class Gallery extends React.Component<GalleryProps> {
  //TODO how to change this declaration??
  _dataLayout: GalleryProps['data'];
  _cardsQuantity: number;
  filterValue: GalleryProps['filterValue'];

  constructor(props: GalleryProps) {
    super(props);

    this._dataLayout = props.data;
    this._cardsQuantity = props.cardsQuantity || PHOTO_QUANTITY;
    this.filterValue = props.filterValue || '';
  }
  state: GalleryState = {
    collection: [],
    isLoading: true,
  };

  componentDidMount() {
    this._parsePhotos();
  }
  createSetCollection(data: Array<ApiData>) {
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

    this.setState({ collection: photoCollection, isLoading: false });
  }
  _parsePhotos(data?: GalleryProps['data']) {
    const initialData = data || this._dataLayout;
    if (initialData) {
      this.createSetCollection(initialData);
    } else {
      getRandomPhotos(this._cardsQuantity).then((data: Array<ApiData>) => {
        this.createSetCollection(data);
      });
    }
  }
  render() {
    let cardsCollection = null;
    if (!this.state.isLoading) {
      cardsCollection = this.state
        .collection!.filter((el) => {
          const name = el.author.username.toLowerCase();
          return name.includes(this.filterValue);
        })
        .map((el, index) => {
          return <Card key={`c-${index}`} data={el} />;
        });
    }
    return <div className="grid">{cardsCollection}</div>;
  }
}

export { Gallery };
