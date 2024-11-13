<template>
	<div class="main">
		<!-- <big-control ref="bigControl" class="control"></big-control> -->
		<div id="screen" class="screen"></div>
	</div>
</template>

<script>
import ZThree from '@/three/ZThree';
import * as THREE from 'three';
import { loaderModel } from '@/three/loaderModel';
import bigControl from '@/components/bigControl.vue';
import { centerPosition } from '../three/floorManage';
import TWEEN from 'three/examples/jsm/libs/tween.module.js';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { cssRender } from '@/three/cssRender';
import { createReprocessing } from '@/three/reprocessing';
import { darkMaterial } from '@/three/material';
import { Notification } from 'element-ui';
import {
	secondaryTexture,
	trunkTexture,
	primaryTexture,
	skyTexture,
	gifTexture,
} from '@/three/texture';
import { MQTT_URL, MQTT_OPTIONS, MQTT_TOPIC } from '../utils/mqttConfig';

let app,
	camera,
	scene,
	renderer,
	controls,
	clock,
	reprocessing,
	materials = {};
export default {
	components: {},
	props: {},
	data() {
		return {
			videoPath: '/static/logo.png',
			imgUrl: 'http://192.168.91.5/mjpeg/1',
			lastTapTime: 0,
			tapCount: 0,
			showPopup: false,
			popupTitle: '请输入监控IP',
			inputValue: '',
			eryan: '',
			queshui: '',
			shidu: '',
			text: '',
			receivedMsg: '',
			receiveNews: '',
			init: false,
			controls: [
				{
					name: '首页',
					goFunction: () => {
						window.app.flyTo({
							position: app.cameraPostion,
							controls: app.controlsTarget,
							duration: 2000,
						});
					},
					backFunction: () => {},
				},
			],
		};
	},
	name: 'HomeView',
	components: {
		bigControl,
	},

	created() {
		const keys = Object.keys(MQTT_TOPIC);
		console.log(keys);
		// 订阅主题
		for (let key of keys) {
			this.doSubscribe(MQTT_TOPIC[key], 2);
		}
		this.getMsg();
	},
	methods: {
		// 接收MQTT信息
		getMsg() {
			this.$mqttClient.on('message', (topic, message) => {
				switch (topic) {
					case MQTT_TOPIC.SMOKE_TOPIC:
						{
							let msg;
							try {
								const checkMsg = message.toString();
								if (checkMsg.includes('AT')) {
									return;
								}
								msg = JSON.parse(message);
							} catch (e) {
								return;
							}
							console.log('收到的硬件设备消息：', msg);
							if (msg['FIER']) {
								// this.$refs["bigControl"].activeVar = 1;
								this.$EventBus.$emit('changeFloorUI', {
									isShowFloorBack: true,
									model: window.app.model.children[5],
								});
								// console.log("999999", window.app.model)
								this.$refs['bigControl'].changeLayer('3F');
								setTimeout(() => {
									loaderFloorManage(app);
									Notification({
										title: '火灾警告',
										dangerouslyUseHTMLString: true,
										message:
											"<strong >正在规划路线<i id='countdown'></i></strong><br><img src='texture/报警灯.gif' style='max-width: 200px; max-height: 150px;'> ",
										type: 'warning',
										duration: 6000,
										position: 'top-left',
									});
									setTimeout(() => {
										this.$refs['bigControl'].changeLayer(
											'全楼'
										);
									}, 5000); // 延迟6秒执行
									setTimeout(() => {
										this.$refs['bigControl'].activeVar = 2;
									}, 6000); // 延迟6秒执行
								}, 1500);
							}
							function loaderFloorManage(app) {
								app.flyTo({
									position: [
										-3.6952393941311175, 3.1867051318955832,
										-7.750876607531634,
									],
									controls: [
										-0.3120781949529904,
										-1.3286982740899083, -5.109585852943463,
									],
								});
							}
							// console.log(`收到主题 ${topic} 的消息.\n ${message}`)
							const that = this;
						}
						break;
					//
					case MQTT_TOPIC.FIRE_TOPIC:
						{
							this.eryan = msg['Turbidity'];

							// todo
						}
						break;

					case MQTT_TOPIC.TEMP_HUMI_TOPIC:
						// todo
						break;
					//湿度
					case MQTT_TOPIC.TEMP_WENDU_TOPIC:
						// console.log('接收的消息：', msg['water level']);
						this.shidu = msg['water level'];
						if (msg['water level'] < 35) {
							this.queshui = '缺水';
						} else {
							this.queshui = '不缺水';
						}
						// console.log('接收的消息：', this.shidu);
						// todo
						break;
					default:
						break;
				}
				// console.log('收到的消息0：',Object.keys(this.receiveNews)[0]);
				// console.log(`收到主题 ${topic} 的消息.\n ${message}`)
			});
		},
		// 发布主题
		// {topic:'test',payload:'content',qos:2}
		doPublic(data) {
			const topic = data.topic;
			const payload = data.payload;
			const qos = data.qos;
			this.$mqttClient.publish(
				topic,
				payload,
				{
					qos,
				},
				(error) => {
					if (error) {
						console.log('Publish error', error);
					}
				}
			);
		},
		// 订阅主题
		doSubscribe(topic, qos) {
			this.$mqttClient.subscribe(
				topic,
				{
					qos,
				},
				(error, res) => {
					if (error) {
						console.log('订阅主题错误！', error);
						uni.showToast({
							title: '获取环境数据错误',
							duration: 2000,
							icon: 'error',
						});
						return;
					}
					this.subscribeSuccess = true;
					console.log('订阅的主题：', res);
				}
			);
		},
		// 消息弹窗
		msgDialog(msg) {
			uni.showModal({
				title: '警告',
				content: msg + '' || '幼儿园警报',
				success: function (res) {
					if (res.confirm) {
						// clearInterval(this.timer);
						innerAudioContext.stop();
					} else if (res.cancel) {
						innerAudioContext.stop();
						// clearInterval(this.timer);
					}
				},
			});
		},
		// 声音
		playSound() {
			innerAudioContext = uni.createInnerAudioContext();
			// innerAudioContext.stop();
			innerAudioContext.autoplay = true;
			innerAudioContext.src = '/static/error2.mp3';
			innerAudioContext.loop = true;
			innerAudioContext.onPlay();
		},
		// 浇水
		switch1Change(e) {
			console.log(e.detail);
			const num = e.detail.value;
			let data;
			console.log(num);
			if (num) {
				const msg = '{"open":0}';
				data = {
					topic: 'topic/system/ds/temperature',
					payload: msg,
					qos: 2,
				};
			} else {
				const msg = '{"open":1}';
				data = {
					topic: 'topic/system/ds/temperature',
					payload: msg,
					qos: 2,
				};
			}
			this.doPublic(data);
		},
		switcher(e) {
			console.log(e.detail);
			const num = e.detail.value;
			let data;
			console.log(num);
			if (num) {
				const msg = '{"open":2}';
				data = {
					topic: 'topic/system/ds/temperature',
					payload: msg,
					qos: 2,
				};
			} else {
				const msg = '{"open":3}';
				data = {
					topic: 'topic/system/ds/temperature',
					payload: msg,
					qos: 2,
				};
			}
			this.doPublic(data);
		},
		open() {
			const data = {
				topic: 'topic/system/ds/temperature',
				payload: '{open:0}',
				qos: 2,
			};
			this.doPublic(data);
			this.$refs.popup.open();
		},
		/**
		 * 点击取消按钮触发
		 * @param {Object} done
		 */
		close() {
			// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
			// ...
			this.$refs.popup.close();
		},
		/**
		 * 点击确认按钮触发
		 * @param {Object} done
		 * @param {Object} value
		 */
		confirm(value) {
			this.$refs.popup.close();
		},
		// 隐藏窗口连续点击5次监控视频文字跳出弹窗的方法
		handleTitleTap() {
			const currentTime = new Date().getTime();
			if (currentTime - this.lastTapTime < 800) {
				this.tapCount++;
				if (this.tapCount == 4) {
					this.tapCount = 0;
					this.showPopup = true;
				}
			} else {
				this.lastTapTime = currentTime;
			}
		},
		cancel1() {
			this.showPopup = false;
		},
		confirm1() {
			uni.showToast({
				title: '修改成功,IP:' + this.imgUrl,
				icon: 'none',
			});
			this.showPopup = false;
			// this.inputValue = ''
		},

		async initZThree() {
			app = new ZThree('screen');
			app.initThree();
			// app.initHelper();
			app.initOrbitControls();
			app.initLight();
			window.app = app;
			app.cameraPostion = [95.93, 22.52, -18.30];
			app.controlsTarget = [17.02, -14.05, 10.38];
			app.initLight();
			clock = new THREE.Clock();
			controls = app.controls;
			controls.target.set(...app.controlsTarget);
			camera = app.camera;
			camera.position.set(...app.cameraPostion);
			scene = app.scene;
			scene.fog = new THREE.Fog('#000000', 100, 480);
			renderer = app.renderer;
			renderer.outputEncoding = THREE.sRGBEncoding;
			renderer.toneMapping = THREE.ACESFilmicToneMapping;
			renderer.shadowMap.enabled = true;
			renderer.shadowMap.type = THREE.PCFSoftShadowMap;
			console.log(app);

			let instance = new cssRender(CSS3DRenderer, app);
			app.cssRenderer = instance.cssRenderer;
			app.instance = instance;

			reprocessing = createReprocessing(app);

			await loaderModel(app);

			app.render(() => {
				const delta = clock.getDelta();

				// 道路贴图
				if (secondaryTexture) {
					secondaryTexture.offset.x -= 0.05;
				}

				if (trunkTexture) {
					trunkTexture.offset.x -= 0.05;
				}

				if (primaryTexture) {
					primaryTexture.offset.x -= 0.005;
				}

				controls.update(delta);

				scene.traverse(this.darkenNonBloomed);
				reprocessing.render();
				scene.traverse(this.restoreMaterial);
				app.finalComposer.render();

				app.cssRenderer.render(scene, camera);
				TWEEN.update();
			});
			self.init = true;
		},
		darkenNonBloomed(obj) {
			if (obj.isMesh && app.bloomLayer.test(obj.layers) === false) {
				materials[obj.uuid] = obj.material;
				obj.material = darkMaterial;
			}
		},
		restoreMaterial(obj) {
			if (materials[obj.uuid]) {
				obj.material = materials[obj.uuid];
				delete materials[obj.uuid];
			}
		},
		focusOnView() {
			if (self.init) {
				window.app.flyTo({
				position: [95.93, 22.52, -18.30],
				controls: [17.02, -14.05, 10.38],
				duration: 2000,
				});
			}
		},
	},
	mounted() {
		this.initZThree();
	},
	watch: {
		$route: {
			handler: 'focusOnView',
			immediate: true,
		},
	},
};
// 倒计时的目标时间（以毫秒为单位）
var targetTime = Date.now() + 15000; // 6秒后的时间

// 每秒更新倒计时
var countdownInterval = setInterval(function () {
	// 当前时间
	var currentTime = Date.now();

	// 剩余时间（以秒为单位）
	var remainingTime = Math.floor((targetTime - currentTime) / 1000);

	// 更新倒计时显示
	var countdownElement = document.getElementById('countdown');
	if (countdownElement) {
		countdownElement.innerHTML = remainingTime + '秒';
	}
}, 1000); // 每秒更新一次
</script>

<style lang="less">
.main {
	width: 100%;
	height: 100%;
	overflow: hidden;
	// background: #00ff00;
	position: relative;
	overflow: hidden;
}

.screen {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	z-index: 1;
	left: 0;
}

.control {
	height: 5%;
	position: absolute;
	bottom: 3%;
	left: 36%;
	z-index: 3;
	float: left;
	font-size: 30px;
}
</style>
