interface Window {
  app: any;
  _: any;
}

interface FourSquareCategory {
  name: string;
  primary?: boolean;
}

interface FourSquareVenue {
  jake?: boolean;
  name: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  contact: {
    phone?: string;
  };
  categories: Array<FourSquareCategory>;
}
