import request from './request.js'

// 及各表单请求
// 所有ajax请进都需要放在这里
// 对过 this.$db.xx 方法调用. this.$db.xx() 应返回 Promise对象
// 增加配置项 loading , 当 loading !== false 时显示 loading动画
var db = {
	// 通过卡号,获取用户手机号
	mobileByCardNumber(sendData) {
		var db = request.request({
			url: '/mango/mobile/user/mobileByCardNumber',
			method: 'get',

			// {'cardNumber': ''}
			params: sendData,
			data: {}
		})
		return db
	},

	sms(sendData) {
		var db = request.request({
			url: '/mango/mobile/sms',
			method: 'get',

			// {'mobile': ''}
			params: sendData,
			data: {}
		})
		return db
	},

	userInfo(sendData) {
		var db = request.request({

			url: '/mango/mobile/user/infoBySms',
			method: 'get',

			// {cardNumber:'', mobile:'', vcode:''}
			params: sendData,
			data: {}
		})
		return db
	},

	balanceEdit(sendData) {
		var db = request.request({

			url: '/mango/mobile/balance/edit',
			method: 'post',

			// {balance:'', motorcadeId:'', subMotorcadeId:'','pwd':''}
			params: {},
			data: sendData
		})
		return db
	},
}
export default db
