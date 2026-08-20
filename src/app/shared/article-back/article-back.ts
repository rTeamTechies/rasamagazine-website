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
  private observer?: IntersectionObserver;

  visible = false;

  ngAfterViewInit(): void {
    const el = this.sentinel()?.nativeElement;
    if (!el) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          this.visible = entry.isIntersecting;
        }
        this.cdr.markForCheck();
      },
      { threshold: 0, rootMargin: '0px 0px -15% 0px' },
    );
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
