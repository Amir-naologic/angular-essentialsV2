import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    /**
     * Renderer used to safely manipulate the DOM.
     */
    private renderer: Renderer2;
    /**
     * CSS class name used to apply dark mode styles.
     */
    private darkModeClass = 'dark-mode';


    constructor(rendererFactory: RendererFactory2) {
        // -->Init: renderer using the RendererFactory
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    /**
     * Adds or removes the dark mode class based on the isDark flag.
     */
    public toggleDarkMode(isDark: boolean): void {
        const body = document.body;
        if (isDark) {
            this.renderer.addClass(body, this.darkModeClass);
        } else {
            this.renderer.removeClass(body, this.darkModeClass);
        }
    }
}
