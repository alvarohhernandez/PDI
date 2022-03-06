const tarea2 = {
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

        return ctx;
    },

//    blur1(canvas, ctx) {
//        const filter = [
//            0,0,0,
//            0,1,0,
//            0,0,0,
//        ];
//        const length = filter.length;
//
//        for (let i = 0; i < canvas.width; i++) {
//            for (let j = 0; j < canvas.height; j++) {
//                const { data } = ctx.getImageData(i, j, length, length);
//                for (let k = 0; k < data.length; k += 4) {
//                    data[k] = data[k] * filter[k/length];
//                    data[k+1] = data[k+1] * filter[k/length];
//                    data[k+2] = data[k+2] * filter[k/length];
//                }
//                let red = green = blue = 0;
//                for (let k = 0; k < data.length; k += length) {
//                    red += 0;
//                    data[1] = filter[k/length];
//                    data[2] = filter[k/length];
//                }
//            }
//        }
//    },
}

export default tarea2;
