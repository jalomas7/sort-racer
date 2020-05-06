export const getRandomHexColor = (): string => {
    const values: string = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < 6; i++) {
        color = color.concat(values[Math.floor(Math.random() * values.length)]);
    }
    return color;
};