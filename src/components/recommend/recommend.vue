<template>
  <div class="good-wrapper" ref="foodsWrapper">
    <div class="bescroll">
      <div class="loading-container" v-show="!dataList.length">
        <loading></loading>
      </div>
      <div class="slider-wrapper">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item,key) in recommends" :key="key">
            <a :href="item.linkUrl" class="swipe-a">
              <img :src="item.picUrl" alt="">
            </a>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="hot-song">
        <h1 class="title">热门歌单推荐</h1>
        <ul class="hot-list">
          <li @click="selectItem(item)" v-for="item in dataList" class="item">
            <div class="icon">
              <img class="icon-img" v-lazy="item.imgurl" alt="">
            </div>
            <div class="text">
              <h2 class="name" v-html="item.creator.name"></h2>
              <p class="desc" v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import { getRecommend, getDiscList } from 'api/recommend'
  import { ERR_OK } from 'api/config'
  import BScroll from 'better-scroll'
  import loading from 'base/loading/loading'
  import { mapMutations } from 'vuex'
  export default {
    data() {
      return {
        recommends: [],
        dataList: []
      }
    },
    mounted() {
      this._getRecommed()
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
//          console.log(res.data)
          this.dataList = res.data.list
          this.$nextTick(() => {
            this._initScroll()
          })
        }
      })
    },
    methods: {
      selectItem(item) {
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
        this.setDsiac(item)
      },
      _getRecommed() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      },
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            console.log(res.data)
            this.dataList = res.data.list
            this._initScroll()
          }
        })
      },
      _initScroll() {
        this.foodsscroll = new BScroll(this.$refs.foodsWrapper, {probeType: 3, click: true})
      },
      ...mapMutations({
        setDsiac: 'SET_DISC'
      })
    },
    components: {
      loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .good-wrapper
    width: 100%
    position: fixed
    bottom: 0
    top: px2rem(176)
    overflow: hidden
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
    .bescroll
      .slider-wrapper
        width: 100%
        height: px2rem(262)
        .swipe-a
          width: 100%
          img
            width: 100%
      .hot-song
        font-size: $font-size-medium-x
        padding: 0 px2rem(30)
        box-sizing: border-box
        .title
          color: $color-theme
          text-align: center
          margin: px2rem(40) 0
        .hot-list
          .item
            display: flex
            margin-bottom: px2rem(40)
            .icon
              width: px2rem(100)
              flex: 0 0 px2rem(100)
              height: px2rem(100)
              .icon-img
                width: 100%
          .text
            margin-left: px2rem(20)
            box-sizing: border-box
            padding: px2rem(15) 0
            .name
              font-size: px2rem(25)
              color: #f8f8f8
              margin-bottom: px2rem(30)
            .desc
              font-size: px2rem(25)
              line-height: px2rem(25)
              font-weight: 600
              color: #5e5e5e
              height: px2rem(25)
              overflow: hidden
              white-space: nowrap
              text-overflow: ellipsis

</style>
