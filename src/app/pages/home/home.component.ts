import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CollapseComponent, MDBModalService } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';
import { ModalTorrentDetailsComponent } from '../../components/modals/modal-torrent-details/modal-torrent-details.component';
import { TorrentsService } from '../../services/api/torrents/torrents.service';
import {TorrentsSortService} from "../../services/api/torrents/torrents-filter.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  @ViewChild(CollapseComponent) search: CollapseComponent;
  torrents: Array<any>;
  searchForm: FormGroup;
  searchAdvanced = false;
  torrentsSort;

  constructor(
    private torrentsService: TorrentsService,
    private formBuilder: FormBuilder,
    private modalService: MDBModalService,
    private toastr: ToastrService,
    private torrentsSortService: TorrentsSortService
    ) {}

  async ngOnInit(): Promise<any> {
    this.initForm();
  }

  async initForm(): Promise<any> {
    this.searchForm = this.formBuilder.group({
      searchValue: '',
      provider: '',
      category: ''
    });
  }

  async onSubmitForm(): Promise<any> {
    const torrents = await this.torrentsService.getSearch(this.searchForm.value);
    this.torrents = torrents;
    // console.log(this.torrentsSortService.sort());
    this.torrents = this.torrentsSortService.sort([]);
  }

  async addTorrentToDl(i: number): Promise<any> {
    const infos = await this.torrentsService.addTorrentToDl(this.torrents[i]);
    this.toastr.success (`Le torrent "${infos.name}" a bien été ajouté au téléchargement.`, 'Torrent ajouté !');
  }

  async openModalTorrentDetails(i: number): Promise<any> {
    this.modalService.show(ModalTorrentDetailsComponent, {
      class: 'modal-dialog-scrollable modal-lg',
      data: { torrent: this.torrents[i] }
    });
  }

  showSearchAdvanced(): void {
    this.search.toggle();
    this.searchAdvanced = !this.searchAdvanced;
  }
}
