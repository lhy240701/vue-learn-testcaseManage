<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{ routeName }}</a>
      <button
        class="navbar-toggler navbar-burger"
        type="button"
        :aria-expanded="$sidebar.showSidebar"
        aria-label="Toggle navigation"
        @click="toggleSidebar"
      >
        <span class="navbar-toggler-bar" />
        <span class="navbar-toggler-bar" />
        <span class="navbar-toggler-bar" />
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <p>
              <el-select v-model="env" placeholder="选择当前环境,默认test" οnchange="setEnv">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  @click.native.prevent="setEnv"
                />
              </el-select>
            </p>
            <label>环境切换未回显，请每次请求前重新选择环境</label>
          </li>
        </ul>
      </div>
    </div>
    <div /></nav>
</template>
<script>
import { setEnv } from '../../service/env'
export default {
  data() {
    return {
      activeNotifications: false,
      env: null,
      isSuccess: false,
      options: [{
        value: 'TEST_K8S',
        label: 'test'
      }, {
        value: 'TESTONE_K8S',
        label: 'testone'
      }, {
        value: 'TESTTWO',
        label: 'testtwo'
      }, {
        value: 'PTEST',
        label: 'ptest'
      }, {
        value: 'ONTEST',
        label: 'ontest'
      }, {
        value: 'DEV',
        label: 'dev'
      }],
      value: ''
    }
  },
  computed: {
    routeName() {
      const { name } = this.$route
      return this.capitalizeFirstLetter(name)
    }
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications
    },
    closeDropDown() {
      this.activeNotifications = false
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false)
    },
    async setEnv() {
      console.info(this.env)
      if (this.env != null) {
        this.isSuccess = setEnv(this.env)
        if (this.isSuccess = true) {
          this.$message({
            message: '环境切换成功',
            type: 'success'
          })
        } else {
          this.$message.error('环境切换失败，请重试')
        }
      }
    }
  }
}

</script>
<style>
</style>
