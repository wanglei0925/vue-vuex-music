<template>
  <div class="singer">
    <list-view @selectItem="selectsinger" :listdata="singer"></list-view>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import { getSingerList } from 'api/singer'
  import { ERR_OK } from 'api/config'
  import ListView from 'base/wlistview/wlistview'
  import {mapMutations} from 'vuex'
  const HOT_NAME = '热门'
  const HOT_SINGER = 10
  export default {
    data () {
      return {
        singer: []
      }
    },
    mounted() {
      this._getSingerList()
    },
    methods: {
      selectsinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singer = this._normalizeSinger(res.data.list)
//            console.log(this.singer)
//            console.log(this._normalizeSinger(res.data.list))
          }
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER) {
            map.hot.items.push({
              id: item.Fsinger_mid,
              name: item.Fsinger_name,
              avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=259200`
            })
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push({
            id: item.Fsinger_mid,
            name: item.Fsinger_name,
            avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=259200`
          })
        })
//        console.log(map)
//        为了得到有序列表  做一下处理
        let ret = []
        let hot = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      ListView
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .singer
    position: fixed
    top: px2rem(176)
    bottom: 0
    width: 100%
</style>
