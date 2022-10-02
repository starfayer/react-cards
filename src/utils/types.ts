export interface CardData {
  image: {
    small: string;
    large: string;
    webPage: string;
  };
  title?: string;
  author: {
    username: string;
    link: string;
  };
  date: string;
  likes?: number;
}

export interface ApiData {
  created_at: string;
  description: string;
  urls: {
    small: string;
    full: string;
  };
  links: {
    html: string;
  };
  likes: number;
  user: {
    username: string;
    links: {
      html: string;
    };
  };
}
