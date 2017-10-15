<template>
  <div ref="player" class="player" v-show="playlist.length>0">
    <transition name="normal">
      <div class="normal-player" v-show="fuuScreen">
        <div class="background">
          <img :src="currentSong.image" width="100%" height="100%">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle">
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd">
                <img :src="currentSong.image" class="image">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{currentIndex}}</div>
            </div>
          </div>
          <scroll class="middle-r" ref="lyricList">
            <div class="lyric-wrapper">
              <div>
                <p>{{currentSong}}</p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l"></span>
            <div class="progress-bar-wrapper">
            </div>
            <span class="time time-r"></span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon i-left">
              <i class="icon-prev"></i>
            </div>
            <div class="icon i-center">
              <i class="icon-play"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!--v-show="!fuuScreen"-->
    <transition name="mini">
      <div class="mini-player" v-show="!fuuScreen" @click="open">
        <div class="icon">
          <img class="img" :src="currentSong.image">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <i class="icon-play-mini"></i>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio"></audio>
  </div>
</template>
<script type="text/ecmascript-6">
  import scroll from 'base/scroll/scroll'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data () {
      return {}
    },
    computed: {
      ...mapGetters([
        'fuuScreen',
        'playlist',
        'currentSong',
        'currentIndex'
      ])
    },
    mounted() {
    },
    methods: {
      back() {
        this.setFullScreen(false)
//        this.$refs.player.style.position = 'relative'
      },
      open() {
        this.setFullScreen(true)
      },
      ...mapMutations({
        setFullScreen: 'SET_FUU_SCREEN'
      })
    },
    ready() {
      console.log(this.playlist)
    },
    components: {
      scroll
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: px2rem(50)
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: px2rem(80)
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: px2rem(40)
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: px2rem(160)
        bottom: px2rem(340)
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: px2rem(60) auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: px2rem(40)
              line-height: px2rem(40)
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: px2rem(64)
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: px2rem(100)
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 px2rem(8)
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: px2rem(40)
              border-radius: px2rem(10)
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: px2rem(20) 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 px2rem(60)
            line-height: px2rem(60)
            width: px2rem(60)
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: px2rem(60)
          .i-left
            text-align: right
          .i-center
            padding: 0 px2rem(40)
            text-align: center
            i
              font-size: px2rem(80)
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, px2rem(-200), 0)
        .bottom
          transform: translate3d(0, px2rem(200), 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: px2rem(120)
      background: $color-highlight-background
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 px2rem(80)
        width: px2rem(80)
        padding: 0 px2rem(20) 0 px2rem(40)
        img
          border-radius: 50%
          width: px2rem(80)
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: px2rem(40)
        overflow: hidden
        .name
          margin-bottom: px2rem(4)
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 px2rem(60)
        width: px2rem(60)
        padding: 0 px2rem(20)
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: px2rem(60)
          color: $color-theme-d
        .icon-mini
          font-size: px2rem(64)
          position: absolute
          left: 0
          top: 0
      .mini-player
        display: flex
        align-items: center
        position: fixed
        left: 0
        bottom: 0
        z-index: 180
        width: 100%
        height: px2rem(120)
        background: $color-highlight-background
        &.mini-enter-active, &.mini-leave-active
          transition: all 0.4s
        &.mini-enter, &.mini-leave-to
          opacity: 0
        .icon
          flex: 0 0 px2rem(80)
          width: px2rem(80)
          padding: 0 px2rem(20) 0 px2rem(40)
          img
            border-radius: 50%
            width: px2rem(80)
            &.play
              animation: rotate 10s linear infinite
            &.pause
              animation-play-state: paused
        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: px2rem(40)
          overflow: hidden
          .name
            margin-bottom: px2rem(4)
            no-wrap()
            font-size: $font-size-medium
            color: $color-text
          .desc
            no-wrap()
            font-size: $font-size-small
            color: $color-text-d
        .control
          flex: 0 0 px2rem(60)
          width: px2rem(60)
          padding: 0 px2rem(20)
          .icon-play-mini, .icon-pause-mini, .icon-playlist
            font-size: px2rem(60)
            color: $color-theme-d
          .icon-mini
            font-size: px2rem(64)
            position: absolute
            left: 0
            top: 0

    @keyframes rotate
      0%
        transform: rotate(0)
      100%
        transform: rotate(360deg)
</style>
