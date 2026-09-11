import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  inject,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article-back',
  imports: [RouterLink],
  templateUrl: './article-back.html',
  styleUrl: './article-back.scss',
})
export class ArticleBack implements AfterViewInit, OnDestroy {
  @Input({ required: true }) backLink!: string;
  @Input({ required: true }) backLabel!: string;

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly sentinel = viewChild<ElementRef<HTMLElement>>('sentinel');
  private nearEnd = false;
  private footerInView = false;
  private endObserver?: IntersectionObserver;
  private footerObserver?: IntersectionObserver;

  get visible(): boolean {
    return this.nearEnd;
  }

  get docked(): boolean {
    return this.footerInView;
  }

  ngAfterViewInit(): void {
    const el = this.sentinel()?.nativeElement;
    if (!el) return;

    this.endObserver = new IntersectionObserver(
      (entries) => {
        this.nearEnd = entries.some((entry) => entry.isIntersecting);
        this.cdr.detectChanges();
      },
      { threshold: 0, rootMargin: '120px 0px 0px 0px' },
    );
    this.endObserver.observe(el);
    this.watchFooter();
  }

  ngOnDestroy(): void {
    this.endObserver?.disconnect();
    this.footerObserver?.disconnect();
  }

  private watchFooter(attempt = 0): void {
    const footer = document.querySelector('app-site-footer');
    if (!footer) {
      if (attempt < 20) {
        requestAnimationFrame(() => this.watchFooter(attempt + 1));
      }
      return;
    }

    this.footerObserver = new IntersectionObserver(
      (entries) => {
        this.footerInView = entries.some((entry) => entry.isIntersecting);
        this.cdr.detectChanges();
      },
      { threshold: 0 },
    );
    this.footerObserver.observe(footer);
  }
}
