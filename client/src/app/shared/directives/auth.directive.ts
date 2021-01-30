import { AppStateSelectors } from './../../store/appState/appState.selectors';
import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  OnInit,
  OnDestroy,
  Input,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appIsAuth]',
})
export class AuthDirective implements OnInit, OnDestroy {
  @Input() appIsAuth: boolean;

  private subs = new Subscription();
  constructor(
    private template: TemplateRef<any>,
    private container: ViewContainerRef,
    private store: Store
  ) {}

  ngOnInit(): void {
    const sub = this.store
      .select(AppStateSelectors.auth)
      .pipe()
      .subscribe((auth: boolean) => {
        this.container.clear();

        if (!this.appIsAuth && this.appIsAuth === auth) {
          this.container.createEmbeddedView(this.template);
        }

        if (this.appIsAuth && this.appIsAuth === auth) {
          this.container.createEmbeddedView(this.template);
        }
      });

    this.subs.add(sub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
