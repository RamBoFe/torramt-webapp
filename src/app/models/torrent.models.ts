export interface Torrent {
  id: number;
  title: string;
  time: string;
  size: string;
  desc: string;
  provider: string;
  link: string;
  peers: number;
  seeds: number;
}
