import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MDBModalService } from 'angular-bootstrap-md';
import { ModalTorrentDetailsComponent } from '../../components/modals/modal-torrent-details/modal-torrent-details.component';
import { YggService } from '../../services/api/torrents/ygg.service';

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
    private yggService: YggService,
    private formBuilder: FormBuilder,
    private modalService: MDBModalService
    ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.searchForm = this.formBuilder.group({
      search: ''
    });
  }

  async onSubmitForm(): Promise<any> {
    const formValue = this.searchForm.value;
    this.torrents = await this.yggService.getSearch(formValue.search);
  }

  async addTorrentToDl(i: number): Promise<any> {
    const infos = await this.yggService.addTorrentToDl(this.torrents[i]);
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
