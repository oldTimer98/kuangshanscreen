<template>
  <div style="position: relative">
    <div class="navbar" :style="{height:updateHeight?'0px':'50px'}">
      <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
      <!--      <div style="position: absolute;left: 50%;top: 50%;">
         <el-button icon="el-icon-caret-bottom" @click="update"></el-button>
      </div> -->
      <div class="right-menu">
        <!-- <template v-if="device!=='mobile'">
          <search id="header-search" class="right-menu-item" />

          <error-log class="errLog-container right-menu-item hover-effect" />

          <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->

        <!-- <el-tooltip content="Global Size" effect="dark" placement="bottom">
            <size-select id="size-select" class="right-menu-item hover-effect" />
          </el-tooltip>

        </template> -->

        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper">

            <img src="../../assets/images/system.png" class="user-img">
            <div style="font-size: 14px;display: inline-block;">{{ name }}</div>
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <!--  <router-link to="/profile/index">
              <el-dropdown-item>Profile</el-dropdown-item>
            </router-link> -->
            <!-- <router-link to="/">
              <el-dropdown-item>Dashboard</el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
              <el-dropdown-item>Docs</el-dropdown-item>
            </a> -->
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!--     <div style="position: absolute;left: 50%;top: 50%;">
           <el-button icon="el-icon-caret-bottom" @click="update"></el-button>
     </div> -->
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
// import ErrorLog from '@/components/ErrorLog'
// import Screenfull from '@/components/Screenfull'
// import SizeSelect from '@/components/SizeSelect'
// import Search from '@/components/HeaderSearch'

export default {
  components: {
    Breadcrumb,
    Hamburger
    // ErrorLog,
    // Screenfull,
    // SizeSelect,
    // Search
  },
  data() {
    return {
      // updateHeight: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ]),
    updateHeight() {
      return this.$store.state.tagsView.updateHeight
    },
    name() {
      return window.localStorage.name
    }
  },
  methods: {
    // updateHeight(){
    //   return this.$store.state.updateHeight
    // }
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    update() {
      this.$store.commit('tagsView/visible')
    },
    async logout() {
      const userType = localStorage.getItem('userType')
      window.localStorage.clear()
      await this.$store.dispatch('user/logout')
      if (userType === '0') {
        this.$router.push(`/loginDo?redirect=${this.$route.fullPath}`)
      }
      else{
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }
.screen{

}
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-img {
          width: 30px;
          height: 25px;

          margin-right: 14px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 21px;
          font-size: 12px;
        }
      }
    }
  }
}
.toupdateHeight{

}
</style>
