import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.html',
  styleUrls: ['./banner.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Banner {

  private _bannerClass: string;

  @Input()
  public set bannerClass(_bannerClass: string) {
    this._bannerClass = _bannerClass;
  }

  public get bannerClass() {
    return `banner ${this._bannerClass}`;
  }

  @Input()
  public text: string;

}
