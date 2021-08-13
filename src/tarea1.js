const tarea1 = {
    grises1(canvas, ctx) {
        for (var i = 0; i < canvas.width; i++) {
            for (let j = 0; j < canvas.height; j++) {
                const imageData = ctx.getImageData(i, j, 1, 1);
                const gray = Math.trunc((imageData.data[0] + imageData.data[1] + imageData.data[2]) / 3);
                imageData.data[0] = gray;
                imageData.data[1] = gray;
                imageData.data[2] = gray;
                ctx.putImageData(imageData, i, j);
            }
        }

        return ctx;
    },

    grises2(canvas, ctx) {
        for (var i = 0; i < canvas.width; i++) {
            for (let j = 0; j < canvas.height; j++) {
                const imageData = ctx.getImageData(i, j, 1, 1);
                const gray = (imageData.data[0] * 0.3 + imageData.data[1] * 0.59 + imageData.data[2] * 0.11);
                imageData.data[0] = gray;
                imageData.data[1] = gray;
                imageData.data[2] = gray;
                ctx.putImageData(imageData, i, j);
            }
        }

        return ctx;
    },

    grises3(canvas, ctx) {
        for (var i = 0; i < canvas.width; i++) {
            for (let j = 0; j < canvas.height; j++) {
                const imageData = ctx.getImageData(i, j, 1, 1);
                const gray = (imageData.data[0] * 0.2126 + imageData.data[1] * 0.7152 + imageData.data[2] * 0.0722);
                imageData.data[0] = gray;
                imageData.data[1] = gray;
                imageData.data[2] = gray;
                ctx.putImageData(imageData, i, j);
            }
        }

        return ctx;
    },

    grises4(canvas, ctx) {
        for (var i = 0; i < canvas.width; i++) {
            for (let j = 0; j < canvas.height; j++) {
                const imageData = ctx.getImageData(i, j, 1, 1);
                const max = Math.max(imageData.data[0], imageData.data[1], imageData.data[2]);
                const min = Math.min(imageData.data[0], imageData.data[1], imageData.data[2]);
                const gray = Math.trunc((max + min) / 2);
                imageData.data[0] = gray;
                imageData.data[1] = gray;
                imageData.data[2] = gray;
                ctx.putImageData(imageData, i, j);
            }
        }

        return ctx;
    },

    grises5(canvas, ctx) {
        for (var i = 0; i < canvas.width; i++) {
            for (let j = 0; j < canvas.height; j++) {
                const imageData = ctx.getImageData(i, j, 1, 1);
                const max = Math.max(imageData.data[0], imageData.data[1], imageData.data[2]);
                imageData.data[0] = max;
                imageData.data[1] = max;
                imageData.data[2] = max;
                ctx.putImageData(imageData, i, j);
            }
        }

        return ctx;
    },

    grises6(canvas, ctx) {
        for (var i = 0; i < canvas.width; i++) {
            for (let j = 0; j < canvas.height; j++) {
                const imageData = ctx.getImageData(i, j, 1, 1);
                const min = Math.min(imageData.data[0], imageData.data[1], imageData.data[2]);
                imageData.data[0] = min;
                imageData.data[1] = min;
                imageData.data[2] = min;
                ctx.putImageData(imageData, i, j);
            }
        }

        return ctx;
    },

    grises7(canvas, ctx) {
        for (var i = 0; i < canvas.width; i++) {
            for (let j = 0; j < canvas.height; j++) {
                const imageData = ctx.getImageData(i, j, 1, 1);
                const gray = imageData.data[0];
                imageData.data[0] = gray;
                imageData.data[1] = gray;
                imageData.data[2] = gray;
                ctx.putImageData(imageData, i, j);
            }
        }

        return ctx;
    },

    grises8(canvas, ctx) {
        for (var i = 0; i < canvas.width; i++) {
            for (let j = 0; j < canvas.height; j++) {
                const imageData = ctx.getImageData(i, j, 1, 1);
                const gray = imageData.data[1];
                imageData.data[0] = gray;
                imageData.data[1] = gray;
                imageData.data[2] = gray;
                ctx.putImageData(imageData, i, j);
            }
        }

        return ctx;
    },

    grises9(canvas, ctx) {
        for (var i = 0; i < canvas.width; i++) {
            for (let j = 0; j < canvas.height; j++) {
                const imageData = ctx.getImageData(i, j, 1, 1);
                const gray = imageData.data[2];
                imageData.data[0] = gray;
                imageData.data[1] = gray;
                imageData.data[2] = gray;
                ctx.putImageData(imageData, i, j);
            }
        }

        return ctx;
    },

    brillo(canvas, ctx, amount) {
        for (var i = 0; i < canvas.width; i++) {
            for (let j = 0; j < canvas.height; j++) {
                const imageData = ctx.getImageData(i, j, 1, 1);
                imageData.data[0] = (imageData.data[0] + amount > 255) ? 255 : imageData.data[0] + amount;
                imageData.data[1] = (imageData.data[1] + amount > 255) ? 255 : imageData.data[1] + amount;
                imageData.data[2] = (imageData.data[2] + amount > 255) ? 255 : imageData.data[2] + amount;
                ctx.putImageData(imageData, i, j);
            }
        }

        return ctx;
    },

    mosaico(canvas, ctx, mosaico_width, mosaico_height) {
        mosaico_width = (mosaico_width < canvas.width)
            ? mosaico_width
            : canvas.width;
        mosaico_height = (mosaico_height < canvas.height)
            ? mosaico_height
            : canvas.height;
        for (var i = 0; i < canvas.width; i += mosaico_width) {
            for (let j = 0; j < canvas.height; j += mosaico_height) {
                const width = (canvas.width - i > mosaico_width)
                    ? mosaico_width
                    : canvas.width - i;
                const height = (canvas.height - j > mosaico_height)
                    ? mosaico_height
                    : canvas.height - j;
                const imageData = ctx.getImageData(i, j, width, height);
                const total_pixels = imageData.data.length / 4;
                let red = 0;
                let green = 0;
                let blue = 0;
                for (let k = 0; k <= imageData.data.length - 1; k += 4) {
                    red += imageData.data[k];
                    green += imageData.data[k+1];
                    blue += imageData.data[k+2];
                }
                for (let k = 0; k <= imageData.data.length - 1; k += 4) {
                    imageData.data[k] = Math.trunc(red / total_pixels);
                    imageData.data[k+1] = Math.trunc(green / total_pixels);
                    imageData.data[k+2] = Math.trunc(blue / total_pixels);
                }
                ctx.putImageData(imageData, i, j);
            }
        }

        return ctx;
    },
}

export default tarea1;
