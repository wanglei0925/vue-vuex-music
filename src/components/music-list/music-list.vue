<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title" ref="header"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div ref="playBtn" v-show="songs.length>0" class="play">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="lay"></div>
    <scroll @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll" :data="songs" class="list"
            ref="list">
      <div class="song-list-wrapper" v-show="songs">
        <song @select="selectItem" :songs="songs" :rank="rank"></song>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import song from 'base/song-list/song-list'
  import scroll from 'base/scroll/scroll'
  import { mapActions } from 'vuex'
  export default {
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default() {
          return []
        }
      },
      title: {
        type: String,
        default: ''
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scrollY: 0
      }
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImage})`
      }
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
    },
    mounted() {
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.headerHeight = this.$refs.header.clientHeight
      this.minTranslatey = -this.imageHeight + parseInt(this.headerHeight)
      console.log(this.minTranslatey)
      this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
    },
    methods: {
      back() {
        this.$router.back()
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      selectItem(item, index) {
        this.selectPlay({
          list: this.songs,
          index: index
        })
      },
      ...mapActions([
        'selectPlay'
      ])
    },
    watch: {
      scrollY(newY) {
        let translateY = Math.max(this.minTranslatey, newY)
        let zIndex = 0
        let scale = 1
        let blur = 0
        this.$refs.lay.style['transform'] = `translate3d(0,${translateY}px,0)`
        const percent = Math.abs(newY / this.minTranslatey)
        if (newY > 0) {
          scale = 1 + percent
          zIndex = 10
        } else {
          blur = Math.min(20 * percent, 20)
        }
        this.$refs.filter.style['filter'] = `blur(${blur}px)`
        if (newY < this.minTranslatey) {
          zIndex = 10
          this.$refs.bgImage.style.paddingTop = 0
          this.$refs.bgImage.style.height = `${this.headerHeight}px`
          this.$refs.playBtn.style['display'] = 'none'
        } else {
          this.$refs.bgImage.style.paddingTop = '70%'
          this.$refs.bgImage.style.height = 0
          this.$refs.playBtn.style['display'] = 'block'
        }
        this.$refs.bgImage.style.zIndex = zIndex
        this.$refs.bgImage.style['transform'] = `scale(${scale})`
      }
    },
    components: {
      song,
      scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: px2rem(10)
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      text-align: center;
      no-wrap()
      text-align: center
      line-height: px2rem(60)
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: px2rem(40)
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: px2rem(270)
          padding: px2rem(28) 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: px2rem(100)
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: px2rem(6)
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: px2rem(40) px2rem(40)
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
