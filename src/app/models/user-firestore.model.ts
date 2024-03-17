export interface UserFirestore {
  email: string;
  config: {
    nas: {
      protocol: 'http' | 'https';
      host: string;
      port: number;
      user: string;
      pwd: string;
    };
    seedbox: {
      tag: string;
    };
  };
}
