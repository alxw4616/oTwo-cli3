import Vue from 'vue'
import VueRouter from 'vue-router'
import reserve from '@/views/reserve/index.vue'
import step2 from '@/views/reserve/step2.vue'
import step3 from '@/views/reserve/step3.vue'
import error from '@/views/error.vue'
// component: () => import('@/views/calc/index.vue'),

Vue.use(VueRouter)

const routes = [
	{
		path: '/error',
		name: 'error',
		component: error,
		meta: {
			title: '错误信息'
		}
	}, {
		path: '/',
		name: 'reserve',
		component: reserve,
		meta: {
			title: '车队卡备用金划转'
		}
	}, {
		path: '/reserve',
		name: 'reserve',
		component: reserve,
		meta: {
			title: '车队卡备用金划转'
		}
	}, {
		path: '/step2',
		name: 'step2',
		component: step2,
		meta: {
			title: '车队卡备用金划转'
		}
	}, {
		path: '/step3',
		name: 'step3',
		component: step3,
		meta: {
			title: '车队卡备用金划转'
		}
	}

]
const router = new VueRouter({
	mode: 'hash',
	routes
})

export default router
