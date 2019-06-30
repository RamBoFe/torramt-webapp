import { Component, OnInit } from '@angular/core';
import { TransmissionService } from '../../services/api/torrents/management/transmission';

@Component({
  selector: 'app-seedbox',
  templateUrl: './seedbox.component.html',
  styleUrls: ['./seedbox.component.scss']
})
export class SeedboxComponent implements OnInit {

  torrents: Array<Object>;

  constructor(private transmission: TransmissionService) { }

  async ngOnInit(): Promise<any> {
    this.torrents = await this.getTorrents();
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
