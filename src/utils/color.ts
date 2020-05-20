export const getRandomHexColor = (brightness=0): string => {
    const values: string = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < 6; i++) {
        color = color.concat(values[Math.min(Math.floor(Math.random() * values.length + brightness), values.length - 1)]);
    }
    return color;
};