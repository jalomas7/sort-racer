export const getRandomHexColor = (brightness = 0): string => {
    const values: string = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color = color.concat(
            values[Math.min(Math.floor(Math.random() * values.length + brightness), values.length - 1)],
        );
    }
    return color;
};

export const getRandomHexColors = (n = 1, brightness = 0): string[] => {
    const colors: string[] = [];

    for (let i = 0; i < n; i++) {
        const newColor: string = getRandomHexColor(brightness);
        if (colors.some((v) => v === newColor)) {
            i--;
            continue;
        }

        colors.push(newColor);
    }

    return colors;
};

export const isDark = (color: string): boolean => {
    if (!color) {
        return false;
    }

    const pureColor = color.slice(1, color.length);

    if (pureColor.length !== 6) {
        return false;
    }

    const R = parseInt(pureColor.slice(0, 2), 16);
    const G = parseInt(pureColor.slice(2, 4), 16);
    const B = parseInt(pureColor.slice(4, 6), 16);

    return R + G + B < 382;
};
