<template>
	<div class="section section-list" style="width: 100%; height: 100%">
		<div class="list">
			<div
				class="list__item"
				v-for="(item, index) in customerDataPercent"
				:key="item.title"
			>
				<div class="header">
					<div>
						<span>{{ item.name }}</span>
					</div>
					<div>
						<span style="margin-right: 10px">{{ item.value }}</span>
						<span>亩</span>
					</div>
				</div>
				<div class="percent">
					<div
						class="percent-value"
						:style="{
							width: item.percent,
						}"
					></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			customerData: [
				{ name: '白菜', value: 240 },
				{ name: '玉米', value: 198 },
				{ name: '油菜', value: 178 },
				{ name: '西红柿', value: 97 },
				{ name: '花菜', value: 30 },
			],
		};
	},
	computed: {
		customerDataPercent: function () {
			const max = Math.max(...this.customerData.map((e) => e.value));
			return this.customerData.map((e) => {
				e.percent = ((e.value / max) * 100).toFixed(2) + '%';
				return e;
			});
		},
	},
};
</script>

<style lang="less" scoped>
.section-list {
	display: block;

	.title {
		font-size: 14px;
		color: #ffffff;
		line-height: 20px;
		margin-bottom: 12px;
	}

	.list {
		display: flex;
		flex-direction: column;
		height: 100%;
		&__item {
			flex-grow: 1;
			.header {
				display: flex;
				justify-content: space-between;

				> div {
					display: flex;
					align-items: center;

					span {
						display: block;
					}
				}

				> div:first-child {
					height: 20px;
					font-size: 12px;
					color: #cde0ff;
					line-height: 20px;

					.tag {
						width: 20px;
						height: 14px;
						background: radial-gradient(
							48% 99% at 5% 50%,
							rgba(173, 205, 255, 0.4) 0%,
							rgba(173, 205, 255, 0.04) 100%
						);
						box-shadow: inset 1px 0px 0px 0px #adcdff;
						line-height: 14px;
						font-family: DIN, DIN;
						font-size: 12px;
						color: #ffffff;
						line-height: 16px;
						text-align: center;
						margin-right: 4px;
					}
				}

				> div:last-child {
					line-height: 20px;
					font-weight: 400;
					color: #cde0ff;
					font-size: 12px;

					span:last-child {
						font-family: DIN, DIN;
						font-size: 16px;
						color: #adcdff;
						line-height: 20px;
					}
				}
			}

			.percent {
				margin-top: 2px;
				height: 8px;
				width: 100%;
				background-color: rgba(153, 192, 255, 0.08);

				.percent-value {
					height: 100%;
					border-right: 1px solid;
					box-shadow: inset -2px 0px 0px 0px #adcdff;
					background: linear-gradient(
						270deg,
						rgba(173, 205, 255, 0.64) 0%,
						rgba(173, 205, 255, 0) 100%
					);
					border-image: linear-gradient(
							270deg,
							rgba(173, 205, 255, 0.32),
							rgba(173, 205, 255, 0)
						)
						1 1;
				}
			}

			&:nth-child(1) {
				.percent-value {
					box-shadow: inset -2px 0px 0px 0px #ffdb29;
					background: linear-gradient(
						270deg,
						rgba(255, 219, 41, 0.64) 0%,
						rgba(255, 219, 41, 0) 100%
					);
					border-image: linear-gradient(
							270deg,
							rgba(255, 219, 41, 0.32),
							rgba(255, 219, 41, 0)
						)
						1 1;
				}

				.header {
					> div:first-child .tag {
						background: radial-gradient(
							48% 99% at 5% 50%,
							rgba(255, 212, 0, 0.4) 0%,
							rgba(255, 212, 0, 0.04) 100%
						);
						box-shadow: inset 1px 0px 0px 0px #ffd400;
					}

					> div:last-child span:last-child {
						color: #ffdb29;
					}
				}
			}

			&:nth-child(2) {
				.percent-value {
					box-shadow: inset -2px 0px 0px 0px #29ffdb;
					background: linear-gradient(
						270deg,
						rgba(41, 255, 219, 0.64) 0%,
						rgba(41, 255, 219, 0) 100%
					);
					border-image: linear-gradient(
							270deg,
							rgba(41, 255, 219, 0.32),
							rgba(41, 255, 219, 0)
						)
						1 1;
				}

				.header {
					> div:first-child .tag {
						background: radial-gradient(
							48% 99% at 5% 50%,
							rgba(41, 255, 219, 0.4) 0%,
							rgba(41, 255, 219, 0.04) 100%
						);
						box-shadow: inset 1px 0px 0px 0px #29ffdb;
					}

					> div:last-child span:last-child {
						color: #29ffdb;
					}
				}
			}

			&:nth-child(3) {
				.percent-value {
					box-shadow: inset -2px 0px 0px 0px #29ddff;
					background: linear-gradient(
						270deg,
						rgba(41, 221, 255, 0.64) 0%,
						rgba(41, 221, 255, 0) 100%
					);
					border-image: linear-gradient(
							270deg,
							rgba(41, 221, 255, 0.32),
							rgba(41, 221, 255, 0)
						)
						1 1;
				}

				.header {
					> div:first-child .tag {
						background: radial-gradient(
							48% 99% at 5% 50%,
							rgba(41, 221, 255, 0.4) 0%,
							rgba(41, 221, 255, 0.04) 100%
						);
						box-shadow: inset 1px 0px 0px 0px #29ddff;
					}

					> div:last-child span:last-child {
						color: #29ddff;
					}
				}
			}

			&:last-child {
				margin-bottom: 0;
			}
		}
	}
}
</style>
