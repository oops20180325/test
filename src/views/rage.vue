<template>
    <div>
      <div class="loading-wrapper" v-if="isloading" >
          <div class="loading"></div>
          <div class="loading-txt">正在加载中</div>
      </div>
      <div class="container" v-show="!isloading">
      <div id="slider">
        <swiper :options="swiperOption">
          <swiper-slide><img src="/static/banner1.jpg" class="banner-item"  alt=""></swiper-slide>
          <swiper-slide><img src="/static/banner2.jpg" class="banner-item"  alt=""></swiper-slide>
          <swiper-slide><img src="/static/banner3.jpg" class="banner-item"  alt=""></swiper-slide>
          <swiper-slide><img src="/static/banner4.jpg" class="banner-item"  alt=""></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="wrapper">
      <div class="g-title song-list">推荐歌单 <router-link :to="{path: '/index/songList'}">更多></router-link></div>
      <mu-flexbox wrap="wrap" justify="space-around" class="box" :gutter="0">
        <mu-flexbox-item basis="28%" class="item" :key="item.id" v-for="item in playList">
          <router-link :to="{name: 'playListDetail',params: { id: item.id, name: item.name, coverImg: item.coverImgUrl, creator: item.creator, count: item.playCount, desc: item.description }}">
          <div class="bar">{{item.playCount | formatCount}}</div>
          <img class="item-img img-response" :src="item.coverImgUrl + '?param=230y230'" lazy="loading">
          <div class="item-name">{{item.name}}</div>
          </router-link>
        </mu-flexbox-item>
      </mu-flexbox>
        
      </div>
      </div>
    </div>
</template>
<style lang="less" scoped>
  .img-response {
    max-width: 100%;
    height: auto;
  }
  .wrapper {
    padding: 0 5px;
  }
  // 通用的标题样式
  .g-title {
    padding-left: 25px;
    color: #333;
    height: 35px;
    line-height: 35px;
    font-size: 16px;
    a {
      float: right;
      font-size: 12px;
      color: #666;
    }
  }
  // banner样式
  .banner-item {
    width: 100%;
    height: 7.4rem;
    background: url('../../static/banner-item-load.png') no-repeat;
    background-size: cover;
  }

  // 推荐歌单
  .song-list {
    background: url("../../static/aei.png") no-repeat left center;
    background-size: 20px 20px;
  }
  .item {
    position: relative;
    margin: 0 5px 5px 10px;
    height: 100%;
    a {
      color: rgba(0, 0, 0, 0.87);
    }
    .bar {
      position: absolute;
      top: 0;
      left: 0;
      color: #fff;
      width: 100%;
      text-align: right;
      padding: 2px 5px;
      background-color: rgba(0,0,0,.2);
    }

    &-img {
      min-width:5rem;
      min-height: 5rem;
    }

    &-img[lazy=loading] {
      background: url('../../static/default_cover.png') no-repeat;
      background-size: cover;
    }

    &-name {
      overflow : hidden;
      font-size: 12px;
      height: 1.7rem;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .mv {
    background: url("../../static/aee.png") no-repeat left center;
    background-size: 20px 20px;
    &-name {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    &-item {
      position: relative;
      margin: 0 5px 5px 10px;
    }
    &-author {
      font-size: 12px;
      color: #666;
    }
  }
  .loading {
    position: absolute;
    top: 0;
    left: 50%;
    background: #fff;
    width: 2.5rem;
    height: 2.5rem;
    margin-top: 70%;
    margin-left: -1.25rem;
    background: url('../../static/rage_loading.png') no-repeat;
    background-size: cover;
    -webkit-animation: rotating 5s  linear infinite;
    animation: rotating 5s linear infinite;
  }
  .loading-txt {
    position: absolute;
    top:0;
    color: #4a4a4a;
    margin-top: 87%;
    width: 100%;
    text-align:center;
  }

  @keyframes rotating {
      0%{
        transform: rotate(0deg);
      }
      100%{
        transform: rotate(360deg);
      }
  }
</style>
<script>
// 轮播图组件
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// 以上 按说import 组件 之后 应该 Vue.use(组件)一下 这里也可以 在component里注册一下,两个方法都可以，插件和自己写的组件本质上说都是组件
// 自己封装的axue api
import api from '../api'
export default {
  data () {
    return {
      // swiper 配置相关
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationClickable: true
      },
      isloading: true,
      playList: [],
      mvList: []
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created () {
    this.get() // 组件创建的时候就调用get方法获取数据
  },
  methods: {
    // 从接口获取数据
    get () {
      this.$http.get(api.getPlayListByWhere('全部', 'hot', 0, true, 6)).then((res) => {
        this.isloading = false
        this.playList = res.data.playlists
      })
      // this.$toast('Let me give a toast to you all.', {
      //   horizontalPosition: 'center',
      //   verticalPosition: 'bottom'
      // })
    }
  },
  filters: {
    formatCount (v) {
      if (v < 9999) {
        return v
      } else {
        return (v / 10000).toFixed(0) + '万'
      }
    }
  }
}
</script>
