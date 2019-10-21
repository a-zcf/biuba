<template>
  <div id="admin">
    <!-- <h1>后台管理部分</h1> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="less">
@import './styles/index.less';
#admin {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
}
</style>
