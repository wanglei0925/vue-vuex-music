<template>
  <div id="app">
    <Mheder></Mheder>
    <Tab></Tab>
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>
<script>
  import Mheder from 'components/m-header/m-header'
  import Tab from 'components/tab/tab.vue'
  import player from 'components/player/player'
  export default {
    components: {
      Mheder,
      Tab,
      player
    }
  }
</script>

<style>
</style>
