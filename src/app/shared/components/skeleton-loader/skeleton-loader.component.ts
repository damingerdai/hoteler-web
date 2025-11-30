import {
    Component,
    OnInit,
    Input,
    isDevMode,
    OnDestroy,
    AfterViewInit,
    ChangeDetectionStrategy,
    OnChanges,
    SimpleChanges,
    inject,
} from '@angular/core';
import { start, end } from 'perf-marks/marks';
import {
    SkeletonLoaderConfig,
    SkeletonLoaderConfigTheme,
    SKELETON_LOADER_CONFIG,
} from './skeleton-loader-config.types';


@Component({
    selector: 'app-skeleton-loader',
    templateUrl: './skeleton-loader.component.html',
    styleUrls: ['./skeleton-loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonLoaderComponent
    implements OnInit, AfterViewInit, OnDestroy, OnChanges
{
    static ngAcceptInputType_count: number | string;

    static ngAcceptInputType_animation: boolean | string;

    @Input()
    count: SkeletonLoaderConfig['count'];

    @Input()
    loadingText: SkeletonLoaderConfig['loadingText'];

    @Input()
    appearance: SkeletonLoaderConfig['appearance'];

    @Input()
    animation: SkeletonLoaderConfig['animation'];

    @Input()
    ariaLabel: SkeletonLoaderConfig['ariaLabel'];

    @Input()
    theme: SkeletonLoaderConfigTheme;

    items: unknown[];

    constructor() {
        const config = inject<SkeletonLoaderConfig>(SKELETON_LOADER_CONFIG, {
            optional: true,
        });

        const {
            appearance = 'line',
            animation = 'progress',
            theme = null,
            loadingText = 'Loading...',
            count = 1,
            ariaLabel = 'loading',
        } = config || {};

        this.appearance = appearance;
        this.animation = animation;
        this.theme = theme;
        this.loadingText = loadingText;
        this.count = count;
        this.items = [];
        this.ariaLabel = ariaLabel;
    }

    ngOnInit() {
        start('SkeletonLoader:Rendered');
        start('SkeletonLoader:Loaded');

        this.validateInputValues();
    }

    private validateInputValues() {
        // Checking if it's receiving a numeric value (string having ONLY numbers or if it's a number)
        if (!/^\d+$/.test(`${this.count}`)) {
            // Shows error message only in Development
            if (isDevMode()) {
                console.error(
                    '`SkeletonLoaderComponent` need to receive \'count\' a numeric value. Forcing default to "1".'
                );
            }
            this.count = 1;
        }

        //Force count to 1 when custom-content is used
        if (this.appearance === 'custom-content') {
            // Shows error message only in Development
            if (isDevMode() && this.count !== 1) {
                console.error(
                    '`SkeletonLoaderComponent` enforces elements with "custom-content" appearance as DOM nodes. Forcing "count" to "1".'
                );
                this.count = 1;
            }
        }
        this.items.length = this.count;

        const allowedAnimations = [
            'progress',
            'progress-dark',
            'pulse',
            'false',
        ];
        if (allowedAnimations.indexOf(String(this.animation)) === -1) {
            // Shows error message only in Development
            if (isDevMode()) {
                console.error(
                    `\`SkeletonLoaderComponent\` need to receive 'animation' as: ${allowedAnimations.join(
                        ', '
                    )}. Forcing default to "progress".`
                );
            }
            this.animation = 'progress';
        }

        if (
            ['circle', 'line', 'custom-content', ''].indexOf(
                String(this.appearance)
            ) === -1
        ) {
            // Shows error message only in Development
            if (isDevMode()) {
                console.error(
                    "`SkeletonLoaderComponent` need to receive 'appearance' as: circle or line or custom-content or empty string. Forcing default to \"''\"."
                );
            }
            this.appearance = '';
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        // Avoiding multiple calls for the same input in case there's no changes in the fields
        // Checking if the fields that require validation are available and if they were changed
        // In case were not changed, we stop the function. Otherwise, `validateInputValues` will be called.
        if (
            ['count', 'animation', 'appearance'].find(
                (key) =>
                    changes[key] &&
                    (changes[key].isFirstChange() ||
                        changes[key].previousValue ===
                            changes[key].currentValue)
            )
        ) {
            return;
        }

        this.validateInputValues();
    }

    ngAfterViewInit() {
        end('SkeletonLoader:Rendered');
    }

    ngOnDestroy() {
        end('SkeletonLoader:Loaded');
    }
}
