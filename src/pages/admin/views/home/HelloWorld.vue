<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <div id="coolClockWrap">
      <canvas id="coolClockCanvas" :width="canvas.width" :height="canvas.height"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Admin后台管理系统',
      canvas: {
        width: 430,
        height: 430
      },
      L: 0, // 基础半径
      timer: null
    }
  },
  methods: {
    drawCoolClock () {
      let canvas = document.getElementById('coolClockCanvas')
      // 获取画布的上下文，获取画布， getContext中的参数'2d' 固定的
      let ctx = canvas.getContext('2d')
      // 获取圆心x,y
      let [x0, y0] = [this.canvas.width / 2, this.canvas.height / 2]
      // 设置圆的半径
      this.L = this.canvas.width / 2 - 10
      // 获取时刻度首位距离x0,y0位置
      let [hourMaxL, hourMinL] = [this.L, this.L - 25]
      let [minMaxL, minMinL] = [this.L - 2, this.L - 15]
      let centerL = 15
      // 绑定当前时间
      let oDate = new Date() // 创建本地时间
      let oHours = oDate.getHours() // 根据本地时间返回时间的小时字段
      let oMin = oDate.getMinutes() // 返回时间分钟字段
      let oSen = oDate.getSeconds() // 返回时间秒字段
      // 获取小时、分、秒的角度
      let oHoursValue = -90 + oHours * 30 + oMin / 2
      let oMinValue = -90 + oMin * 6
      let oSenValue = -90 + oSen * 6
      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // 绘制表盘的时钟刻度scale
      this.drawHoursScale(ctx, x0, y0, 12, 8, hourMaxL, hourMinL)
      // 绘制表盘分钟刻度
      this.drawHoursScale(ctx, x0, y0, 60, 3, minMaxL, minMinL)
      // 绘制12个表盘数字
      this.drawScaleNum(ctx, hourMinL - 20, x0, y0)
      // 绘制时针
      this.drawTimeNeedle(ctx, x0, y0, 15, 130, oHoursValue, 'OrangeRed')
      // 绘制分针
      this.drawTimeNeedle(ctx, x0, y0, 10, minMaxL - 10, oMinValue, '#f3a829')
      // 绘制秒针
      this.drawTimeNeedle(ctx, x0, y0, 3, minMaxL - 2, oSenValue, 'red')
      // 绘制秒针尾部
      this.drawSenDotted(ctx, 'red', x0, y0, oSenValue - 180, centerL)
      // 绘制圆心
      this.drawCircleCenter(ctx, x0, y0, 'SteelBlue', centerL)
    },
    /* 绘制表盘的时钟刻度scale */
    // 思路：
    // 已知直角坐标系的中心点坐标（x0,y0）即canvas画布中心点位置。设定L = 长度
    // 计算出时针的角度，通过直角坐标系的计算方法便得出时针刻度的位置。 （12个刻度进行循环便可全部绘制） 计算时针角度的方法：
    // -90 + i * (360 / 12)
    drawHoursScale (ctx, x0, y0, scaleNum, scaleW, maxL, minL) {
      for (let i = 0; i < scaleNum; i++) {
        // 计算时针角度的方法，角度
        let angel = -90 + i * (360 / scaleNum)
        // 直角坐标系的计算方法
        // x = x0 + Math.cos(角度)*长度
        // y = y0 + Math.sin(角度)*长度
        let [x1, y1] = [x0 + Math.cos(angel * Math.PI / 180) * maxL, y0 + Math.sin(angel * Math.PI / 180) * maxL]
        let [x2, y2] = [x0 + Math.cos(angel * Math.PI / 180) * minL, y0 + Math.sin(angel * Math.PI / 180) * minL]
        ctx.save() // 保存路径
        ctx.beginPath()
        ctx.lineWidth = scaleW
        ctx.lineCap = 'round' // 线条末端添加线帽的样式
        ctx.moveTo(x1, y1) // 画笔起始位置
        ctx.lineTo(x2, y2) // 画笔终点位置
        ctx.stroke() // 执行绘制动作
        ctx.closePath() // 此次绘制结束
        ctx.restore() // 与save()呼应，恢复路径
      }
    },
    /* 绘制12个表盘数字 */
    drawScaleNum (ctx, L, x0, y0) {
      for (let i = 0; i < 12; i++) {
        let angel = -90 + i * (360 / 12) // 角度
        let [x, y] = [x0 + Math.cos(angel * Math.PI / 180) * L, y0 + Math.sin(angel * Math.PI / 180) * L]
        let num = i === 0 ? 12 : i
        ctx.save()
        ctx.beginPath()
        ctx.font = '28px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(num, x, y)
        ctx.closePath()
        ctx.restore()
      }
    },
    /* 绘制时、分、秒针 */
    drawTimeNeedle (ctx, x0, y0, lineW, L, angel, color = '#000') {
      let [x, y] = [x0 + Math.cos(angel * Math.PI / 180) * L, y0 + Math.sin(angel * Math.PI / 180) * L]
      ctx.save()
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = lineW
      ctx.lineCap = 'round'
      ctx.moveTo(x0, y0)
      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.closePath()
      ctx.restore()
    },
    /* 绘制圆心 */
    drawCircleCenter (ctx, x0, y0, color, L) {
      ctx.save()
      ctx.beginPath()
      ctx.shadowBlur = 4
      ctx.shadowColor = '#000'
      ctx.fillStyle = color
      ctx.arc(x0, y0, L, 0, 360 * Math.PI / 180)
      ctx.fill()
      ctx.closePath()
      ctx.restore()
    },
    /* 绘制秒针尾部 */
    drawSenDotted (ctx, color, x0, y0, angel, L) {
      let [x, y] = [x0 + Math.cos(angel * Math.PI / 180) * L, y0 + Math.sin(angel * Math.PI / 180) * L]
      ctx.save()
      ctx.beginPath()
      ctx.fillStyle = color
      ctx.arc(x, y, 7, 0, 360 * Math.PI / 180)
      ctx.fill()
      ctx.closePath()
      ctx.restore()
    }
  },
  mounted () {
    this.drawCoolClock()
    this.timer = setInterval(() => {
      this.drawCoolClock()
    }, 30)
  },
  destroyed () {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
