<template>
  <scroll class="suggest" :data="result" :pullup="pullup"
          @scrollToEnd="searchMore"
          ref="suggest"
  >
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result" @click="selectItem(item)">
        <div class="icon">
          <i :class="getIconclas(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" :title="title"></loading>
    </ul>
  </scroll>
</template>
<script type="text/ecmascript-6">
  import { search } from 'api/search'
  import { ERR_OK } from 'api/config'
  import { createSong } from 'common/js/song'
  import scroll from 'base/scroll/scroll'
  import loading from 'base/loading/loading'
  import Singer from 'common/js/singer'
  import { mapMutations } from 'vuex'
  const TYPE_SINGER = 'singer'
  const perpage = 15
  export default {
    props: {
      showSinger: {
        type: Boolean,
        default: true
      },
      query: {
        type: String,
        default: ''
      }
    },
    components: {
      scroll,
      loading
    },
    data() {
      return {
        page: 1,
        pullup: true,
        beforeScroll: true,
        hasMore: true,
        result: [],
        title: ''
      }
    },
    methods: {
      search() {
//        this.page = 1
//        this.hasMore = true
//        this.$refs.suggest.scrollTo(0, 0)
//        search(this.query, this.page, this.showSinger, perpage).then((res) => {
//          if (res.code === ERR_OK) {
//            this.result = this._genResult(res.data)
//            this._checkMore(res.data)
//          }
//        })
        this.hasMore = true
        this.page = 1
        this.$refs.suggest.scrollTo(0, 0)
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          console.log(res)
          if (res.code === ERR_OK) {
            this.result = this._genResult(res.data)
            this._checkMore(res.data)
          }
        })
      },
      _checkMore(data) {
        const song = data.song
        if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
          this.hasMore = false
        }
      },
      searchMore() {
        if (!this.hasMore) {
          return
        }
        this.page++
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          console.log(res)
          if (res.code === ERR_OK) {
            this.result = this.result.concat(this._genResult(res.data))
            this._checkMore(res.data)
          }
        })
      },
      selectItem(item) {
        if (item.type === TYPE_SINGER) {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername
          })
          this.$router.push({
            path: `/search/${singer.id}`
          })
          this.setSinger(singer)
        }
        this.$emit('select', item)
      },
      getDisplayName(item) {
        if (item.type === TYPE_SINGER) {
          return item.singername
        } else {
          return `${item.name}-${item.singer}`
        }
      },
      getIconclas(item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      _genResult(data) {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        if (data.song) {
          ret = ret.concat(this._normalizaSongs(data.song.list))
        }
        return ret
      },
      _normalizaSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    watch: {
      query(newQuery) {
        this.search(newQuery)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 px2rem(60)
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: px2rem(40)
      .icon
        flex: 0 0 px2rem(60)
        width: px2rem(60)
        [class^="icon-"]
          font-size: px2rem(28)
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
