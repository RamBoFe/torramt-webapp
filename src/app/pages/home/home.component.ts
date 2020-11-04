import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CollapseComponent, MDBModalService } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Torrent } from '../../common/torrent/torrent.interface';
import { ModalTorrentDetailsComponent } from '../../components/modals/modal-torrent-details/modal-torrent-details.component';
import { TorrentsService } from '../../services/api/torrents/torrents.service';
import { LoaderService } from '../../services/loader.service';
import { TorrentsSortService } from '../../services/torrent/torrents-sort.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  @ViewChild(CollapseComponent) search: CollapseComponent;

  torrents: Array<Torrent>;
  searchForm: FormGroup;
  searchAdvanced = false;

  constructor(
    private torrentsService: TorrentsService,
    private formBuilder: FormBuilder,
    private modalService: MDBModalService,
    private toastr: ToastrService,
    private torrentsSortService: TorrentsSortService
    ) {}

  ngOnInit(): void {
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
    const torrents = await this.torrentsService.getSearch(this.searchForm.value);
    this.torrents = this.torrentsSortService.sortByBestMatch(torrents);
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

  onChangeSort(event: any): void {
    switch (event.target.value) {
      case 'asc':
        this.torrents = this.torrentsSortService.sortByAsc(this.torrents);
        break;

      case 'desc':
       this.torrents = this.torrentsSortService.sortByDesc(this.torrents);
       break;

      case 'seeds':
       this.torrents = this.torrentsSortService.sortBySeeds(this.torrents);
       break;

      case 'dateAsc':
       this.torrents = this.torrentsSortService.sortByDateAsc(this.torrents);
       break;

      case 'dateDesc':
        this.torrents = this.torrentsSortService.sortByDateDesc(this.torrents);
        break;

      default:
        this.torrents = this.torrentsSortService.sortByBestMatch(this.torrents);
        break;
    }
  }

  showSearchAdvanced(): void {
    this.search.toggle();
    this.searchAdvanced = !this.searchAdvanced;
  }
}
