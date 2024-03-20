export interface UserFirestore {
  email: string;
  config: {
    nas: {
      protocol: 'http' | 'https';
      host: string;
      port: number;
      login: string;
      password: string;
    };
    seedbox: {
      tag: string;
    };
  };
}
