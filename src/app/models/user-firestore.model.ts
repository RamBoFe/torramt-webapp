export interface UserFirestore {
  email: string;
  config: {
    nas: {
      protocol: 'http' | 'https';
      host: string;
      port: number;
      login: string;
      password: string;
      sharedFoldersMap?: {
        movies?: string;
        series?: string;
        games?: string;
      };
    };
    seedbox: {
      tag: string;
    };
  };
}
