import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MDBModalService } from 'angular-bootstrap-md';
import { ModalTorrentDetailsComponent } from '../../components/modals/modal-torrent-details/modal-torrent-details.component';
import { TorrentsService } from '../../services/api/torrents/torrents.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  torrents: Array<any>;
  searchForm: FormGroup;
  notification: Object = {};

  constructor(
    private torrentsService: TorrentsService,
    private formBuilder: FormBuilder,
    private modalService: MDBModalService
    ) {}

  async ngOnInit(): Promise<any> {
    this.initForm();
  }

  initForm(): void {
    this.searchForm = this.formBuilder.group({
      searchValue: '',
      provider: '',
      category: ''
    });
  }

  async onSubmitForm(): Promise<any> {
    this.torrents = await this.torrentsService.getSearch(this.searchForm.value);
  }

  async addTorrentToDl(i: number): Promise<any> {
    const infos = await this.torrentsService.addTorrentToDl(this.torrents[i]);
    Object.assign(
      this.notification,
      {
        message: `Le torrent "${infos.name}" a bien été ajouté au téléchargement.`
      }
    );
  }

  hasNotifications(): boolean {
    return Object.keys(this.notification).length > 0;
  }

  closeNotification(): void {
    this.notification = {};
  }

  async openModalTorrentDetails(i: number): Promise<any> {
    this.modalService.show(ModalTorrentDetailsComponent, {
      class: 'modal-dialog-scrollable',
      data: { torrent: this.torrents[i] }
    });
  }
}
