import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from '../config.service';




@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  guestbookName: string;
  constructor(private breakpointObserver: BreakpointObserver, private configService: ConfigService) {
    this.configService.fetchConfig("guestbook_name").subscribe(conf => {
      this.guestbookName = conf;
    });
  }

}


