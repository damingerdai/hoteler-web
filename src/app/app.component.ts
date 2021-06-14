import { AfterContentInit, ChangeDetectorRef, Component, ContentChildren, QueryList, Renderer2 } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { MatIconService } from './core/bootstrap/mat-icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {

  @ContentChildren(MatIcon)
  private icons: QueryList<MatIcon>;

  constructor(
    private renderer: Renderer2,
    private matIconServicee: MatIconService,
    private cd: ChangeDetectorRef,
  ) {

  }

  ngAfterContentInit(): void {
    const fontLoadFunc = observer => {
      this.matIconServicee.load().then(() => observer.next())
        .catch(() => observer.error())
        .finally(() => observer.complete());
    }
    new Observable(fontLoadFunc).subscribe(() => {
      this.icons.forEach(icon =>
        this.renderer.setStyle(icon, 'display', 'inline-block', 1)
      );
      this.icons.forEach(icon =>
        this.renderer.addClass(icon, 'mat-icons-loaded')
      );
      this.icons.forEach(icon =>
        console.log(icon)
      );
      console.log(this.icons);
      console.log('loaded');
    }, () => {
      this.icons.forEach(icon =>
        this.renderer.setStyle(icon, 'display', 'none', 1)
      );
      this.icons.forEach(icon =>
        this.renderer.addClass(icon, 'mat-icons-error')
      );
      console.log('error');
    })
    // this.matIconServicee.load().then(() => {
    //   this.icons.forEach(icon =>
    //     this.renderer.setStyle(icon, 'display', 'inline-block', 1)
    //   );
    //   this.icons.forEach(icon =>
    //     this.renderer.addClass(icon, 'mat-icons-loaded')
    //   );
    //   this.cd.markForCheck();
    // }).catch(() => {
    //   this.icons.forEach(icon =>
    //     this.renderer.setStyle(icon, 'display', 'none', 1)
    //   );
    //   this.icons.forEach(icon =>
    //     this.renderer.addClass(icon, 'mat-icons-error')
    //   );
    //   this.cd.markForCheck();
    // })
  }
}
