<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
  <span class="tab-link">
    推荐
  </span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
  <span class="tab-link">
    歌手
  </span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
  <span class="tab-link">
    排行
  </span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
  <span class="tab-link">
    搜索
  </span>
    </router-link>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .tab
    display: flex
    height: px2rem(88)
    line-height: px2rem(88)
    font-size: $font-size-medium
    .tab-item
      flex: 1
      text-align: center
      .tab-link
        padding-bottom: px2rem(10)
        color: $color-text-l
       &.router-link-active
        .tab-link
          border-bottom: 2px solid $color-theme
          color: $color-theme
</style>
