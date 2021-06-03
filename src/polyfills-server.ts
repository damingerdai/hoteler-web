(global.window as any) = {};
global.document = {} as any;

// global['self'] = win
// global['IDBIndex'] = win.IDBIndex
global['window'] = {} as any;
global['document'] = {} as any;
global['navigator'] = {} as any;
global['getComputedStyle'] = (() => {}) as any;
