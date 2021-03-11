<template>
  <div class="main">
    <div class="main-panel" ref="mainPanel">
      <div class="content">
        <div>
        <md-menu md-size="small">
          <md-button md-menu-trigger @click="uploadImage">Abrir Imagen</md-button>
          <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked"/>
        </md-menu>

        <md-menu md-size="medium" md-align-trigger>
          <md-button md-menu-trigger>Filtros</md-button>
    
          <md-menu-content class="maxHeightNone">
            <md-menu-item @click="grises1">Tono de Grises 1</md-menu-item>
            <md-menu-item @click="blue">Blue</md-menu-item>
            <md-menu-item @click="red">Red</md-menu-item>
            <md-menu-item>My Item 3</md-menu-item>
            <md-menu-item>My Item 3</md-menu-item>
            <md-menu-item>My Item 3</md-menu-item>
            <md-menu-item>My Item 3</md-menu-item>
            <md-menu-item>My Item 3</md-menu-item>
          </md-menu-content>
        </md-menu>
        </div>

        <div class="md-layout md-gutter md-alignment-center-center">
          <div class="md-layout-item md-size-30">
            <img :src="imageUrl" id="original-image"/>
          </div>
          <div class="md-layout-item md-size-30">
            <canvas id="canvas"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      imageUrl: null,
      canvas: null,
      ctx: null,
      width: 0,
      height: 0,
    }),
    methods: {
      uploadImage() {
        this.$refs.fileInput.click();
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        const fileReader = new FileReader()
        fileReader.addEventListener('load', async () => {
          this.imageUrl = await fileReader.result
        })
        fileReader.readAsDataURL(files[0])
      },
      async grises1() {
          await this.loadContext();
          for (var i = 0; i < this.canvas.width; i++) {
            for (let j = 0; j < this.canvas.height; j++) {
              const imageData = this.ctx.getImageData(i, j, 1, 1);
              const gray = Math.trunc((imageData.data[0] + imageData.data[1] + imageData.data[2])/3);
              imageData.data[0] = gray;
              imageData.data[1] = gray;
              imageData.data[2] = gray;
              this.ctx.putImageData(imageData, i, j);
            }
          }
      },
      async blue() {
          await this.loadContext();
          for (var i = 0; i < this.canvas.width; i++) {
            for (let j = 0; j < this.canvas.height; j++) {
              const imageData = this.ctx.getImageData(i, j, 1, 1);
              imageData.data[0] = 0;
              imageData.data[1] = 0;
              this.ctx.putImageData(imageData, i, j);
            }
          }
      },
      async red() {
          await this.loadContext();
          for (var i = 0; i < this.canvas.width; i++) {
            for (let j = 0; j < this.canvas.height; j++) {
              const imageData = this.ctx.getImageData(i, j, 1, 1);
              imageData.data[1] = 0;
              imageData.data[2] = 0;
              this.ctx.putImageData(imageData, i, j);
            }
          }
      },
      loadContext() {
        return new Promise((resolve) => {
          let width = 0;
          let height = 0;
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
    },
    watch: {
      imageUrl(newValue) {
        if (newValue) {
          this.loadContext();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-menu {
    margin: 24px;
  }
  .maxHeightNone{
    top: 30px;
    max-height: none;
}
</style>
