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
  margin: 20px auto;
  padding: 20px;
  width: 90%;
  max-width: 400px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, .2);
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

@media (max-width: 480px) {
  .tasks {
    width: 95%;
    padding: 10px;
  }

  .today-header {
    font-size: 18px;
  }

  ul li .description {
    font-size: 14px;
    margin-left: 60px;
  }

  ul li .date {
    width: 45px;
  }

  ul li .date h3 {
    font-size: 12px;
    line-height: 24px;
  }

  ul li .date h3 span {
    font-size: 20px;
  }
}
</style>