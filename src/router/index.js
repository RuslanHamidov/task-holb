import { createRouter, createWebHistory } from 'vue-router';
import Task from '../components/Task.vue';
import TestPage from '../components/AdminPage.vue';

const routes = [
    { path: '/', component: Task },
    { path: '/test', component: TestPage }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
