<template>
  <div class="loading">
    <img class="loadin-img" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .loading
    width: 100%
    text-align: center
    .loadin-img
      width:px2rem(40)
      height:px2rem(40)
    .desc
      line-height: px2rem(20)
      font-size:px2rem(32)
      color: $color-text-l
</style>
