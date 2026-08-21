import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Petal weight. Larger blooms carry thicker petals so they read at any size. */
export type FlowerVariant = 'bold' | 'medium' | 'soft' | 'fine';

interface Petals {
  core: number;
  rx: number;
  ry: number;
  /** Distance from centre for the four straight petals. */
  offset: number;
  /** Slightly shorter, so the diagonal petals keep the bloom circular. */
  diagonal: number;
}

const SHAPES: Record<FlowerVariant, Petals> = {
  bold: { core: 12, rx: 14, ry: 22, offset: 28, diagonal: 22 },
  medium: { core: 10, rx: 12, ry: 20, offset: 26, diagonal: 20 },
  soft: { core: 9, rx: 11, ry: 18, offset: 24, diagonal: 19 },
  fine: { core: 8, rx: 10, ry: 16, offset: 22, diagonal: 17 },
};

const CORNERS = [
  { x: -1, y: -1, angle: -45 },
  { x: 1, y: 1, angle: -45 },
  { x: 1, y: -1, angle: 45 },
  { x: -1, y: 1, angle: 45 },
];

/**
 * Decorative eight-petal bloom. Position, colour, and animation come from the
 * parent's own class on the host element — this only draws the shape.
 */
@Component({
  selector: 'app-flower',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 100 100" focusable="false">
      <g fill="currentColor">
        <circle cx="50" cy="50" [attr.r]="shape().core" />
        <ellipse cx="50" [attr.cy]="50 - shape().offset" [attr.rx]="shape().rx" [attr.ry]="shape().ry" />
        <ellipse cx="50" [attr.cy]="50 + shape().offset" [attr.rx]="shape().rx" [attr.ry]="shape().ry" />
        <ellipse [attr.cx]="50 - shape().offset" cy="50" [attr.rx]="shape().ry" [attr.ry]="shape().rx" />
        <ellipse [attr.cx]="50 + shape().offset" cy="50" [attr.rx]="shape().ry" [attr.ry]="shape().rx" />
        @for (petal of diagonalPetals(); track petal.transform) {
          <ellipse
            [attr.cx]="petal.cx"
            [attr.cy]="petal.cy"
            [attr.rx]="shape().rx"
            [attr.ry]="shape().ry"
            [attr.transform]="petal.transform"
          />
        }
      </g>
    </svg>
  `,
  styles: `
    :host {
      display: block;
    }

    svg {
      width: 100%;
      height: 100%;
      display: block;
    }
  `,
})
export class Flower {
  readonly variant = input<FlowerVariant>('medium');

  protected shape(): Petals {
    return SHAPES[this.variant()];
  }

  protected diagonalPetals() {
    const { diagonal } = this.shape();

    return CORNERS.map(({ x, y, angle }) => {
      const cx = 50 + x * diagonal;
      const cy = 50 + y * diagonal;
      return { cx, cy, transform: `rotate(${angle} ${cx} ${cy})` };
    });
  }
}
