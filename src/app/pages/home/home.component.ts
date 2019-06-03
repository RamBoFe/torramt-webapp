import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { YggService } from '../../services/api/torrents/ygg.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  torrents: Array<any>;
  wordSubscription: Subscription;
  searchForm: FormGroup;

  constructor(
    private yggService: YggService,
    private formBuilder: FormBuilder
    ) {}

  async ngOnInit() {
    // this.wordSubscription = this.wordsApiService.wordSubject.subscribe(
    //   (words: Array<any>) => {
    //     this.words = words;
    // });

    // this.wordsApiService.getWords();
    // this.words = await this.wordsApiService.asyncGetWords();
    this.initForm();
  }

  initForm(): void {
    this.searchForm = this.formBuilder.group({
      search: ''
    });
  }

  async onSubmitForm() {
    const formValue = this.searchForm.value;
    console.log(formValue);
    this.torrents = await this.yggService.getSearch(formValue);
  }

  ngOnDestroy(): void {
    this.wordSubscription.unsubscribe();
  }
}
