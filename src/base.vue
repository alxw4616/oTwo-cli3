/*
  注释
*/
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>
<script>
// import Lib from 'assets/js/Lib';
// require('assets/js/Lib')
export default {
  // 组件
  components: {},
  filters: {
    // 显示 带*号的身份证号码
    showCert(val) {
      if (!val) {
        return
      }
      const left = val.slice(0, 6)
      const right = val.slice(-4)
      console.log(left, right)
      return left + '*'.repeat(6) + right
    }
  },
  props: {
    label: {
      type: String,
      default: function() {
        return '请选择图片'
      }
    }
  },
  data() {
    return {
      msg: 'HelloWorld'
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
  methods: {},
  created(){},
  mounted() {},
  // beforeDestroy(){clearTimeout(this.timeIdx)},
  // destroyed(){},
}

</script>
<!-- 用来污染公共css -->
<style lang="less">
</style>
<!-- 这里用来写私有的css -->
<style lang="less" scoped>
// @import '~@/assets/css/base.less';

// h2 {
// 	font-weight: normal;
// 	color: @c;
// 	.border-radius(4px);
// }

</style>
