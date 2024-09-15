// Task.vue
<template>
  <div>
    <button @click="goToOtherPage" class="navigate-button">Go to Other Page</button>
    <div v-if="currentView === 'tasks'">
      <h2 class="today-header">Upcoming Events</h2>
      <ul class="tasks">
        <li v-for="task in tasks" :key="task.id" class="single-task">
          <div class="task">
            <div class="date">
              <h3>{{ getMonth(task.date) }}<br><span>{{ getDay(task.date) }}</span></h3>
            </div>
            <p class="description">{{ task.title }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="image-container">
    <p class="image-caption">Uploaded Images</p>
    <div v-for="(image, index) in images" :key="index" class="image-frame">
      <img :src="image.url" :alt="image.name" class="uploaded-image"/>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tasks: null,
      images: [],
      error: null,
      currentView: 'tasks'
    };
  },
  mounted() {
    console.log("Mounted Task.vue");
    this.loadImagesFromLocalStorage();
    this.fetchData();
    this.startViewSwitch();
  },
  methods: {
    goToOtherPage() {
      this.$router.push('/test');
    },
    getMonth(due_date) {
      const date = new Date(due_date);
      return date.toLocaleString('en-US', { month: 'short' });
    },
    getDay(due_date) {
      const date = new Date(due_date);
      return date.getDate();
    },
    async fetchData() {
      const url = 'https://raw.githubusercontent.com/RuslanHamidov/fake_json/main/data.json';
      try {
        const response = await axios.get(url);
        this.tasks = response.data;
        console.log("Fetched tasks:", this.tasks);
      } catch (error) {
        this.error = error;
        console.error('Error fetching data:', error);
      }
    },
    startViewSwitch() {
      setInterval(() => {
        console.log("Switching view. Current view:", this.currentView);
        this.currentView = this.currentView === 'tasks' ? 'images' : 'tasks';
      }, 10000);
    },
    loadImagesFromLocalStorage() {
      const savedImages = localStorage.getItem('uploadedImages');
      if (savedImages) {
        this.images = JSON.parse(savedImages);
        console.log("Loaded images from localStorage:", this.images);
      }
    }
  },
  watch: {
    '$route'() {
      this.loadImagesFromLocalStorage();
    }
  }
};
</script>


<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: #ff5722;
}

.tasks {
  margin: 20px auto;
  padding: 20px;
  width: 90%;
  max-width: 400px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
}

.today-header {
  margin: 0 0 15px;
  padding: 10px 0;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  border-bottom: 2px solid #ddd;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

ul {
  padding: 0;
}

ul li {
  position: relative;
  list-style: none;
  padding: 10px 0;
  border-radius: 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  min-height: 60px;
  transition: border-bottom 0.3s ease;
}

ul li:hover {
  background: #607d8b;
  border-bottom: 5px solid #324d5b;
}

ul li .description {
  color: #262626;
  text-decoration: none;
  font-size: 16px;
  margin-left: 70px;
  white-space: pre-wrap;
  word-break: break-word;
  flex-grow: 1;
}

ul li .date {
  position: absolute;
  left: 5px;
  width: 50px;
  text-align: center;
}

ul li .date::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  border-top: 18px solid #e2574c;
  border-bottom: 36px solid #e4e7e7;
  z-index: 1;
  border-radius: 5px;
}

ul li .date h3 {
  position: relative;
  z-index: 2;
  margin-top: -6px;
  font-size: 14px;
  color: #fff;
  line-height: 30px;
}

ul li .date h3 span {
  font-size: 24px;
  color: #324d5b;
}

.navigate-button {
  background-color: #fe0000;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  margin: 20px;
  display: inline-block;
  text-align: center;
}

.navigate-button:hover {
  background-color: #e60000;
}

.image-container {
  text-align: center;
  margin: 20px auto;
  width: 90%;
  max-width: 600px;
}

.image-caption {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

.image-frame {
  display: inline-block;
  border: 2px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  background: #fff;
}

.uploaded-image {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
