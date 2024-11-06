<template>
	<div class="pageHeader">
		<div class="d-flex jc-center">
			<div class="d-flex jc-center">
				<div class="dv-dec-8" />
				<div class="title">
					<div class="title-div">
						<span><img src="./../../assets/image/uni_logo.png" class="title-logo" /></span>
						<span class="title-text">海南科技职业大学信息工程学院农业监测数据中心</span>
					</div>
					<dv-decoration-6 class="title-highlight" :reverse="true" :color="['#50e3c2', '#67a1e5']" />
				</div>
				<div class="dv-dec-8" :reverse="true" />
			</div>
		</div>
		<div class="d-flex jc-between px-2">
			<div class="date-left date-l-s px-2">
				<span class="text">
					{{ date }}
					{{ time }}
				</span>
			</div>
			<div class="d-flex aside-width py-2">
				<div @click="$router.push('/').catch(err => err), (active = 0)" class="menu-right ml-3"
					style="cursor: pointer" :style="{
						background:
							active == 0
								? 'rgba(103, 161, 229, 0.8)'
								: 'rgba(103, 161, 229, 0.4)',
					}">
					<div class="menu-text">
						<span class="text">农场概况</span>
					</div>
				</div>
				<div @click="$router.push('/experimentalPlot').catch(err => err), (active = 1)" class="menu-right ml-3"
					style="cursor: pointer" :style="{
						background:
							active == 1
								? 'rgba(103, 161, 229, 0.8)'
								: 'rgba(103, 161, 229, 0.4)',
					}">
					<span class="text">稻田监测</span>
				</div>
				<div @click="$router.push('/greenhouse').catch(err => err), (active = 2)" class="menu-right ml-3"
					style="cursor: pointer" :style="{
						background:
							active == 2
								? 'rgba(103, 161, 229, 0.8)'
								: 'rgba(103, 161, 229, 0.4)',
					}">
					<span class="text">温棚监测</span>
				</div>
				<div @click="$router.push('/breed').catch(err => err), (active = 3)" class="menu-right ml-3"
					style="cursor: pointer" :style="{
						background:
							active == 3
								? 'rgba(103, 161, 229, 0.8)'
								: 'rgba(103, 161, 229, 0.4)',
					}">
					<span class="text">养殖监测</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	components: {},
	props: {},
	data() {
		return {
			time: '',
			date: '',
			active: 0,
		};
	},
	mounted() {
		this.getDate();
		setInterval(this.getDate, 1000);
	},
	methods: {
		getDate() {
			const now = new Date();
			let days = [
				'星期日',
				'星期一',
				'星期二',
				'星期三',
				'星期四',
				'星期五',
				'星期六',
			];
			this.time = now.toLocaleTimeString();
			this.date =
				days[now.getDay()] +
				' ' +
				now.getFullYear() +
				' ' +
				(now.getMonth() + 1) +
				'月' +
				now.getDate() +
				'日';
		},
	},
};
</script>

<style lang="less" scoped>
.logo {
	margin-bottom: 36px;
	position: relative;
	top: -8px;
}

.pageHeader {
	// position: absolute;
	// left: 80px;
	// right: 16px;
	// top: 24px;
	// z-index: 1;
	// &::before {
	//   content: '';
	//   display: inline-block;
	//   position: absolute;
	//   width: 48px;
	//   height: 87px;
	background: url('../../assets/image/head_bg.png') no-repeat;
	//   left: 0;
	//   top: 0;
	//   background-size: 100% auto;
	//   left: -64px;
	// }
	position: absolute;
	z-index: 2;
	width: 100%;
}

.topDate {
	flex: 0 0 386px;
	height: 88px;
	// background: url('@/assets/Time-BG.png') no-repeat;
	background-size: 100% auto;
	text-align: right;
	padding-right: 44px;

	.time {
		font-family: 'MyWebFont';
		font-size: 25px;
		color: #ffffff;
		margin-top: -5px;
		margin-bottom: 20px !important;
	}

	.date {
		font-family: 'MyWebFont';
		font-size: 18px;
		color: #ffffff;
		margin-top: -20px;
	}
}

.topMenu {
	height: 40px;
	margin-left: 130px;
	border-top: 1px solid rgba(205, 224, 255, 0.72);
	display: flex;
	align-items: center;
	//justify-content: space-between;
	padding-top: 10px;
	margin-bottom: 37px;
	position: relative;

	// &::before {
	// 	content: '';
	// 	display: inline-block;
	// 	width: 76px;
	// 	height: 12px;
	// 	background: url('@/assets/menu-L.png') no-repeat;
	// 	background-size: 100% auto;
	// 	position: absolute;
	// 	left: -92px;
	// 	top: -2px;
	// }
}

.divLine {
	flex: 0 0 10px;
	width: 10px;
	height: 24px;
	// background: url('@/assets/menuDividingLine.png') center no-repeat;
	// background-size: 100% auto;
}

::v-deep .el-menu-demo {
	width: 100%;
	background: none;
	flex: 1;
	border: none !important;
	display: flex;
	align-items: center;
	// justify-content: space-between;

	&.el-menu--horizontal>.el-menu-item.is-active {
		border: none;
	}

	.el-sub-menu__title {
		border: none !important;
	}

	>.el-sub-menu .el-sub-menu__title {
		justify-content: center;
		color: #fff;
		font-size: 20px;
		text-align: center;
		padding: 0;
		background: none !important;

		.el-sub-menu__icon-arrow {
			display: none;
		}
	}

	>.el-menu-item {
		// flex: 1;
		border: none;
		width: 100px;
		// display: flex;
		align-items: center;
		justify-content: center;
		margin: 0;
		padding: 0;
		background: none !important;

		&:last-child {
			margin-right: 0;
		}

		font-size: 20px;
		color: #ffffff;
		text-align: center;
		line-height: 24px;
		white-space: nowrap;
		position: relative;
		font-family: 'Microsoft YaHei',
		sans-serif;

		&:last-child {
			&::after {
				display: none;
			}
		}

		&.active .el-link--inner::after {
			display: none;
		}
	}

	>.el-menu-item.is-active,
	>.el-sub-menu.is-active {
		position: relative;
		font-weight: bolder;
		color: #fff;

		.el-sub-menu__title {
			color: #fff;
		}

		&::before {
			content: '';
			display: inline-block;
			// background: url('@/assets/menActive.png') center no-repeat;
			// background-size: auto 26px;
			position: absolute;
			top: 0;
			left: 50%;
			margin-left: -70px;
			width: 140px;
			height: 40px;
		}

		&::after {
			display: none;
		}
	}
}

.flex_1 {
	flex: 1;
}

.flexLayout {
	display: flex;
}

.dv-dec-10,
.dv-dec-10-s {
	width: 33.3%;
	height: 5px;
}

.dv-dec-10-s {
	transform: rotateY(180deg);
}

.dv-dec-8 {
	width: 200px;
	height: 50px;
}

.title {
	position: absolute;
	width: 650px;
	text-align: center;
	background-size: cover;
	background-repeat: no-repeat;

	.title-div {
		padding-top: 36px;
	}

	.title-text {
		font-size: 24px;
		padding-left: 8px;
		padding-top: 16px;
	}

	.title-logo {
		width: 36px;
		height: 36px;
	}

	.title-highlight {
		position: absolute;
		bottom: -16px;
		left: 50%;
		width: 250px;
		height: 8px;
		transform: translate(-50%);
	}
}

.aside-width {
	width: 35%;
}

.react-r-s,
.react-l-s {
	background: rgba(4, 0, 0, 0.2);
}

.date-left {
	&.date-l-s {
		text-align: left;
		width: 100%;
	}

	font-size: 18px;
	width: 300px;
	text-align: center;
	transform: skewX(-45deg);
	line-height: 50px;

	.text {
		display: inline-block;
		transform: skewX(45deg);
	}
}

.menu-right {
	&.react-l-s {
		width: 150px;
		text-align: center;
	}

	font-size: 18px;
	width: 100px;
	height: 25px;
	line-height: 25px;
	text-align: center;
	transform: skewX(-45deg);

	.react-before {
		position: absolute;
		left: -25px;
		top: 100px;
		height: 50px;
		width: 50px;
		// background: rgba(4, 0, 0, 0.2);
		transform: skewX(45deg);
	}

	.menu-text {
		animation: animText 5s ease-in-out infinite;
	}

	.text {
		display: inline-block;
		transform: skewX(45deg);
		// animation: animText 1s ease infinite;
	}
}
</style>
