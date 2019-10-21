<template>
  <div id="pc">
    <h1>pc端可以看了</h1>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'Pc'
}
</script>

<style lang="less">
@import './styles/index.less';
#pc {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
