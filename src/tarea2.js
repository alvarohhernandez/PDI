import tarea1 from "./tarea1.js";

const tarea2 = {
    altoContraste(canvas, ctx) {
        ctx = tarea1.grises1(canvas, ctx);
        for (var i = 0; i < canvas.width; i++) {
            for (let j = 0; j < canvas.height; j++) {
                const imageData = ctx.getImageData(i, j, 1, 1);
                const gray = imageData.data[0] > 127 ? 255 : 0;
                imageData.data[0] = gray;
                imageData.data[1] = gray;
                imageData.data[2] = gray;
                ctx.putImageData(imageData, i, j);
            }
        }

        return ctx;
    },

    inverso(canvas, ctx) {
        ctx = tarea1.grises1(canvas, ctx);
        for (var i = 0; i < canvas.width; i++) {
            for (let j = 0; j < canvas.height; j++) {
                const imageData = ctx.getImageData(i, j, 1, 1);
                const gray = imageData.data[0] > 127 ? 0 : 255;
                imageData.data[0] = gray;
                imageData.data[1] = gray;
                imageData.data[2] = gray;
                ctx.putImageData(imageData, i, j);
            }
        }

        return ctx;
    },

    rgb(canvas, ctx, red, green, blue) {
        for (var i = 0; i < canvas.width; i++) {
            for (let j = 0; j < canvas.height; j++) {
                const imageData = ctx.getImageData(i, j, 1, 1);
                imageData.data[0] = imageData.data[0] & red;
                imageData.data[1] = imageData.data[1] & green;
                imageData.data[2] = imageData.data[2] & blue;
                ctx.putImageData(imageData, i, j);
            }
        }
    }
}

export default tarea2;
