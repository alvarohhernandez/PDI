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
            <md-menu-item @click="rojo">Rojo</md-menu-item>
            <md-menu-item @click="verde">Verde</md-menu-item>
            <md-menu-item @click="azul">Azul</md-menu-item>
            <md-menu-item @click="mosaicoFilter = true">Mosaico</md-menu-item>
            <md-menu-item @click="brilloFilter = true">Brillo</md-menu-item>
            <md-menu-item @click="alto_contraste">Alto Contraste</md-menu-item>
            <md-menu-item @click="inverso">Inverso</md-menu-item>
<!--
            <md-menu-item @click="rgbFilter = true">RGB</md-menu-item>
-->
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
            <md-menu-item @click="grises7">Tono de Grises 7</md-menu-item>
          </md-menu-content>
        </md-menu>
<!--
        <md-menu md-size="medium" md-align-trigger>
          <md-button md-menu-trigger>Convolución</md-button>

          <md-menu-content class="maxHeightNone">
            <md-menu-item @click="blur1">Blur 1</md-menu-item>
            <md-menu-item @click="grises2">Blur 2</md-menu-item>
            <md-menu-item @click="grises3">Motion Blur</md-menu-item>
            <md-menu-item @click="grises4">Encontrar Bordes</md-menu-item>
            <md-menu-item @click="grises5">Sharpen</md-menu-item>
            <md-menu-item @click="grises6">Emboss</md-menu-item>
          </md-menu-content>
        </md-menu>
-->
        </div>

        <v-wait for="main wait">
            <template slot="waiting">
              <div style="background-color: green;">
                <img src="@/assets/loading.gif" />
              </div>
            </template>
            <div class="md-layout md-gutter md-alignment-center-center">
              <div class="md-layout-item md-size-35">
                <img :src="imageUrl" id="original-image" class="responsive-img"/>
              </div>
              <div class="md-layout-item md-size-35">
                <canvas id="canvas"></canvas>
              </div>
            </div>
        </v-wait>

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

        <div class="md-layout md-gutter md-alignment-center-center rgb-filter" v-if="rgbFilter">
          <div class="md-layout-item md-size-30">
            R <br>
            <input type="range" min="0" max="255" v-model.number="red_amount"> {{ red_amount }}%
          </div>
          <div class="md-layout-item md-size-30">
            G <br>
            <input type="range" min="0" max="255" v-model.number="green_amount"> {{ green_amount }}%
          </div>
          <div class="md-layout-item md-size-30">
            B <br>
            <input type="range" min="0" max="255" v-model.number="blue_amount"> {{ blue_amount }}%
          </div>
          <md-button class="md-raised md-primary" @click="rgb">Aceptar</md-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import tarea1 from "./tarea1.js";
  import tarea2 from "./tarea2.js";
  export default {
    components: {
    },
    data: () => ({
      amount: 0,
      red_amount: 0,
      green_amount: 0,
      blue_amount: 0,
      brilloFilter: false,
      mosaicoFilter: false,
      rgbFilter: false,
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
          this.ctx = await tarea1.grises1(this.canvas, this.ctx);
      },
      async grises2() {
          this.formula = "Gray = (Red * 0.3 + Green * 0.59 + Blue * 0.11)";
          this.cleanFilters();
          await this.loadContext();
          this.ctx = tarea1.grises2(this.canvas, this.ctx);
      },
      async grises3() {
          this.formula = "Gray = (Red * 0.2126 + Green * 0.7152 + Blue * 0.0722)";
          this.cleanFilters();
          await this.loadContext();
          this.ctx = tarea1.grises3(this.canvas, this.ctx);
      },
      async grises4() {
          this.formula = "Gray = ( Max(Red, Green, Blue) + Min(Red, Green, Blue) ) / 2";
          this.cleanFilters();
          await this.loadContext();
          this.ctx = tarea1.grises4(this.canvas, this.ctx);
      },
      async grises5() {
          this.formula = "Gray = Max(Red, Green, Blue)";
          this.cleanFilters();
          await this.loadContext();
          this.ctx = tarea1.grises5(this.canvas, this.ctx);
      },
      async grises6() {
          this.formula = "Gray = Min(Red, Green, Blue)";
          this.cleanFilters();
          await this.loadContext();
          this.ctx = tarea1.grises6(this.canvas, this.ctx);
      },
      async grises7() {
          this.formula = "Gray = Min(Red, Green, Blue)";
          this.cleanFilters();
          await this.loadContext();
          this.ctx = tarea1.grises7(this.canvas, this.ctx);
      },
      async rojo() {
          this.cleanFilters();
          await this.loadContext();
          this.ctx = tarea1.rojo(this.canvas, this.ctx);
      },
      async verde() {
          this.cleanFilters();
          await this.loadContext();
          this.ctx = tarea1.verde(this.canvas, this.ctx);
      },
      async azul() {
          this.cleanFilters();
          await this.loadContext();
          this.ctx = tarea1.azul(this.canvas, this.ctx);
      },
      async brillo() {
          await this.loadContext();
          this.ctx = tarea1.brillo(this.canvas, this.ctx, this.amount);
      },
      async mosaico() {
          this.mosaico_width = (this.mosaico_width < this.canvas.width)
                                  ? this.mosaico_width
                                  : this.canvas.width;
          this.mosaico_height = (this.mosaico_height < this.canvas.height)
                                  ? this.mosaico_height
                                  : this.canvas.height;
          await this.loadContext();
          this.ctx = tarea1.mosaico(this.canvas, this.ctx, this.mosaico_width, this.mosaico_height);
      },

      async alto_contraste() {
          this.cleanFilters();
          await this.loadContext();
          this.ctx = tarea1.altoContraste(this.canvas, this.ctx);
      },

      async inverso() {
          this.cleanFilters();
          await this.loadContext();
          this.ctx = tarea1.inverso(this.canvas, this.ctx);
      },

      async rgb() {
          this.cleanFilters();
          await this.loadContext();
          this.ctx = tarea2.rgb(this.canvas, this.ctx, this.red_amount, this.green_amount, this.blue_amount);
      },

      async blur1() {
          console.log('Log');
          await this.loadContext();
          tarea2.blur1(this.canvas, this.ctx);
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
