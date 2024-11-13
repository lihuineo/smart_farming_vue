// export const MQTT_IP = '192.168.31.81:8083/mqtt' //mqtt地址端口  
// #endif
// #ifdef H5
export const MQTT_URL = 'ws://localhost:8083/mqtt'
// #endif
const MQTT_USERNAME = '' //mqtt用户名
const MQTT_PASSWORD = '' //密码
//MQTT连接配置
export const MQTT_OPTIONS = {
	connectTimeout: 5000,
	clientId: 'emqx_bigscreen',
	username: MQTT_USERNAME,
	password: MQTT_PASSWORD,
	clean: true
}
//MQTT主题配置
export const MQTT_TOPIC = {
	SMOKE_TOPIC: "topic/system/ds/temperature",
	CSB_TOPIC: "topic/system/distan/stat",
	DEV_TOPIC: "topic/system/ds/temperature",
	// TEMP_HUMI_TOPIC : "topic/system/soil/stat",
	// TEMP_WENDU_TOPIC : "topic/system/water/level",
}