<template>
  <div>
    <button @click="goToOtherPage">Go to Other Page</button>
  </div>
  <div>
    <div>
      <ul class="tasks">
        <h2 class="today-header">Upcoming Events</h2>
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
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tasks: null,
      error: null
    };
  },
  mounted() {
    this.fetchData();
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
      } catch (error) {
        this.error = error;
        console.error('Error fetching data:', error);
      }
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
  margin: 0;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, .2);
}

.today-header {
  margin: 0 0 15px;
  padding: 10px 0;
  font-size: 25px;
  font-weight: bold;
  color: #333;
  border-bottom: 2px solid #ddd;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


ul li {
  position: relative;
  list-style: none;
  padding: 10px 0;
  border-radius: 4px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
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
  font-size: 18px;
  margin-left: 80px;
  white-space: pre-wrap;
  word-break: break-word;
  flex-grow: 1;
}

ul li .date {
  position: absolute;
  left: 10px;
  width: 60px;
  text-align: center;
}

ul li .date::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  border-top: 22px solid #e2574c;
  border-bottom: 45px solid #e4e7e7;
  z-index: 1;
  border-radius: 5px;
}

ul li .date h3 {
  position: relative;
  z-index: 2;
  margin-top: -6px;
  font-size: 16px;
  color: #fff;
  line-height: 36px;
}

ul li .date h3 span {
  font-size: 28px;
  color: #324d5b;
}
</style>

