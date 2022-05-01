export interface SeedboxTorrent {
  id: number;
  hashString: string;
  name: string;
  status: number;
  totalSize: number;
  uploadRatio: number;
  uploadedEver: number;
  percentDone: number;
  rateDownload: number;
  rateUpload: number;
  doneDate: number;
  downloadedEver: number;
  leftUntilDone: number;
  files: {
    name: string;
    length: number;
    bytesCompleted: number;
  }[];
}
