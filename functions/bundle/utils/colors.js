// From https://css-tricks.com/snippets/javascript/lighten-darken-color/
const lightenDarkenColor = (color, amt) => {
    let col = rgbToHex(color.r, color.g, color.b);
    let usePound = true;

    if (col[0] === '#') {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00ff) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000ff) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    [r, g, b] = [r, g, b].map((color) =>
        color <= 15 ? `0${color.toString(16)}` : color.toString(16)
    );

    return (usePound ? '#' : '') + r + b + g;
};

// From https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb#answer-39077686
const rgbToHex = (r, g, b) => {
    return (
        '#' +
        [r, g, b]
            .map((x) => {
                const hex = x.toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            })
            .join('')
    );
};

const getRGB = (rgb) => {
    // remove rgb
    const withoutRgb = rgb.replace('rgb', '');

    // remove parents
    const withoutParens = withoutRgb.replace('(', '').replace(')', '');

    // remove spaces
    const withoutSpaces = withoutParens.replaceAll(' ', '');

    // split values
    const values = withoutSpaces.split(',');

    return {
        r: Number(values[0]),
        g: Number(values[1]),
        b: Number(values[2]),
    };
};

module.exports = { lightenDarkenColor, rgbToHex, getRGB };
