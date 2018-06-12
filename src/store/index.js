import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import api from '../api'
Vue.use(Vuex)
 /* store 主要储存当 前歌曲信息 播放列表信息 歌词 当前播放状态等  */
const store = new Vuex.Store({
  state: {
    //  这里存储数据
    // 可以吧state想象成 组建中的data，专门用来存储数据的
    audio: {
      'id': 0,
      'name': 'duet',
      'singer': 'Rachael Yamagata',
      'albumPic': 'http://p1.music.126.net/jRUHQ3Ect0kIkXvmFfCVPA==/18619129906453908.jpg?param=130y130',
      'location': 'http://m10.music.126.net/20180323170918/230b5f621ca024fef4c496dc211f1718/ymusic/097e/769d/50e4/4f0d1e6ef48da0b7fa821cefe08bda72.mp3',
      'album': ''
    },
    lyric: '',
    currentIndex: 0, // 当前播放的歌曲位置
    playing: false, // 是否正在播放
    loading: false, // 是否正在加载中
    showDetail: false,
    songList: [],    // 播放列表
    currentTime: 0,
    tmpCurrentTime: 0,
    durationTime: 0,
    bufferedTime: 0,
    change: false   // 判断是更改的时间还是播放的时间
  },
  getters: {
    // 这里的getters，只负责对外提供数据，不负责修改数据，如果要修改state中的数据去找mutations
    audio: state => state.audio,
    playing: state => state.playing,
    loading: state => state.loading,
    showDetail: state => state.showDetail,
    durationTime: state => state.durationTime,
    currentIndex: state => state.currentIndex,
    bufferedTime: state => state.bufferedTime,
    tmpCurrentTime: state => state.tmpCurrentTime,
    songList: state => state.songList,
    change: state => state.change,
    currentTime: state => state.currentTime,
    prCurrentTime: state => {
      return state.currentTime / state.durationTime * 100
    },
    prBufferedTime: state => {
      return state.bufferedTime / state.durationTime * 100
    }
  },
  mutations: {
    // 这里存放操作state中数据的方法
    play (state) {
      state.playing = true
    },
    pause (state) {
      state.playing = false
    },
    toggleDetail (state) {
      state.showDetail = !state.showDetail
    },
    setAudio (state) {
      state.audio = state.songList[state.currentIndex - 1]
    },
    setAudioIndex (state, index) {
      state.audio = state.songList[index]
      state.currentIndex = index + 1
    },
    removeAudio (state, index) {
      state.songList.splice(index, 1)
      if (index === state.songList.length) {
        index--
      }
      state.audio = state.songList[index]
      state.currentIndex = index + 1
      if (state.songList.length === 0) {
        state.audio = {
          'id': 0,
          'name': '歌曲名称',
          'singer': '演唱者',
          'albumPic': '/static/player-bar.png',
          'location': '',
          'album': ''
        }
        state.playing = false
      }
    },
    setChange (state, flag) {
      state.change = flag
    },
    setLocation (state, location) {
      state.audio.location = location
    },
    updateCurrentTime (state, time) {
      state.currentTime = time
    },
    updateDurationTime (state, time) {
      state.durationTime = time
    },
    updateBufferedTime (state, time) {
      state.bufferedTime = time
    },
    changeTime (state, time) {
      state.tmpCurrentTime = time
    },
    openLoading (state) {
      state.loading = true
    },
    closeLoading (state) {
      state.loading = false
    },
    resetAudio (state) {
      state.currentTime = 0
    },
    playNext (state) { // 播放下一曲
      state.currentIndex++
      if (state.currentIndex > state.songList.length) {
        state.currentIndex = 1
      }
      state.audio = state.songList[state.currentIndex - 1]
    },
    playPrev (state) { // 播放上一曲
      state.currentIndex--
      if (state.currentIndex < 1) {
        state.currentIndex = state.songList.length
      }
      state.audio = state.songList[state.currentIndex - 1]
    },
    addToList (state, songs) {
      var items = Array.prototype.concat.call(songs) // 就是获取一个数组
      items.forEach(item => {
        var flag = false
        state.songList.forEach(function (element, index) { // 检测歌曲重复
          if (element.id === item.id) {
            flag = true
            state.currentIndex = index + 1
          }
        })
        if (!flag) {
          state.songList.push(item)
          state.currentIndex = state.songList.length
        }
      })
    },
    setLrc (state, lrc) {
      state.lyric = lrc
    }
  },
  // 异步的数据操作
  actions: {
    getSong ({commit, state}, id) {
      // 使用 CancelToken 退出一个Axios事件
      var CancelToken = Axios.CancelToken
      var source = CancelToken.source()
      if (state.loading && state.songList.length > 0) {
        console.log('cancel')
        source.cancel()
      }
      commit('openLoading')
      Axios.get(api.getSong(id)).then(res => {
        // 统一数据模型，方便后台接口的改变
        var url = res.data.data[0].url
        commit('setAudio')
        commit('setLocation', url)
      })
      .catch((error) => {     // 错误处理
        console.log(error)
        window.alert('获取歌曲信息出错！')
      })
    }
  }
})
export default store
