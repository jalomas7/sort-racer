export const shuffle = <T = any>(a: T[]): T[] => {
    for (let i = 0; i < a.length; i++) {
        const j: number = Math.floor(Math.random() * a.length);
        const v = a[i];
        const k = a[j];
        a[i] = k;
        a[j] = v;
    }

    return a;
};
