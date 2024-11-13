<template>
	<div class="layout" ref="appRef">
		<navbar />
		<appMain>
			<HomeView />
		</appMain>
	</div>
</template>

<script>
import HomeView from '@/views/HomeView.vue';
import { AppMain, Navbar } from './components';
import drawMixin from '@/utils/drawMixin';
export default {
	components: { AppMain, Navbar, HomeView },
	mixins: [drawMixin],
	props: {},
	data() {
		return {};
	},
};
</script>

<style lang="less" scoped></style>
