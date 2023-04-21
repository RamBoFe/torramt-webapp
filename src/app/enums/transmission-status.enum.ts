export enum TRANSMISSION_STATUS {
  STOPPED = 0, // Torrent is stopped
  CHECK_WAIT = 1, // Queued to check files
  CHECK = 2, // Checking files
  DOWNLOAD_WAIT = 3, // Queued to download
  DOWNLOAD = 4, // Downloading
  SEED_WAIT = 5, // Queued to seed
  SEED = 6, // Seeding
  ISOLATED = 7, // Torrent can't find peers
}
