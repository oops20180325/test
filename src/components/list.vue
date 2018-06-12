<template>
  <div>
        <!-- , 底部动作条是一个从屏幕底部边缘向上滑出的一个面板，使用这种方式向用户呈现一组功能。底部动作条呈现了简单、清晰、无需额外解释的一组操作。 -->
    <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet ">
      <div class="title-wrapper">
        播放列表（{{songList.length}}）
      </div>
      <hr class="mu-divider">
      <div class="list-wrapper">
        <div class="list-item" :class="{on: item.id == audio.id}" v-for="(item, index) in songList" v-bind:key='index'>
          <!-- 歌曲具体的项 点击会播放 -->
          <div class="left" @click="play(index)">
            <span class="list-name">{{item.name}}</span> <span class="list-singer">&nbsp;-{{item.singer}}&nbsp;</span>
          </div>          
          <!-- 将歌曲移除按钮 -->
          <span class="list-btn" @click="remove(index)">x</span>
          <hr class="mu-divider">
        </div>
      </div>
    </mu-bottom-sheet>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'list',
  data () {
    return {
      bottomSheet: false // 开始是否打开
    }
  },
  methods: {
    // 关闭列表
    closeBottomSheet () {
      this.bottomSheet = false
      if (document.querySelector('.playList')) {
        document.querySelector('.playList').style.position = 'static'
      }
    },
    // 展示列表
    show () {
      this.bottomSheet = true
      if (document.querySelector('.playList')) {
        document.querySelector('.playList').style.position = 'fixed'
      }
    },
    // 吧play那个传给store
    play (index) {
      this.$store.commit('setAudioIndex', index)
    },
     // 吧 要移除的歌曲传给 store
    remove (index) {
      console.log(index)
      this.$store.commit('removeAudio', index)
    }
  },
  // 把store中的songList和audio 映射过来
  computed: {
    ...mapGetters([
      'songList',
      'audio'
    ])
  }
}
</script>
<style lang="less" scoped>
@import "../assets/theme.less";
html,body { height:100%; overflow:hidden }
.title-wrapper {
  font-size: 16px;
  height: 2rem;
  line-height: 2rem;
  color: rgba(0,0,0,.87);
  text-align: center;
  .right-btn {
    line-height: 2.1rem;
    font-size: 12px;
    color: #828080;
    float: right;
    padding-right: 10px;
  }
}
.list-wrapper {
  height: 10rem;
  width: 100%;
  padding: 0 10px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.list-item {
  height: 2rem;
  line-height: 2rem;
  .left {
    max-width: 92%;
    float: left;
    height: 2rem;
    overflow: hidden;
  }
}
.list-name {
  float: left;
  max-width: 72%;
  height: 2rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.list-singer {
  color: #737171;
  font-size: 12px;
}
.list-btn {
  width: 32px;
  text-align: center;
  float: right;
  color: #737171;
}
.on {
  color: @primaryColor;
  .list-singer {
    color: @primaryColor;
  }
}

</style>

