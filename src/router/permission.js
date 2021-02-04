import router from '@/router'
import store from '@/store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// NProgress Configuration
NProgress.configure({
	showSpinner: false
})

// no redirect whitelist
const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async (to, from, next) => {
	NProgress.start()

	// set page title
  	document.title = to.meta.title
	next()
	return

	// 开发测试
	if (process.env.NODE_ENV == 'development') {
		await store.dispatch('user/getPayTypeMap');
		await store.dispatch('selectOptions/getGoodsList');
		next()
		return
	}


	// start progress bar
	NProgress.start()
	if (whiteList.indexOf(to.path) !== -1) {
		// in the free login whitelist, go directly
		next()
		return
	}
	// const hasToken = getToken()
	// 取用户信息及其权限
	if (!store.state.user.userId) {
		next(`/login`)
		NProgress.done()
		return
	}
	if (store.state.selectOptions.goodsList.length <1) {
		await store.dispatch('selectOptions/getGoodsList');
	}
	if (!store.state.user.payTypeMap) {
		await store.dispatch('user/getPayTypeMap');
	}

	next()
	return
})

router.afterEach(() => {
	// finish progress bar
	NProgress.done()
})
