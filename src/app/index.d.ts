interface Window {
  app: any;
}

interface FourSquareCategory {
  name: string;
  primary?: boolean;
}

interface FourSquareVenue {
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
