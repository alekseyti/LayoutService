import {Injectable} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

export const CustomBreakpointNames = {
  extraSmall: 'extraSmall',
  extraLarge: 'extraLarge'
}

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  activeBreakpoints: string[] = [];

  constructor(private breakpointObserver: BreakpointObserver) { }

  breakpoints: object = {
    '(max-width: 220px)': CustomBreakpointNames.extraSmall,
    '(min-width: 2400px)': CustomBreakpointNames.extraLarge
  }
  
  readonly $onResize: Observable<IWindowResize> = fromEvent(window, 'resize')
  .pipe(
    startWith(window), // to provide initial size event
    debounceTime(20), // to avoid producing events too fast
    map(() => ({width: window.innerWidth, height: window.innerHeight}))
  );

  subscribeToLayoutChanges() {
    return this.breakpointObserver
    .observe(Object.keys(this.breakpoints))
    .pipe(map((observeResponse) => this.parseBreakpointsResponse(observeResponse.breakpoints)))
  }

  parseBreakpointsResponse(breakpoints): string[] {
    this.activeBreakpoints = [];

    Object.keys(breakpoints).map((key) => {
      if (breakpoints[key]) {
        this.activeBreakpoints.push(this.breakpoints[key])
      }
    })

    return this.activeBreakpoints;
  }

  isBreakpointActive(breakpointName) {
    return this.activeBreakpoints.find(breakpoint => breakpoint === breakpointName)
  }
  


}


//other component
// this.layoutService.subscribeToLayoutChanges().pipe(
//   takeUntil(this.destroy)
// ).subscribe(observerResponse => {
//   if (this.layoutService.isBreakpointActive(CustomBreakpointNames.extraSmall)) {

//   }
// })

//     this.layoutService.$onResize.pipe(
//       takeUntil(this.destroy)
//     ).subscribe(r => {

//     })



