import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TorrentsService } from '../../../services/api/torrents/torrents.service';

@Component({
  selector: 'app-torrent-active-providers',
  templateUrl: './torrent-active-providers.component.html',
  styleUrls: ['./torrent-active-providers.component.scss']
})
export class TorrentActiveProvidersComponent implements OnInit {

  providers: Array<any>;
  categories: Array<any>;
  @Input() parentForm: FormGroup;

  constructor(private torrentsService: TorrentsService) {}

  async ngOnInit(): Promise<any> {
    this.providers = await this.torrentsService.getActiveProviders();
  }

  updateCategories(): void {
    this.categories = this.providers.find(p => p.name === this.parentForm.get('provider').value).categories;
  }
}
