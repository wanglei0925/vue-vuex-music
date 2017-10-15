<template>
  <div class="search">
    <div class="search-box-wrapper ">
      <searchBox ref="searchbox" @query="querychange"></searchBox>
    </div>
    <div class="shortcut-wrapper" v-show="!query">
      <scroll ref="shortcut" class="shortcut" :data="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">
              热门搜索
            </h1>
            <ul>
              <li @click="addquery(item.k)" class="item" v-for="item in hotkey">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showconfirm">
              <i class="icon-clear"></i>
            </span>
            </h1>
            <div>
              <searchList @select="addquery" @delete="deletequery" :searches="searchHistory"></searchList>
            </div>

          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query">
      <suggest @select="saveSearch" :query="query"></suggest>
    </div>
    <confirm :text="text" confirmBtnText="清空" ref="confirm" @confirm="confirm"></confirm>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import searchBox from 'base/search-box/search-box'
  import confirm from 'base/confirm/confirm'
  import searchList from 'base/search-list/search-list'
  import scroll from 'base/scroll/scroll'
  import { getHotKey } from 'api/search'
  import { ERR_OK } from 'api/config'
  import Suggest from 'components/suggest/suggest'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    components: {
      searchBox,
      Suggest,
      searchList,
      confirm,
      scroll
    },
    data() {
      return {
        hotkey: [],
        query: '',
        text: '确认要删除吗?'
      }
    },
    created() {
      this._getHotKey()
    },
    computed: {
      ...mapGetters([
        'searchHistory'
      ]),
      shortcut() {
        return this.hotkey.concat(this.searchHistory)
      }
    },
    watch: {
      query(newq) {
        if (!newq) {
          setTimeout(() => {
            this.$refs.shortcut.refresh()
          }, 20)
        }
      }
    },
    methods: {
      _getHotKey() {
        getHotKey().then((res) => {
          if (res.code === ERR_OK) {
            console.log(res.data.hotkey)
            this.hotkey = res.data.hotkey.slice(0, 10)
          }
        })
      },
      addquery(query) {
        this.$refs.searchbox.setQuery(query)
      },
      deletequery(item) {
        this.deleteSearchHistory(item)
      },
      querychange(query) {
        this.query = query
      },
      saveSearch(item) {
        this.saveSearchHistory(this.query)
      },
      confirm() {
        this.clearSearchHistory()
      },
      showconfirm() {
        this.$refs.confirm.show()
      },
      ...mapActions([
        'saveSearchHistory',
        'deleteSearchHistory',
        'clearSearchHistory'
      ])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: px2rem(40)
    .shortcut-wrapper
      position: fixed
      top: px2rem(356)
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 px2rem(40) px2rem(40) px2rem(40)
          .title
            margin-bottom: px2rem(40)
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: px2rem(10) px2rem(20)
            margin: 0 px2rem(40) px2rem(20) 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 px2rem(40)
          .title
            display: flex
            align-items: center
            height: px2rem(80)
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d

    .search-result
      position: fixed
      top: px2rem(356)
      bottom: 0
      width: 100%
</style>
