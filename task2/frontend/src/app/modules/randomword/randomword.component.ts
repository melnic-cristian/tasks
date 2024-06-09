import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { RandomwordService } from './services/randomword.service';
import { RandomwordState, SetCurrentWord, SetIsRunning } from './state/randomword.state';

@Component({
  selector: 'app-randomword',
  templateUrl: './randomword.component.html',
  styleUrls: ['./randomword.component.scss']
})
export class RandomwordComponent implements OnInit, OnDestroy {
  @Select(RandomwordState.getCurrentWord) currentWord$!: Observable<string>;
  @Select(RandomwordState.getIsRunning) isRunning$!: Observable<boolean>;

  private subscription: Subscription = new Subscription();

  constructor(private store: Store, private randomwordService: RandomwordService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.randomwordService.getWord().subscribe(word => {
        this.store.dispatch(new SetCurrentWord(word));
      })
    );

    this.subscription.add(
      this.isRunning$.subscribe(isRunning => {
        if (isRunning) {
          this.randomwordService.start();
        } else {
          this.randomwordService.stop();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleStartStop(): void {
    this.isRunning$.pipe(take(1)).subscribe(isRunning => {
      this.store.dispatch(new SetIsRunning(!isRunning));
    });
  }
}
