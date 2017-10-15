<template>
  <transition name="slide">
    <musiclist :title="title" :bg-image="bgImage"></musiclist>
  </transition>
</template>

<script type="text/ecmascript-6">
  import musiclist from 'components/music-list/music-list'
  import { mapGetters } from 'vuex'
  import {getSongList} from 'api/recommend'
  import { ERR_OK } from 'api/config'
  export default {
    computed: {
      ...mapGetters([
        'disc'
      ]),
      bgImage() {
        return this.disc.imgurl
      },
      title() {
        return this.disc.dissname
      }
    },
    data() {
      return {}
    },
    created() {
      console.log(this.disc)
      this._getsonglist()
    },
    methods: {
      _getsonglist() {
        if (!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }
        getSongList(this.disc.dissid).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.cdlist[0].songlist)
          }
        })
      }
    },
    components: {
      musiclist
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>

