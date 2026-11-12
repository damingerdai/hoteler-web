import { TestBed } from '@angular/core/testing';

import { FontLoader } from './font-loader';
import { Observer } from 'tfontfaceobserver';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { StyleManager } from '../services/style-manager/style-manager';

vi.spyOn(Observer.prototype, 'load').mockReturnValue(Promise.resolve());

describe('FontLoader', () => {
    let service: FontLoader;
    let styleManagerSpy: { setStyle: ReturnType<typeof vi.fn> };

    beforeEach(() => {
        // 使用 vi.fn() 创建模拟方法
        styleManagerSpy = {
            setStyle: vi.fn(),
        };

        TestBed.configureTestingModule({
            providers: [
                FontLoader,
                { provide: StyleManager, useValue: styleManagerSpy }
            ]
        });

        service = TestBed.inject(FontLoader);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should resolve successfully when font loads successfully', async () => {
        // 模拟字体加载成功
        vi.mocked(Observer.prototype.load).mockReturnValue(Promise.resolve());

        await expect(service.load()).resolves.toBeUndefined();
        // 确保没有调用备用的样式设置
        expect(styleManagerSpy.setStyle).not.toHaveBeenCalled();
    });

    it('should fallback to setStyle when font loading fails', async () => {
        // 模拟字体加载失败
        vi.mocked(Observer.prototype.load).mockReturnValue(Promise.reject('Load failed'));

        await expect(service.load()).resolves.toBeUndefined(); // 内部 catch 进行了 resolve

        // 验证是否正确设置了备用样式
        expect(styleManagerSpy.setStyle).toHaveBeenCalledTimes(2);
        expect(styleManagerSpy.setStyle).toHaveBeenCalledWith(
            'font-fmaily',
            'https://fonts.loli.net/css2?family=Roboto:wght@300;400;500&display=swap'
        );
        expect(styleManagerSpy.setStyle).toHaveBeenCalledWith(
            'font-icon',
            'https://fonts.loli.net/icon?family=Material+Icons'
        );
    });
});

