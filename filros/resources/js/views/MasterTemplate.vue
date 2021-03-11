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
            <md-menu-item>Tono de Grises 2</md-menu-item>
            <md-menu-item>Tono de Grises 3</md-menu-item>
            <md-menu-item>My Item 3</md-menu-item>
            <md-menu-item>My Item 3</md-menu-item>
            <md-menu-item>My Item 3</md-menu-item>
            <md-menu-item>My Item 3</md-menu-item>
            <md-menu-item>My Item 3</md-menu-item>
          </md-menu-content>
        </md-menu>
        </div>

        <img :src="imageUrl" id="original-image"/>
        <canvas id="canvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      image: null,
      imageUrl: null,
    }),
    methods: {
      uploadImage() {
        this.$refs.fileInput.click();
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      },
      grises1() {
        const img = new Image();
        img.src = this.imageUrl;
        const width = img.width;
        const height = img.height;
        const canvas = document.getElementById('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        console.log('Width', img.width);
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
          img.style.display = 'none';
          const imageData = ctx.getImageData(0, 0, width, height);
          for (var i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] = 0;
            imageData.data[i + 1] = 0;
            imageData.data[i + 2] = 0;
          }
          ctx.putImageData(imageData, 0, 0);
        };
      },
    },
    watch: {
      image(newValue) {
        console.log('New Value', newValue);
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
