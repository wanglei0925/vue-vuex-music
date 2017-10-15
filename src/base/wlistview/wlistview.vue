<template>
  <scroll
    :data="listdata"
    class="listview"
    :listenScroll="listenScroll"
    @scroll="scroll"
    :probeType="probeType"
    ref="listview">
    <ul>
      <li v-for="group in listdata" class="list-group" ref="listGroup">
        <h2 class="list-group-title" ref="thei">
          {{group.title}}
       </h2>
        <ul>
          <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item">
            <img v-lazy="item.avatar" alt="" class="avatar">
            <span class="name">
              {{item.name}}
            </span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onshortcutTouch" @touchmove.stop.prevent="onshortcutTouchmove">
      <ul>
        <li class="item" v-for="(item, index) in shortcutList" :data-index="index" ref="_height"
            :class="{'current':currentIndex===index}"
        >
          {{item}}





        </li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div>
  </scroll>
</template>
<script type="text/ecmascript-6">
  import scroll from 'base/scroll/scroll'
  //  import { getData } from 'common/js/dom'
  export default{
    props: {
      listdata: {
        type: Array,
        default: []
      }
    },
    computed: {
      shortcutList() {
        return this.listdata.map((group) => {
          return group.title.substr(0, 1)
        })
      },
      fixedTitle() {
        if (this.scrollY > 0) {
          return ''
        }
        return this.listdata[this.currentIndex] ? this.listdata[this.currentIndex].title : ''
      }
    },
    data() {
      return {
        scrollY: -1,
        currentIndex: 0,
        diff: -1
      }
    },
    created() {
      this.listenScroll = true
      this.touch = {}
      this.listHeight = []
      this.probeType = 3
    },
    components: {
      scroll
    },
    methods: {
      selectItem(item) {
        this.$emit('selectItem', item)
      },
      onshortcutTouch(e) {
        let anchorIndex = e.target.getAttribute('data-index')
        this.touch.anchorIndex = anchorIndex
//        this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex], 0)
        let firsttouch = e.touches[0]
        this.touch.y1 = firsttouch.pageY
        this._scrollTo(anchorIndex)
      },
      onshortcutTouchmove(e) {
        let firsttouch = e.touches[0]
        this.touch.y2 = firsttouch.pageY
        let dalta = (this.touch.y2 - this.touch.y1) / this.$refs._height[0].clientHeight | 0
        let anchorIndex = parseInt(this.touch.anchorIndex) + dalta
//        this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex], 0)
        this._scrollTo(anchorIndex)
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      _cacultateHeight() {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
        console.log(this.listHeight)
      },
      _scrollTo(index) {
        if (!index && index !== 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.scrollY = -this.listHeight[index]
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      }
    },
    watch: {
      listdata() {
        setTimeout(() => {
          this._cacultateHeight()
        }, 20)
      },
      scrollY(newY) {
        const listHeight = this.listHeight
//        当滚动到顶部，newy大于0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
//        在中间部分滚动的时候
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            this.diff = height2 + newY
//            console.log(height2)
//            console.log(newY)
//            console.log(this.diff)
            return
          }
        }
//        当滚动到底部 切newy大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2
      },
      diff(newVal) {
        let TITLE_HEIGHT = this.$refs.thei[0].clientHeight
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
//        if (this.fixedTop === fixedTop) {
//          return
//        }
//        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
    mounted () {
//      console.log(this.listdata)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: px2rem(60)
      .list-group-title
        height: px2rem(60)
        line-height: px2rem(60)
        padding-left: px2rem(40)
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: px2rem(40) 0 0 px2rem(60)
        .avatar
          width: px2rem(100)
          height: px2rem(100)
          border-radius: 50%
        .name
          margin-left: px2rem(40)
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: px2rem(40)
      padding: px2rem(40) 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      font-size: px2rem(26)
      .item
        padding: px2rem(4)
        line-height: 1
        color: $color-text-l
        font-size: px2rem(26)
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: px2rem(60)
        line-height: px2rem(60)
        padding-left: px2rem(40)
        font-size: px2rem(26)
        color: $color-text-l
        background: $color-highlight-background
</style>
