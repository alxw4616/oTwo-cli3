/*
错误页面
*/
<template>
	<div class="w" flex-col-tc>
		<div class="logo"></div>
		<div class="weui-form__desc">{{msg}}</div>
		<div class="empty"></div>
		<div class="weui-form__opr-area">
			<a class="weui-btn weui-btn_primary" @click="$router.back()">返回</a>
		</div>
	</div>
</template>
<script>
// import Lib from 'assets/js/Lib';
// require('assets/js/Lib')
export default {
	// 组件
	components: {},
	data() {
		return {
			msg: ''
		}
	},
	// 计算属性
	computed: {},
	// 侦听属性
	watch: {},
	methods: {},
	created() {},
	mounted() {
		this.msg = this.$route.query.message
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
.logo {
	background: transparent url(~@/assets/img/error.png) center center no-repeat;
	background-size: 100%;
	width: 418px * 0.4;
	height: 439px * 0.4;
	margin-top: 30px;
}
.empty{
	width: 100%;
	height: 200px;
}
</style>
