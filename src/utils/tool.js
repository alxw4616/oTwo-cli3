// 常用工具集
var tool = {}

// 倒计时器
/**
 * 倒计时器,该函数将返回一个countdown对象.
 * countdown对象拥有stop(),restart(),start(),done(callback),timeout()方法
 * 注意
 * 1.最后一次为0
 * 2.首次执行必定在延时之后
 * 3.二个参数必须为 number,不然会一直执行
 *
 * 参数
 * @param  {number} n        [倒数读秒]
 * @param  {number} interval [间隔]
 *
 * 示例
 * 无无限循环
	var ss = tool.countdown(-1,1000).done(function (i) {
		console.log(i);
	});

 * 不立即执行
 	var ss = tool.countdown(10,1000).stop().done(function (i) {
		console.log(i);
	});

 * 特定条件停止
 	var ss = tool.countdown(10,1000).done(function (i) {
		console.log(i);
		if (i < 5) {
			this.stop();
		};
	});
 */
tool.countdown = function(n, interval) {
	interval = interval || 1000
	var countdown = {
		idx: 0,
		max: n,
		i: n,
		callback: function() {},
		stop: function() {
			clearTimeout(this.idx)
			return this
		},
		restart: function() {
			this.i = this.max
			this.timeout()
			return this
		},
		start: function() {
			this.callback.apply(countdown, [this.i])
			this.timeout()
			return this
		},
		timeout: function() {
			var self = this
			self.idx = setTimeout(function() {
				// 当 tool.countdown(-1,1000) 时可以一直执行
				if (self.i === 0) {
					return self
				}

				self.i--
				self.timeout()
				self.callback.apply(countdown, [self.i])
			}, interval)
			return self
		},
		done: function(callback) {
			this.callback = (callback)
			return this
		}
	}
	setTimeout(function () {
		countdown.start()
	},15)
	return countdown
}

// 是否为手机
tool.isPhone = function(phone) {
	var reg = /^1[2345789]\d{9}$/
	return reg.test(phone)
}
export default tool
