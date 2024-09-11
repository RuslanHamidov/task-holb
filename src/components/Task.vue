<template>
 <div>
    <ul>
      <li v-for="task in jsonData" :key="task.id">
        {{ task.task }} - {{ task.date }}
      </li>
    </ul>
 </div>
</template>


<script>
import jsonData from '../../data.json';

export default {
    data() {
        return {
            jsonData
        }
    }
}
</script>

<style scoped>

</style>
