import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/layout';
Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		component: Layout,
		children: [
			{
				path: '',
				component: () => import('@/views/home'),
				name: '首页',
				meta: { title: '首页', icon: 'dashboard', affix: true },
			},
		],
	},
	{
		path: '/experimentalPlot',
		component: Layout,
		children: [
			{
				path: '',
				component: () => import('@/views/experimentalPlot'),
				name: '稻田监测',
				meta: { title: '稻田监测', icon: 'dashboard', affix: true },
			},
		],
	},
	{
		path: '/greenhouse',
		component: Layout,
		children: [
			{
				path: '',
				component: () => import('@/views/greenhouse'),
				name: '温棚监测',
				meta: { title: '温棚监测', icon: 'dashboard', affix: true },
			},
		],
	},
	{
		path: '/breed',
		component: Layout,
		children: [
			{
				path: '',
				component: () => import('@/views/breed'),
				name: '设备运维',
				meta: { title: '设备运维', icon: 'dashboard', affix: true },
			}

		],
	},
	{
		path: '/about',
		name: 'about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
	return VueRouterPush.call(this, to).catch(err => err)
}

export default router;
