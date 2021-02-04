/*
车队卡-备用金划转 step2
划转
*/
<template>
	<div class="w" flex-col-tbc>
		<div class="b">
			<div class="page__hd">
				<h1 class="page__title">车队卡-备用金划转</h1>
				<p class="page__desc"> 手机号 : {{$store.state.user.loginForm.mobile | mobileFilter}} </p>
				<p class="page__desc"> 备用金 : ¥{{$store.state.user.info.reserve}} | 主卡余额: ¥{{$store.state.user.info.balance}}</p>
			</div>
			<div class="page__bd">
				<div v-for="(item,idx) in list" :key="idx">
					<div class="weui-form-preview">
						<div class="weui-form-preview__hd">
							<div class="weui-form-preview__item">
								<label class="weui-form-preview__label">余额</label>
								<em class="weui-form-preview__value">¥ {{item.balance}}</em>
							</div>
						</div>
						<div class="weui-form-preview__bd">
							<div class="weui-form-preview__item">
								<label class="weui-form-preview__label">卡号</label>
								<span class="weui-form-preview__value">
									{{item.subMotorcadeId | cardFilter}}
									<span v-if="item.cardName">
										({{item.cardName}})
									</span>
								</span>
							</div>
						</div>
						<div class="weui-form-preview__ft">
							<a class="weui-form-preview__btn weui-form-preview__btn_primary" @click.stop="showForm(item)">划转</a>
						</div>
					</div>
					<br>
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
		<transition name="cube-dialog-fade">
			<cube-popup type="dialog" :mask="true" :center="true" v-show="visible">
				<div class="cube-dialog-main">
					<div class="cube-dialog-title">
						<p class="cube-dialog-title-def">划转金额</p>
					</div>
					<div class="cube-dialog-content">
						<div class="cube-dialog-content-def">
							<form>
								<cube-input v-model="form.balance" placeholder="金额" type="number" autofocus></cube-input>
								<cube-input v-model="form.pwd" eye placeholder="支付密码" type="password" @keydown.native.stop.13="save"></cube-input>
							</form>
						</div>
					</div>
					<div class="cube-dialog-btns border-right-1px" flex-row-lrc>
						<a class="cube-dialog-btn border-top-1px" @click="visible=false">取消</a>
						<a class="cube-dialog-btn border-top-1px cube-dialog-btn_highlight" @click="save">确定</a>
					</div>
				</div>
			</cube-popup>
		</transition>
	</div>
</template>
<script>
// import Lib from 'assets/js/Lib';
// require('assets/js/Lib')
export default {
	// 组件
	components: {},
	filters: {},
	data() {
		return {
			list: this.$store.state.user.list,
			visible: false,
			form: {
				balance: '',
				motorcadeId: '',
				subMotorcadeId: '',
				pwd: '',
			}
		}
	},
	// 计算属性
	computed: {
		total: {
			get() {},
			set(val) {}
		}
	},
	// 侦听属性
	watch: {},
	methods: {
		reload(){
			this.list = [];
			this.list=this.$store.state.user.list;
		},
		showForm(item) {
			for(let f1 in this.form){
				this.form[f1] = '';
			}
			this.form.motorcadeId = this.$store.state.user.info.motorcadeId;
			this.form.subMotorcadeId = item.subMotorcadeId;
			this.visible = true

		},
		save(){
			if (this.form.balance <= 0) {
				return;
			}
			if (this.form.pwd.length < 1) {
				return
			}
			let sendData = {
				...this.form
			}
			this.$db.balanceEdit(sendData).then((res) => {
				this.visible = false;
				this.$createDialog({
					type: 'alert',
					title: '划转成功',
					icon: 'cubeic-right',
				}).show()
				let sendData = {
					'cardNumber': this.$store.state.user.loginForm.cardNumber,
					'mobile': this.$store.state.user.loginForm.mobile,
					'vcode': this.$store.state.user.loginForm.vcode
				}
				this.$store.dispatch('user/userInfo', sendData).then((res) => {
					this.reload();
				}).catch((error) => {
					alert(error.message)
					console.log('user/userInfo', error);

				});
			}).catch((error) => {
				// console.log('catch',error);
			})
		}
	},
	created() {},
	mounted() {
		if (this.list.length < 1) {
			this.$createDialog({
				type: 'alert',
				title: '账号错误',
				content: '登陆失效或未能找到相关信息',
				icon: 'cubeic-alert',
				onConfirm: () => {
					this.$router.push({
						path: '/reserve'
					})
				}
			}).show()
		}
	},
	// beforeDestroy(){clearTimeout(this.timeIdx)},
	// destroyed(){},
}

</script>
<!-- 用来污染公共css -->
<style lang="less">
</style>
<!-- 这里用来写私有的css -->
<style lang="less" scoped>
.w {
	min-height: 100vh;
	width: 100%;

	.b {
		width: 100%;
	}

	.page__hd,
	.page__bd {

		width: 100%;
		box-sizing: border-box;
	}

	.page__hd {
		padding: 16px;
	}
}

.cube-dialog-fade-enter-active {
	animation: dialog-fadein .4s;

	.cube-dialog-main {
		animation: dialog-zoom .4s
	}

}



@keyframes dialog-fadein {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}

@keyframes dialog-zoom {
	0% {
		transform: scale(0);
	}

	50% {
		transform: scale(1.1);
	}

	100% {
		transform: scale(1);
	}
}

</style>
