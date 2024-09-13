<template>
  <div class="card">
    <button @click="goToHomePage" class="home-button">Go back to Home Page</button>
    <h2>You are on the test page</h2>

    <div class="upload-area">
      <p>Choose images to upload:</p>
      <input type="file" ref="fileInput" @change="onFileSelect" multiple class="upload-input" />
    </div>

    <div class="image-container">
      <div v-for="(image, index) in images" :key="index" class="image">
        <span class="delete" @click="deleteImage(index)">&times;</span>
        <img :src="image.url" alt="Uploaded image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPage',

  data() {
    return {
      images: []
    };
  },

  methods: {
    goToHomePage() {
      // Save images to localStorage before navigating
      localStorage.setItem('uploadedImages', JSON.stringify(this.images));
      this.$router.push('/');
    },
    onFileSelect(event) {
      const files = event.target.files;
      if (files.length === 0) return;
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.split("/")[0] !== "image") continue;
        if (!this.images.some(e => e.name === files[i].name)) {
          this.images.push({ file: files[i], name: files[i].name, url: URL.createObjectURL(files[i]) });
        }
      }
    },
    deleteImage(index) {
      URL.revokeObjectURL(this.images[index].url);
      this.images.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.card {
  width: 100%;
  padding: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  margin: 20px auto;
  max-width: 600px;
}

.home-button {
  background-color: #fe0000;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
}

.home-button:hover {
  background-color: #e60000;
}

.upload-area {
  margin-bottom: 20px;
}

.upload-input {
  font-size: 16px;
}

.image-container {
  display: flex;
  flex-wrap: wrap;
}

.image {
  position: relative;
  width: 100%;
  max-width: 150px;
  margin: 5px;
}

.image img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.delete {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 20px;
  color: #fe0000;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  padding: 2px 5px;
}
</style>
