<template>
  <div id="mobile">
    <h1>移动端</h1>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'Mobile'
}
</script>

<style lang="less">
@import './styles/index.less';
#mobile {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
