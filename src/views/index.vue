<template>
    <div>
      <div class="fixed-bar">
      <mu-appbar>
        <div class="logo" slot="left"></div>
        <mu-icon-button icon='search'  slot="right"/>
      </mu-appbar>
      <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
        <mu-tab value="rage" title="时下流行"/>
        <mu-tab value="songList" title="歌单"/>
        <mu-tab value="leaderBoard" title="排行榜"/>
        <mu-tab value="hotSinger" title="热门歌手"/>
      </mu-tabs>
      </div>
      <div class="default-view" :class="{view: songList.length > 0}">
        <keep-alive>
         <router-view></router-view>
        </keep-alive>
      </div>
    </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        // 具有激活样式的标签
        activeTab: 'rage'
      }
    },
    created () {
      // 当created函数时监测路由信息,防止页面刷新tab高亮错误
      var tmpArr = this.$route.path.split('/')
      if (tmpArr[1] === 'index') {
        this.handleTabChange(tmpArr[2])
      }
    },
    // watch函数监测路由的变化,保持tab面板的高亮位置正确
    watch: {
      '$route' (to, from) {
        const path = to.path
        var tmpArr = path.split('/')
        if (tmpArr[1] === 'index') {
          this.handleTabChange(tmpArr[2])
        }
      }
    },
    methods: {
      // 处理那个标签处于激活状态
      handleTabChange (val) {
        // console.log(111111, val)
        this.activeTab = val
        this.$router.push({ path: '/index/' + val })
      }
    },
    computed: {
      // 使用对象展开运算符将 getters 混入 computed 对象中
      // 将 store state中的songList 混入 computed 对象中， 然后computed计算属性就检测songList了
      // 看这里https://www.jianshu.com/p/5762377931db
      //  重点看这里 程序都是从右往左读的 下面是将mapGetters函数的运行结果用展开运算符展开。
      ...mapGetters([
        'songList'
      ])
    }
  }
</script>
<style lang="less" scoped>
  @import "../assets/theme.less";
  .logo {
    width: 150px;
    height: 48px;
    background: url("../../static/logo.png") no-repeat left center;
    background-size: cover;
  }
  .view-tabs {
    background-color: #fff;
    color: rgba(0,0,0,.87);
    >.mu-tab-link {
      color: rgba(102,102,102,1);
    }
    >.mu-tab-active{
      color: @primaryColor;
    }
  }

  .fixed-bar {
    position: fixed;
    width: 100%;
    top:0;
    left: 0;
    z-index: 15;
  }
  .default-view {
    margin-top: 104px;
  }
  .view {
    margin-bottom: 2.3rem;
  }
</style>
