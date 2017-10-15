<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>
    <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .m-header
    position: relative
    height: px2rem(88)
    text-align: center
    color: $color-theme
    font-size: 0
    .icon
      display: inline-block
      vertical-align: top
      margin-top: px2rem(12)
      width: px2rem(60)
      height:  px2rem(64)
      margin-right:  px2rem(18)
      bg-image('logo')
      background-size:px2rem(60) px2rem(64)
    .text
      display: inline-block
      vertical-align: top
      line-height: px2rem(88)
      font-size: $font-size-large
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: px2rem(24)
        font-size: px2rem(40)
        color: $color-theme
</style>
