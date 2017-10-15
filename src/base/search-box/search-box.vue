<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" v-model="query" class="box" :placeholder="placeholder"/>
    <i @click="clear" v-show="query" class="icon-dismiss"></i>
  </div>
</template>

<script type="text/ecmascript-6">
  //  import {debounce} from 'common/js/util'

  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    data() {
      return {
        query: ''
      }
    },
    methods: {
      clear() {
        this.query = ''
      },
      setQuery(query) {
        this.query = query
      },
      blur() {
        this.$refs.query.blur()
      }
    },
//    created() {
//      this.$watch('query', debounce((newQuery) => {
//        this.$emit('query', newQuery)
//      }, 200))
//    },
    watch: {
      query(newQuery) {
        this.$emit('query', newQuery)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 px2rem(12)
    height: px2rem(80)
    background: $color-highlight-background
    border-radius: px2rem(12)
    .icon-search
      font-size: px2rem(48)
      color: $color-background
    .box
      flex: 1
      margin: 0 px2rem(10)
      line-height: px2rem(36)
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: px2rem(32)
      color: $color-background
</style>
