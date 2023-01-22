import React from 'react';
import { Card } from 'components/Card';
import { CardForm } from './CardForm';

import { getRandomPhotos, getPhotoByURI, getRandomUserPhotos } from 'utils/pApi';
import { CardData, FormData, ApiData } from 'utils/types';

const PHOTO_QUANTITY = 8;

interface GalleryProps {
  data?: Array<ApiData>;
  cardsQuantity?: number;
  filterValue: string;
  customForm: boolean;
}
interface GalleryState {
  collection: Array<CardData>;
  isLoading: boolean;
}
class Gallery extends React.Component<GalleryProps> {
  _handlers: {
    handleData: (data: FormData) => void;
  };
  _cardsQuantity: number;

  constructor(props: GalleryProps) {
    super(props);

    this._handlers = {
      handleData: this._onGetData.bind(this),
    };

    this._cardsQuantity = props.cardsQuantity || PHOTO_QUANTITY;
  }
  state: GalleryState = {
    collection: [],
    isLoading: true,
  };

  componentDidMount() {
    this._parsePhotos();
  }
  setGalleryData(data: Array<ApiData>) {
    const photoCollection = createCollection(data);
    this.setState({ collection: photoCollection, isLoading: false });
  }
  _parsePhotos(data?: GalleryProps['data']) {
    const initialData = data || this.props.data;
    if (initialData) {
      this.setGalleryData(initialData);
    } else {
      getRandomPhotos(this._cardsQuantity).then((data: Array<ApiData>) => {
        this.setGalleryData(data);
      });
    }
  }
  _onGetData(data: FormData) {
    const localData = this.state.collection;
    const authorName = data.authorNickname;

    if (data.imageLink !== undefined) {
      getPhotoByURI(data.imageLink).then((inputData) => {
        const customData = createCollection(inputData);
        this.setState({ collection: customData.concat(localData), isLoading: false });
      });
    } else if (data.authorLink !== undefined) {
      getRandomUserPhotos(data.authorLink!).then((inputData) => {
        const customData = createCollection([inputData[0]]);
        if (authorName) {
          customData[0].author.username = authorName;
        }
        this.setState({ collection: customData.concat(localData), isLoading: false });
      });
    }
  }
  render() {
    let cardsCollection = null;
    if (!this.state.isLoading) {
      cardsCollection = this.state
        .collection!.filter((el) => {
          const name = el.author.username.toLowerCase();
          return name.includes(this.props.filterValue);
        })
        .map((el, index) => {
          return <Card key={`c-${index}`} data={el} />;
        });
    }

    let cardForm = null;
    if (this.props.customForm) {
      cardForm = <CardForm dataHandler={this._onGetData.bind(this)} />;
    }
    return (
      <div className="grid">
        {cardForm}
        {cardsCollection}
      </div>
    );
  }
}

function createCollection(data: Array<ApiData>) {
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
  return photoCollection;
}
export { Gallery };
