import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-empty-state',
    imports: [MatIconModule, MatButtonModule],
    templateUrl: './empty-state.component.html',
    styleUrl: './empty-state.component.scss',
})
export class EmptyStateComponent {
    icon = input<string>('inbox');
    title = input<string>('暂无数据');
    description = input<string>('当前没有找到任何相关记录。');
}
