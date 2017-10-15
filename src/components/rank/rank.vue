<template>
  <div class="rank">
    <scroll :data="topList" class="toplist" ref="toplist">
      <ul>
        <li class="item" v-for="item in topList" @click="selectItem(item)">
          <div class="icon">
            <img v-lazy="item.picUrl" class="img-icon"/>
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, index) in item.songList">
              <span>{{index + 1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <Loading class="loading-container" v-show="!topList.length"></Loading>
    </scroll>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import { getTopList } from 'api/rank'
  import { ERR_OK } from 'api/config'
  import Loading from 'base/loading/loading'
  import {mapMutations} from 'vuex'
  export default{
    data() {
      return {
        topList: []
      }
    },
    components: {
      Scroll,
      Loading
    },
    created() {
      setTimeout(() => {
        this._getTopList()
      }, 1000)
    },
    methods: {
      _getTopList() {
        getTopList().then((res) => {
          if (res.code === ERR_OK) {
            this.topList = res.data.topList
          }
        })
      },
      selectItem(item) {
        this.$router.push({
          path: `/rank/${item.id}`
        })
        this.setTopList(item)
      },
      ...mapMutations({
        setTopList: 'SET_TOP_LIST'
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: px2rem(176)
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 px2rem(40)
        padding-top: px2rem(40)
        height: px2rem(200)
        &:last-child
          padding-bottom: px2rem(40)
        .icon
          flex: 0 0 px2rem(200)
          width: px2rem(200)
          height: px2rem(200)
          .img-icon
            width: 100%
            height: 100%
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 px2rem(40)
          height: px2rem(200)
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: px2rem(52)
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
