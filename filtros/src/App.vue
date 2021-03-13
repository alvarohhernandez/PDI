<template>
  <div class="main">
    <div class="main-panel" ref="mainPanel">
      <div class="content">
        <div>
        <md-menu md-size="medium" md-align-trigger>
          <md-button md-menu-trigger>Archivo</md-button>

          <md-menu-content class="maxHeightNone">
            <md-menu-item @click="uploadImage">Abrir Imagen</md-menu-item>
            <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked"/>
          </md-menu-content>
        </md-menu>

        <md-menu md-size="medium" md-align-trigger>
          <md-button md-menu-trigger>Filtros</md-button>
    
          <md-menu-content class="maxHeightNone">
            <md-menu-item @click="brilloFilter = true">Brillo</md-menu-item>
            <md-menu-item @click="mosaicoFilter = true">Mosaico</md-menu-item>
          </md-menu-content>
        </md-menu>

        <md-menu md-size="medium" md-align-trigger>
          <md-button md-menu-trigger>Tonos de Gris</md-button>
    
          <md-menu-content class="maxHeightNone">
            <md-menu-item @click="grises1">Tono de Grises 1</md-menu-item>
            <md-menu-item @click="grises2">Tono de Grises 2</md-menu-item>
            <md-menu-item @click="grises3">Tono de Grises 3</md-menu-item>
            <md-menu-item @click="grises4">Tono de Grises 4</md-menu-item>
            <md-menu-item @click="grises5">Tono de Grises 5</md-menu-item>
            <md-menu-item @click="grises6">Tono de Grises 6</md-menu-item>
            <md-menu-item @click="blue">Blue</md-menu-item>
            <md-menu-item @click="red">Red</md-menu-item>
            <md-menu-item @click="green">Green</md-menu-item>
          </md-menu-content>
        </md-menu>
        </div>

        <div class="md-layout md-gutter md-alignment-center-center">
          <div class="md-layout-item md-size-35">
            <img :src="imageUrl" id="original-image" class="responsive-img"/>
          </div>
          <div class="md-layout-item md-size-35">
            <canvas id="canvas"></canvas>
          </div>
        </div>

        <md-divider></md-divider>

        <div v-if="formula">
          <h2 class="center-align">{{ formula }}</h2>
        </div>

        <div class="md-layout md-gutter md-alignment-center-center brillo-filter" v-if="brilloFilter">
          <div class="md-layout-item md-size-30">
            Brillo <br>
            <input type="range" min="-100" max="100" v-model.number="amount"> {{ amount }}%
          </div>
          <md-button class="md-raised md-primary" @click="brillo">Aceptar</md-button>
        </div>

        <div class="md-layout md-gutter md-alignment-center-center mosaico-filter" v-if="mosaicoFilter">
          <div class="md-layout-item md-size-30">
            <div>
              Ancho <br>
              <input type="number" min="2" v-model.number="mosaico_width" v-on:change="validateInput">
            </div>
            <br>
            <div>
              Largo <br>
              <input type="number" min="2" v-model.number="mosaico_height" v-on:change="validateInput">
            </div>
          </div>
          <md-button class="md-raised md-primary" @click="mosaico">Aceptar</md-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data: () => ({
      amount: 0,
      brilloFilter: false,
      mosaicoFilter: false,
      imageUrl: null,
      canvas: null,
      ctx: null,
      mosaico_width: 2,
      mosaico_height: 2,
      formula: "",
    }),
    methods: {
      uploadImage() {
        this.$refs.fileInput.click();
      },
      onFilePicked (event) {
        const files = event.target.files
        const fileReader = new FileReader()
        fileReader.addEventListener('load', async () => {
          this.imageUrl = await fileReader.result
        })
        fileReader.readAsDataURL(files[0])
      },
      async grises1() {
          this.formula = "Gray = (Red + Green + Blue) / 3";
          this.cleanFilters();
          await this.loadContext();
          for (var i = 0; i < this.canvas.width; i++) {
            for (let j = 0; j < this.canvas.height; j++) {
              const imageData = this.ctx.getImageData(i, j, 1, 1);
              const gray = Math.trunc((imageData.data[0] + imageData.data[1] + imageData.data[2]) / 3);
              imageData.data[0] = gray;
              imageData.data[1] = gray;
              imageData.data[2] = gray;
              this.ctx.putImageData(imageData, i, j);
            }
          }
      },
      async grises2() {
          this.formula = "Gray = (Red * 0.3 + Green * 0.59 + Blue * 0.11)";
          this.cleanFilters();
          await this.loadContext();
          for (var i = 0; i < this.canvas.width; i++) {
            for (let j = 0; j < this.canvas.height; j++) {
              const imageData = this.ctx.getImageData(i, j, 1, 1);
              const gray = (imageData.data[0] * 0.3 + imageData.data[1] * 0.59 + imageData.data[2] * 0.11);
              imageData.data[0] = gray;
              imageData.data[1] = gray;
              imageData.data[2] = gray;
              this.ctx.putImageData(imageData, i, j);
            }
          }
      },
      async grises3() {
          this.formula = "Gray = (Red * 0.2126 + Green * 0.7152 + Blue * 0.0722)";
          this.cleanFilters();
          await this.loadContext();
          for (var i = 0; i < this.canvas.width; i++) {
            for (let j = 0; j < this.canvas.height; j++) {
              const imageData = this.ctx.getImageData(i, j, 1, 1);
              const gray = (imageData.data[0] * 0.2126 + imageData.data[1] * 0.7152 + imageData.data[2] * 0.0722);
              imageData.data[0] = gray;
              imageData.data[1] = gray;
              imageData.data[2] = gray;
              this.ctx.putImageData(imageData, i, j);
            }
          }
      },
      async grises4() {
          this.formula = "Gray = ( Max(Red, Green, Blue) + Min(Red, Green, Blue) ) / 2";
          this.cleanFilters();
          await this.loadContext();
          for (var i = 0; i < this.canvas.width; i++) {
            for (let j = 0; j < this.canvas.height; j++) {
              const imageData = this.ctx.getImageData(i, j, 1, 1);
              const max = Math.max(imageData.data[0], imageData.data[1], imageData.data[2]);
              const min = Math.min(imageData.data[0], imageData.data[1], imageData.data[2]);
              const gray = Math.trunc((max + min) / 2);
              imageData.data[0] = gray;
              imageData.data[1] = gray;
              imageData.data[2] = gray;
              this.ctx.putImageData(imageData, i, j);
            }
          }
      },
      async grises5() {
          this.formula = "Gray = Max(Red, Green, Blue)";
          this.cleanFilters();
          await this.loadContext();
          for (var i = 0; i < this.canvas.width; i++) {
            for (let j = 0; j < this.canvas.height; j++) {
              const imageData = this.ctx.getImageData(i, j, 1, 1);
              const max = Math.max(imageData.data[0], imageData.data[1], imageData.data[2]);
              imageData.data[0] = max;
              imageData.data[1] = max;
              imageData.data[2] = max;
              this.ctx.putImageData(imageData, i, j);
            }
          }
      },
      async grises6() {
          this.formula = "Gray = Min(Red, Green, Blue)";
          this.cleanFilters();
          await this.loadContext();
          for (var i = 0; i < this.canvas.width; i++) {
            for (let j = 0; j < this.canvas.height; j++) {
              const imageData = this.ctx.getImageData(i, j, 1, 1);
              const min = Math.min(imageData.data[0], imageData.data[1], imageData.data[2]);
              imageData.data[0] = min;
              imageData.data[1] = min;
              imageData.data[2] = min;
              this.ctx.putImageData(imageData, i, j);
            }
          }
      },
      async grises7() {
          this.formula = "Gray = Red";
          this.cleanFilters();
          await this.loadContext();
          for (var i = 0; i < this.canvas.width; i++) {
            for (let j = 0; j < this.canvas.height; j++) {
              const imageData = this.ctx.getImageData(i, j, 1, 1);
              const gray = imageData.data[0];
              imageData.data[0] = gray;
              imageData.data[1] = gray;
              imageData.data[2] = gray;
              this.ctx.putImageData(imageData, i, j);
            }
          }
      },
      async grises8() {
          this.formula = "Gray = Green";
          this.cleanFilters();
          await this.loadContext();
          for (var i = 0; i < this.canvas.width; i++) {
            for (let j = 0; j < this.canvas.height; j++) {
              const imageData = this.ctx.getImageData(i, j, 1, 1);
              const gray = imageData.data[1];
              imageData.data[0] = gray;
              imageData.data[1] = gray;
              imageData.data[2] = gray;
              this.ctx.putImageData(imageData, i, j);
            }
          }
      },
      async grises9() {
          this.formula = "Gray = Green";
          this.cleanFilters();
          await this.loadContext();
          for (var i = 0; i < this.canvas.width; i++) {
            for (let j = 0; j < this.canvas.height; j++) {
              const imageData = this.ctx.getImageData(i, j, 1, 1);
              const gray = imageData.data[2];
              imageData.data[0] = gray;
              imageData.data[1] = gray;
              imageData.data[2] = gray;
              this.ctx.putImageData(imageData, i, j);
            }
          }
      },
      async brillo() {
          await this.loadContext();
          for (var i = 0; i < this.canvas.width; i++) {
            for (let j = 0; j < this.canvas.height; j++) {
              const imageData = this.ctx.getImageData(i, j, 1, 1);
              imageData.data[0] = (imageData.data[0] + this.amount > 255) ? 255 : imageData.data[0] + this.amount;
              imageData.data[1] = (imageData.data[1] + this.amount > 255) ? 255 : imageData.data[1] + this.amount;
              imageData.data[2] = (imageData.data[2] + this.amount > 255) ? 255 : imageData.data[2] + this.amount;
              this.ctx.putImageData(imageData, i, j);
            }
          }
      },
      async mosaico() {
          this.mosaico_width = (this.mosaico_width < this.canvas.width)
                                  ? this.mosaico_width
                                  : this.canvas.width;
          this.mosaico_height = (this.mosaico_height < this.canvas.height)
                                  ? this.mosaico_height
                                  : this.canvas.height;
          await this.loadContext();
          for (var i = 0; i < this.canvas.width; i += this.mosaico_width) {
            for (let j = 0; j < this.canvas.height; j += this.mosaico_height) {
              const width = (this.canvas.width - i > this.mosaico_width)
                                ? this.mosaico_width
                                : this.canvas.width - i;
              const height = (this.canvas.height - j > this.mosaico_height)
                                ? this.mosaico_height
                                : this.canvas.height - j;
              const imageData = this.ctx.getImageData(i, j, width, height);
              const total_pixels = imageData.data.length / 4;
              console.log('Size', imageData.data.length);
              console.log('Pixels', imageData.data.length / 4);
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
              this.ctx.putImageData(imageData, i, j);
            }
          }
      },
      loadContext() {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = this.imageUrl;
          img.onload = () => {
            this.canvas = document.getElementById('canvas');
            this.canvas.width = img.width;
            this.canvas.height = img.height;
            this.ctx = this.canvas.getContext('2d');
            this.ctx.drawImage(img, 0, 0);
            img.style.display = 'none';
            resolve();
          }
        });
      },
      validateInput() {
        if (this.mosaico_width < 2) {
          this.mosaico_width = 2;
        }
        if (this.mosaico_height < 2) {
          this.mosaico_height = 2;
        }
      },
      cleanFilters() {
        this.brilloFilter = false;
        this.mosaicoFilter = false;
      },
    },
    watch: {
      imageUrl(newValue) {
        if (newValue) {
          this.loadContext();
        }
      },
      mosaicoFilter(newValue) {
        if (newValue) {
          this.brilloFilter = false;
          this.formula = "";
        }
      },
      brilloFilter(newValue) {
        if (newValue) {
          this.mosaicoFilter = false;
          this.formula = "";
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .md-menu {
    margin: 24px;
  }
  .md-layout-item {
    max-height: 70vh;
  }
  .maxHeightNone{
    top: 30px;
    max-height: none;
  }
  .md-divider {
    margin-top: 1vh;
  }
  .brillo-filter {
    margin-top: 7vh;
  }
  .mosaico-filter {
    margin-top: 4vh;
  }
  input[type="range"] {
    width:400px;
  }
  .center-align {
    text-align: center;
  }
</style>
