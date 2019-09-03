import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { FtpService } from '../../services/api/ftp/ftp.service';
import { TransmissionService } from '../../services/api/torrents/management/transmission';

@Component({
  selector: 'app-seedbox',
  templateUrl: './seedbox.component.html',
  styleUrls: ['./seedbox.component.scss']
})
export class SeedboxComponent implements OnInit {

  torrents: Array<Object>;
  totalSize: Number = 0;
  totalTorrents: Number = 0;

  constructor(
    private transmission: TransmissionService,
    private ftp: FtpService
    ) { }

  async ngOnInit(): Promise<any> {
    this.torrents = await this.getTorrents();
    this.totalTorrents = this.torrents.length;
    this.totalSize = await this.ftp.getSize('/RamBoF');

    interval(2500)
      .subscribe(async () => this.torrents = await this.getTorrents());
  }

  async getTorrents(): Promise<any> {
    const torrents = await this.transmission.getTorrents();

    return torrents;
  }

  async togglePlayPause(status: Number, hash: String): Promise<any> {
    if (status) {
      this.transmission.stop(hash);
    } else {
      this.transmission.start(hash);
    }
  }

  async remove(hash: String): Promise<any> {
    this.transmission.remove(hash);
  }
}
