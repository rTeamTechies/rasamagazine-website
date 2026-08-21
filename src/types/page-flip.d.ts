declare module 'page-flip/dist/js/page-flip.module.js' {
  export interface PageFlipSettings {
    startPage?: number;
    size?: 'fixed' | 'stretch';
    width: number;
    height: number;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    maxShadowOpacity?: number;
    showPageCorners?: boolean;
  }

  export interface PageFlipEvent {
    data: number;
    object: PageFlip;
  }

  export class PageFlip {
    constructor(element: HTMLElement, settings: PageFlipSettings);
    loadFromImages(images: string[]): void;
    updateFromImages(images: string[]): void;
    loadFromHTML(items: NodeListOf<HTMLElement> | HTMLElement[]): void;
    updateFromHtml(items: NodeListOf<HTMLElement> | HTMLElement[]): void;
    destroy(): void;
    update(): void;
    flipNext(): void;
    flipPrev(): void;
    getPageCount(): number;
    getCurrentPageIndex(): number;
    on(event: 'flip', handler: (event: PageFlipEvent) => void): void;
    on(event: 'init', handler: (event: PageFlipEvent) => void): void;
  }
}
