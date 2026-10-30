import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.css'],
  standalone: false,
})
export class ExperimentComponent implements OnInit, OnDestroy {

  // Placeholder photos from picsum.photos; fixed seeds keep them the same on every visit.
  readonly slides = ['core-1', 'core-2', 'core-3'].map(seed => `https://picsum.photos/seed/${seed}/1200/500`);
  current = 0;
  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.timer = setInterval(() => (this.current = (this.current + 1) % this.slides.length), 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
