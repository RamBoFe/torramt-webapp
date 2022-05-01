import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
import {SortByEnum} from '../../enums/sort-by.enum';

interface LastSearch {
  torrents: Torrent[];
  maxDisplayedTorrents: number;
  sortBy: SortByEnum;
  search: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('bounceIn', [transition(':enter', useAnimation(bounceIn))]),
  ],
})
export class SearchComponent implements OnInit, OnDestroy {
  /**
   * Number of torrents displayed by default.
   *
   * @private
   */
  private readonly TORRENTS_PER_PAGE = 15;

  /**
   * Save the state of last search.
   *
   * @private
   */
  private static lastSearch: LastSearch = {
    torrents: undefined,
    sortBy: undefined,
    search: undefined,
    maxDisplayedTorrents: undefined,
  };

  /**
   * Reference to SortByEnum for being accessible in the DOM.
   */
  sortByEnum = SortByEnum;

  /**
   * The selected sort.
   */
  sortBy = SortByEnum.BEST_MATCH;

  /**
   * Reference to the search input.
   */
  @ViewChild('searchField') searchField: ElementRef<HTMLInputElement>;

  /**
   * Search form.
   */
  searchForm: FormGroup;

  /**
   * Flag to collapse or not the search advanced.
   */
  searchAdvanced = false;

  /**
   * Maximum number of torrents to display.
   */
  maxDisplayedTorrents: number;

  /**
   * List of torrents.
   */
  torrents: Torrent[] = [];

  /**
   * List of providers.
   */
  providers: Provider[];

  /**
   * List of categories.
   */
  categories: string[];

  /**
   * Flag indicating that a search query is loading.
   */
  isLoading = false;

  /**
   * Flag indicating if a torrent is being added to the seedbox.
   */
  isAddingTorrent = new SelectionModel<Torrent>(false, []);

  constructor(
    public torrentsService: TorrentsService,
    private formBuilder: FormBuilder,
    private torrentsSortService: TorrentsSortService,
    private readonly dialogService: MatDialog,
    private snackBarService: MatSnackBar
  ) {}

  ngOnDestroy(): void {
    if (this.torrents.length) {
      SearchComponent.lastSearch.torrents = this.torrents;
      SearchComponent.lastSearch.sortBy = this.sortBy;
      SearchComponent.lastSearch.search = this.searchForm.get('search').value;
      SearchComponent.lastSearch.maxDisplayedTorrents =
        this.maxDisplayedTorrents;
    }
  }

  async ngOnInit(): Promise<void> {
    if (SearchComponent.lastSearch?.torrents) {
      this.torrents = SearchComponent.lastSearch.torrents;
      this.sortBy = SearchComponent.lastSearch.sortBy;
      this.maxDisplayedTorrents =
        SearchComponent.lastSearch.maxDisplayedTorrents;
    }
    await this.initForm();
  }

  /**
   * Add a torrent to the seedbox.
   *
   * @param torrent The torrent to add
   */
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

  /**
   * Open the dialog to display torrent details.
   *
   * @param torrent The torrent to get details
   */
  async onOpenDialogTorrentDetails(torrent: Torrent): Promise<void> {
    this.dialogService.open(DialogTorrentDetailsComponent, {
      data: {torrent},
      hasBackdrop: true,
    });
  }

  /**
   * Triggered on form submission.
   */
  async onSubmitedForm(): Promise<void> {
    if (this.searchForm.valid) {
      this.torrents = [];
      this.maxDisplayedTorrents = this.TORRENTS_PER_PAGE;
      this.searchAdvanced = false;
      this.isLoading = true;
      this.torrents = await this.torrentsService.getSearch(
        this.searchForm.value
      );
      this.onChangeSort();
      this.isLoading = false;
    }
  }

  /**
   * Triggered on sort change.
   */
  onChangeSort(): void {
    // Array clone to launch animation on all torrents items when sorting.
    this.torrents = JSON.parse(JSON.stringify(this.torrents));

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

  /**
   * Triggered on clearing the search field.
   */
  onClearedSearchField() {
    this.searchForm.get('search').setValue('');
    this.searchField.nativeElement.focus();
  }

  /**
   * Triggered when clicking on the "More results" button.
   */
  onShowMore() {
    this.maxDisplayedTorrents += this.TORRENTS_PER_PAGE;
  }

  /**
   * Initializes the form and the default values.
   *
   * @private
   */
  private async initForm(): Promise<void> {
    this.searchForm = this.formBuilder.group({
      search: new FormControl(
        SearchComponent.lastSearch.search,
        Validators.required
      ),
      provider: '',
      category: '',
    });

    await this.initFormDefaultValues();
  }

  /**
   * Initializes the default values of the form.
   *
   * @private
   */
  private async initFormDefaultValues(): Promise<void> {
    this.providers = await this.torrentsService.getActiveProviders();
    this.searchForm.get('provider').setValue(this.providers[0].name);
    this.categories = this.providers.find(
      p => p.name === this.searchForm.get('provider').value
    ).categories;
    this.searchForm.get('category').setValue(this.categories[0]);
  }
}
