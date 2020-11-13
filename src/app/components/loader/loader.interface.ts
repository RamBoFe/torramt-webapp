export interface EndPointInterface {
  url: string;
  param?: {
    key: string;
    value: string | object;
    keyId: string;
  };
}
