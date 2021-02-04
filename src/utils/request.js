/**
 * 封装 ajax
 * 全局错误处理
 * 增加配置项 loading , 当 loading !== false 时显示
 */

import axios from 'axios'
import store from '@/store'

// Loading
import Vue from 'vue'
import { Toast } from 'cube-ui'
Vue.use(Toast)
const loading  = Toast.$create({
	txt: 'Loading...',
	time: 0,
	mask: true
})

export var baseURL = process.env.VUE_APP_BASE_API ;

// create an axios instance
const service = axios.create({

	baseURL: baseURL,

	// send cookies when cross-domain requests
	withCredentials: false,
	// request timeout
	timeout: 1000*60,
	headers: {
		"Access-Control-Allow-Origin": "*"
	}
})

// request interceptor
service.interceptors.request.use(
	config => {

		// console.log('loading',loading.isVisible); 可用以判断当前loading显示状态
		if (config.loading !== false) {
			loading.show();
		}

		return config
	},
	error => {
		loading.hide();
		// do something with request error
		console.log('request', error) // for debug
		// return Promise.reject(error)
	}
)

// response interceptor
service.interceptors.response.use(
	/**
	 * If you want to get http information such as headers or status
	 * Please return  response => response
	 */

	/**
	 * Determine the request status by custom code
	 * Here is just an example
	 * You can also judge the status by HTTP Status Code
	 */
	response => {
		loading.hide();
		const res = response.data

		// if the custom code is not 20000, it is judged as an error.
		if (res.code > 0) {
			// 错误处理白名单,需要特别的错误值
			let errMap = ['3001','3010'];
			if (errMap.includes(res.code+'')) {
				console.log('errMap includes');
				return Promise.reject(res)
			}
			window.location = '#/error?message='+res.message

			return Promise.reject(new Error(res.message || 'Error'))
		}

		return res
	},
	error => {
		loading.hide();
		console.log('err' + error) // for debug
		if (error.message.includes('timeout')) {
			error.message = '网络链接超时'
		}
		window.location = '#/error?message='+error.message
		return Promise.reject(error)
	}
)

export default service
