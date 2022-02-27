import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Torrent} from '../../models/torrent.models';
import {TorrentsService} from '../../services/api/torrents/torrents.service';
import {TorrentsSortService} from '../../services/torrent/torrents-sort.service';
import {Provider} from '../../models/provider.model';
import {transition, trigger, useAnimation} from '@angular/animations';
import {bounceIn} from 'ng-animate';
import {MatDialog} from '@angular/material/dialog';
import {DialogTorrentDetailsComponent} from '../../components/modals/modal-torrent-details/modal-torrent-details.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SelectionModel} from '@angular/cdk/collections';
import { SortByEnum } from '../../enums/sort-by.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('bounceIn', [transition(':enter', useAnimation(bounceIn))]),
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  static readonly TORRENTS_PER_PAGE = 15;
  private static torrentsCache: Torrent[] = [];

  sortByEnum = SortByEnum;
  sortBy = SortByEnum.BEST_MATCH;

  /**
   * Search field
   */
  @ViewChild('searchField') searchField: ElementRef<HTMLInputElement>;
  searchForm: FormGroup;
  searchAdvanced = false;
  maxDisplayedItems: number;

  torrents: Torrent[] = [];
  providers: Provider[];
  categories: string[];

  isLoading = false;
  isAddingTorrent = new SelectionModel<Torrent>(false, []);

  bounceIn = 0;

  constructor(
    public torrentsService: TorrentsService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private torrentsSortService: TorrentsSortService,
    private readonly dialogService: MatDialog,
    private snackBarService: MatSnackBar
  ) {}

  ngOnDestroy(): void {
    HomeComponent.torrentsCache = this.torrents;
  }

  async ngOnInit(): Promise<void> {
    this.torrents = HomeComponent.torrentsCache;
    await this.initForm();
  }

  async onSubmitedForm(): Promise<void> {
    if (this.searchForm.valid) {
      this.torrents = [];
      this.searchAdvanced = false;
      this.isLoading = true;
      this.maxDisplayedItems = HomeComponent.TORRENTS_PER_PAGE;
      this.torrents = await this.torrentsService.getSearch(
        this.searchForm.value
      );
      this.onChangeSort();
      this.isLoading = false;
    }
  }

  async addTorrentToSeedbox(torrent: Torrent): Promise<void> {
    this.isAddingTorrent.select(torrent);
    await this.torrentsService.addTorrentToDl(torrent);
    this.isAddingTorrent.deselect(torrent);

    this.snackBarService.open(
      'Le torrent a bien été ajouté à la seedbox.',
      'FERMER',
      {duration: 5000}
    );
  }

  async onOpenDialogTorrentDetails(torrent: Torrent): Promise<void> {
    this.dialogService.open(DialogTorrentDetailsComponent, {
      data: {torrent},
      hasBackdrop: true,
    });
  }

  onChangeSort(): void {
    switch (this.sortBy) {
      case SortByEnum.ASC:
        this.torrents = this.torrentsSortService.sortByAsc(this.torrents);
        break;

      case SortByEnum.DESC:
        this.torrents = this.torrentsSortService.sortByDesc(this.torrents);
        break;

      case SortByEnum.SEEDS:
        this.torrents = this.torrentsSortService.sortBySeeds(this.torrents);
        break;

      case SortByEnum.DATE_ASC:
        this.torrents = this.torrentsSortService.sortByDateAsc(this.torrents);
        break;

      case SortByEnum.DATE_DESC:
        this.torrents = this.torrentsSortService.sortByDateDesc(this.torrents);
        break;

      default:
        this.torrents = this.torrentsSortService.sortByBestMatch(this.torrents);
        break;
    }
  }

  onClearedSearchField() {
    this.searchForm.get('search').setValue('');
    this.searchField.nativeElement.focus();
  }

  private async initForm(): Promise<void> {
    this.searchForm = this.formBuilder.group({
      search: new FormControl('', Validators.required),
      provider: '',
      category: '',
    });

    await this.initFormDefaultValues();
  }

  private async initFormDefaultValues(): Promise<void> {
    this.providers = await this.torrentsService.getActiveProviders();
    this.searchForm.get('provider').setValue(this.providers[0].name);
    this.categories = this.providers.find(
      p => p.name === this.searchForm.get('provider').value
    ).categories;
    this.searchForm.get('category').setValue(this.categories[0]);
  }

  onShowMore() {
    this.maxDisplayedItems += HomeComponent.TORRENTS_PER_PAGE;
  }
}
