import { beforeEach } from 'vitest';

// Keep browser storage independent of Node's optional file-backed localStorage.
class MemoryStorage implements Storage {
    private readonly items = new Map<string, string>();

    get length(): number {
        return this.items.size;
    }

    clear(): void {
        this.items.clear();
    }

    getItem(key: string): string | null {
        return this.items.get(String(key)) ?? null;
    }

    key(index: number): string | null {
        return Array.from(this.items.keys())[index] ?? null;
    }

    removeItem(key: string): void {
        this.items.delete(String(key));
    }

    setItem(key: string, value: string): void {
        this.items.set(String(key), String(value));
    }
}

const storage = new MemoryStorage();

// Explicitly replace both globals without reading Node's localStorage getter.
for (const target of new Set([globalThis, window])) {
    Object.defineProperty(target, 'localStorage', {
        configurable: true,
        writable: true,
        value: storage,
    });
}

beforeEach(() => storage.clear());
