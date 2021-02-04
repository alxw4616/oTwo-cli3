/**
 * 使用说明
 * this.$store.state.user.info
 * this.$store.dispatch('user/userInfo',{});
 */

import db from '@/utils/db.js'

const state = {
	'init':'',
	'loginForm':{
		'cardNumber': '',
		'mobile': '',
		'vcode': ''
	},
	'info': {},
	'list': []
}

const mutations = {
	loginForm: (state, loginForm) => {
		state.loginForm = loginForm
	},
	info: (state, info) => {
		state.info = info
	},
	list: (state, list) => {
		state.list = list
	},
}

const actions = {
	// user login
	userInfo(store, loginForm) {
		var p = new Promise((resolve, reject) => {
			db.userInfo(loginForm).then((res) => {
				const d = res.data[0];
				store.commit('info', d)
				let ss = [{
					"subMotorcadeId": d.motorcadeId,
					"cardNumber": d.cardNumber,
					"reserve": d.reserve,
					"balance": d.balance,
				}]
				ss = ss.concat(d.list);
				store.commit('list', ss);

				let ss2 = {
					"mobile": loginForm.mobile,
					"cardNumber": loginForm.cardNumber,
					"vcode":loginForm.vcode
				}
				store.commit('loginForm', ss2);

				resolve(res.data[0])
			}).catch((error) => {
				reject(error)
			})
		})
		return p
	},
	mobileByCardNumber(store, form) {
		var p = new Promise((resolve, reject) => {
			db.mobileByCardNumber(form).then((res) => {
				const d = res.data[0];
				store.commit('info', d)
				let ss = {
					"mobile": d.mobile,
					"cardNumber": form.cardNumber,
					"vcode":form.vcode
				}
				store.commit('loginForm', ss);
				resolve(res)
			}).catch((error) => {
				reject(error)
			})
		})
		return p
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
