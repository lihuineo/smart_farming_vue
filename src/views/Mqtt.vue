<template>

</template>

<script>
import { MQTT_TOPIC } from '../utils/mqttConfig';
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
		};
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
	onLaunch: function () {},
	onShow: function () {
		let _this = this;
		uni.request({
			method: 'GET',
			url: 'https://apis.tianapi.com/tianqi/index?key=e2660aabea7cc81411382319169a4bb2&city=101310101&type=1',
			success(response) {
				console.log(response);
				if (!response.data || response.data.code !== 200) {
					throw new Error('加载失败:' + response.data.msg);
				}
				_this.tianqiData = response.data.result;
				// _this.$refs.popup.open()
			},
			fail(err) {
				console.log(err);
			}
		});
	},
	methods: {
		open() {
			this.$refs.popup.open();
		},
		close() {
			this.$refs.popup.close();
		},
		confirm(value) {
			this.$refs.popup.close();
		},
		// 接收MQTT信息
		getMsg() {
			
			this.$mqttClient.on('message', (topic, message) => {
				// this.receiveNews = JSON.parse(message)
				// const keyValue = Object.values(this.receiveNews)
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

				// console.log('接收的消息：', msg);
				// console.log(`收到主题 ${topic} 的消息.\n ${message}`)
				const that = this;

				switch (topic) {
					case MQTT_TOPIC.SMOKE_TOPIC:
						{
							if (msg['water ds18b20']) {
								// 在需要使用msg的地方使用这个变量
								this.receivedMsg = msg['water ds18b20'];
								if (msg['water ds18b20'] > 30) {
									this.text = '温度过高';
									this.msgDialog('温度过高');
									this.playSound();
								} else {
									this.text = '温度正常';
								}
							}
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
					qos
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
			this.subscribe(
				topic,
				{
					qos
				},
				(error, res) => {
					if (error) {
						console.log('订阅主题错误！', error);
						uni.showToast({
							title: '获取环境数据错误',
							duration: 2000,
							icon: 'error'
						});
						return;
					}
					this.subscribeSuccess = true;
					console.log('订阅的主题1：', res);
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
				}
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
					qos: 2
				};
			} else {
				const msg = '{"open":1}';
				data = {
					topic: 'topic/system/ds/temperature',
					payload: msg,
					qos: 2
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
					qos: 2
				};
			} else {
				const msg = '{"open":3}';
				data = {
					topic: 'topic/system/ds/temperature',
					payload: msg,
					qos: 2
				};
			}
			this.doPublic(data);
		},
		open() {
			const data = {
				topic: 'topic/system/ds/temperature',
				payload: '{open:0}',
				qos: 2
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
				icon: 'none'
			});
			this.showPopup = false;
			// this.inputValue = ''
		}
	}
};
</script>

<style>
</style>