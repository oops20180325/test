<template>
  <div>
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
    <Player v-show="songList.length > 0 || !showDetail"></Player>
  </div>
</template>
<script>
  import Player from './components/playerBar'// 播放组件
  import { mapGetters } from 'vuex'// vuex
  export default {
    data () {
      return {
      }
    },
    components: {
      Player
    },
    computed: {
      // 把store中的songList 和showDetail 映射过来 添加到computed中
      ...mapGetters([ // es6展开运算符
        'songList', // 歌单
        'showDetail'// 展示数据
      ])
    }
  }
</script>
