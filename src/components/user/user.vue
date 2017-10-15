<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back">
        <i class="icon-back" @click="back"></i>
      </div>
      <div class="switches-wrapper">
      </div>
      <div ref="playBtn" class="play-btn">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <scroll ref="favoriteList" class="list-scroll" >
          <div class="list-inner">
            333333333
          </div>
        </scroll>
        <scroll ref="playList" class="list-scroll">
          <div class="list-inner">
            555555555
          </div>
        </scroll>
      </div>
      <div class="no-result-wrapper" >
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import scroll from 'base/scroll/scroll'
  export default {
    data() {
      return {
        currentIndex: 0,
        switches: [
          {
            name: '我喜欢的'
          },
          {
            name: '最近听的'
          }
        ]
      }
    },
    components: {
      scroll
    },
    computed: {},
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .user-center
    font-size:px2rem(32)
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .back
      position absolute
      top: 0
      left: px2rem(12)
      z-index: 50
      .icon-back
        display: block
        padding: px2rem(20)
        font-size: $font-size-large-x
        color: $color-theme
    .switches-wrapper
      margin: px2rem(20) 0 px2rem(60) 0
    .play-btn
      box-sizing: border-box
      width: px2rem(230)
      padding: px2rem(14) 0
      margin: 0 auto
      text-align: center
      border: 1px solid  $color-text-l
      color: $color-text-l
      border-radius: px2rem(200)
      font-size: 0
      .icon-play
        display: inline-block
        vertical-align: middle
        margin-right: px2rem(12)
        font-size: $font-size-medium-x
      .text
        display: inline-block
        vertical-align: middle
        font-size: $font-size-small
    .list-wrapper
      position: absolute
      top: 110px
      bottom: 0
      width: 100%
      fonr-size:px2rem(32)
      .list-scroll
        height: 100%
        overflow: hidden
        .list-inner
          padding: px2rem(40) px2rem(60)
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
