<template>
	<section class="app-main">
		<transition name="fade-transform" mode="out-in">
			<router-view />
		</transition>
		<slot></slot>
	</section>
</template>

<script></script>

<style lang="less" scoped>
.app-main {
	width: 100%;
	height: 100%;
	top: 0vh;
	left: 0;
	position: absolute;
	// pointer-events: none;
	z-index: 1;
}
.fixed-header + .app-main {
	padding-top: 50px;
}

.hasTagsView {
	.app-main {
		/* 84 = navbar + tags-view = 50 + 34 */
		min-height: calc(100vh - 84px);
	}

	.fixed-header + .app-main {
		padding-top: 84px;
	}
}
</style>

<style lang="less">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
	.fixed-header {
		padding-right: 6px;
	}
}

::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}

::-webkit-scrollbar-track {
	background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
	background-color: #c0c0c0;
	border-radius: 3px;
}
</style>
