<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song, index)" class="item" v-for="(song, index) in songs">
        <div class="rank" v-show="rank">
          <span :class="getRankCls(index)" v-text="getRankText(index)"></span>
        </div>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      selectItem(item, index) {
        this.$emit('select', item, index)
      },
      getDesc(song) {
        return `${song.singer}·${song.album}`
      },
      getRankCls(index) {
        if (index <= 2) {
          return `icon icon${index}`
        } else {
          return 'text'
        }
      },
      getRankText(index) {
        if (index > 2) {
          return index + 1
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: px2rem(128)
      font-size: $font-size-medium
      .rank
        flex: 0 0 px2rem(50)
        width: px2rem(50)
        margin-right: px2rem(60)
        text-align: center
        .icon
          display: inline-block
          width: px2rem(50)
          height:px2rem(48)
          background-size: px2rem(50) px2rem(48)
          &.icon0
            bg-image('first')
          &.icon1
            bg-image('second')
          &.icon2
            bg-image('third')
        .text
          color: $color-theme
          font-size: $font-size-large
      .content
        flex: 1
        line-height: px2rem(40)
        overflow: hidden
        .name
          no-wrap()
          color: $color-text
        .desc
          no-wrap()
          margin-top: px2rem(8)
          color: $color-text-d
</style>
