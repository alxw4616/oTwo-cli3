/*
	车队卡-备用金划转 step1
	确认用户信息
*/
<template>
	<div class="w" flex-col-tbc>
		<div class="b">
			<!--卡号 -->
			<div class="weui-form" v-if="!form.mobile">
				<div class="weui-form__text-area">
					<h2 class="weui-form__title">车队卡-备用金划转</h2>
				</div>
				<div class="weui-form__control-area">
					<div class="weui-cells__group weui-cells__group_form">
						<div class="weui-cells__title">确认用户信息</div>
						<div class="weui-cells weui-cells_form">
							<div class="weui-cell weui-cell_active">
								<div class="weui-cell__hd"><label class="weui-label">卡号</label></div>
								<div class="weui-cell__bd">
									<input class="weui-input"  v-model.trim="form.cardNumber" placeholder="请输入卡号" @keydown.13="step1" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="weui-form__opr-area">
					<a class="weui-btn weui-btn_primary" :class="{'weui-btn_disabled':!formCheck}" @click="step1">下一卡</a>
				</div>
			</div>
			<!--手机号 - 验证码 -->
			<div class="weui-form" v-if="form.mobile">
				<div class="weui-form__text-area">
					<h2 class="weui-form__title">车队卡-备用金划转</h2>
				</div>
				<div class="weui-form__control-area">
					<div class="weui-cells__group weui-cells__group_form">
						<div class="weui-cells__title">确认用户信息</div>
						<div class="weui-cell weui-cell_active">
							<div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
							<div class="weui-cell__bd">
								<input class="weui-input " type="number" pattern="[0-9]*" disabled placeholder="请输入手机号" v-model.trim="form.mobile" />
							</div>
							<div class="weui-cell__ft">
								<a class="weui-btn_reset weui-btn_icon">
									<i :class="checkMobile"></i>
								</a>
							</div>
						</div>
						<div class="weui-cell weui-cell_active weui-cell_vcode">
							<div class="weui-cell__hd"><label class="weui-label">验证码</label></div>
							<div class="weui-cell__bd">
								<input autofocus class="weui-input" type="text" pattern="[0-9]*" placeholder="输入验证码" maxlength="6" v-model.trim="form.vcode" @keydown.13="step2" />
							</div>
							<div class="weui-cell__ft">
								<button class="weui-btn weui-btn_default weui-vcode-btn" @click="sendSms">{{countdown}}</button>
							</div>
						</div>
					</div>
				</div>
				<div class="weui-form__opr-area">
					<a class="weui-btn weui-btn_primary" :class="{'weui-btn_disabled':!formCheck2}" @click="step2">下一卡</a>
				</div>
			</div>
		</div>
		<div class="f">
			<div class="weui-form__extra-area">
				<div class="weui-footer">
					<p class="weui-footer__text">Copyright © 2017-2028</p>
					<p class="weui-footer__text">中油黑龙江农垦石油有限公司</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
// import {isPhone} from '@/utils/tool.js';
// require('assets/js/Lib')
export default {
	// 组件
	components: {},
	filters: {

	},
	props: {},
	data() {
		return {
			form: {
				cardNumber: '',
				mobile: '',
				vcode: ''
			},
			countdown: '获取验证码'
		}
	},
	// 计算属性
	computed: {
		formCheck: {
			get() {
				if (this.form.cardNumber.length > 4) {
					return true;
				}
				return false;
			},
			set(val) {}
		},
		formCheck2() {
			if (this.form.mobile.length > 4 && this.form.vcode.length > 1) {
				return true;
			}

			return false;
		},
		checkMobile() {
			if (this.$tool.isPhone(this.form.mobile)) {
				return 'weui-icon-success'
			}
			return 'weui-icon-warn'
		}
	},
	// 侦听属性
	watch: {},
	methods: {
		step1(e) {
			if (e.srcElement.className.includes('disabled')) {
				return
			}
			let sendData = {
				'cardNumber': this.form.cardNumber
			}
			this.$store.dispatch('user/mobileByCardNumber', sendData).then((res) => {
				this.form.mobile = res.data[0].mobile
			}).catch((error) => {
				// alert(error.message)
				console.log('user/mobileByCardNumber',error);
			})
		},
		step2(e) {
			if (e.srcElement.className.includes('disabled')) {
				return
			}
			let sendData = {
				'cardNumber': this.form.cardNumber,
				'mobile': this.form.mobile,
				'vcode': this.form.vcode
			}
			this.$store.dispatch('user/userInfo', sendData).then((res) => {
				this.$router.push({
					path:'/step2'
				})
			}).catch((error) => {
				alert(error.message)
				console.log('user/userInfo', error);

			});
		},
		sendSms(e) {
			if (e.srcElement.className.includes('disabled')) {
				return
			}
			if (this.checkMobile == 'weui-icon-warn') {
				return;
			}
			if (this.countdown != '获取验证码') {
				return;
			}

			this.timeIdx = this.$tool.countdown(20, 1000).done((i) => {
				this.countdown = "' " + i
				if (i == 0) {
					this.countdown = '获取验证码'
				}
			});

			let sendData = {
				'mobile': this.form.mobile
			}
			this.$db.sms(sendData).then((res) => {
				// console.log('then', res);
			}).catch((error) => {
				this.timeIdx.stop()
				this.countdown = '获取验证码'
			})
		}
	},
	created() {},
	mounted() {
		this.form = {
			...this.form,
			...this.$store.state.user.loginForm
		}
	},
	beforeDestroy() {
		this.timeIdx && this.timeIdx.stop()
	},
	// destroyed(){},
}

</script>
<!-- 用来污染公共css -->
<style lang="less">
</style>
<!-- 这里用来写私有的css -->
<style lang="less" scoped>
.w {
	height: 100vh;
	overflow-y: auto;
	background: var(--weui-BG-2);
}

</style>
