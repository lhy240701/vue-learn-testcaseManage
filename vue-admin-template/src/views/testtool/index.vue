<template>
  <div class="app-container">
    <div>
      <el-select v-model="redisInfo.env" placeholder="请选择环境">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>根据key查询缓存数据</span>
        </div>
        <el-form :inline="true">
          <el-form-item label="redisKey">
            <el-select
              v-model="redisInfo.key"
              placeholder="选择缓存key"
              filterable
              remote
              reserve-keyword
            >
              <el-option
                v-for="item in redisKey"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item v-show="redisInfo.key === 'aisp:iam:ble'" label="账号">
            <el-input
              v-model="redisInfo.accountId"
              class="filter-item"
              placeholder="请输入账号"
            />
          </el-form-item>
          <el-form-item v-show="redisInfo.key === 'aisp:iam:ble' || redisInfo.key === 'aisp:iam:vehicle:vin'" label="车架号">
            <el-input
              v-model="redisInfo.vin"
              class="filter-item"
              placeholder="请输入车架号"
            />
          </el-form-item>
          <el-form-item v-show="redisInfo.key === 'aisp:iam:ble:config:mobile_model'" label="设备型号">
            <el-input
              v-model="redisInfo.mobileModel"
              class="filter-item"
              placeholder="请输入设备型号"
            />
          </el-form-item>
          <el-form-item v-show="redisInfo.key === 'aisp:iam:ble:config:mobile_model'" label="车系">
            <el-input
              v-model="redisInfo.seriesNo"
              class="filter-item"
              placeholder="请输入车系"
            />
          </el-form-item>
          <el-form-item v-show="redisInfo.key === 'aisp:iam:vehicle:device:id'" label="车辆设备ID">
            <el-input
              v-model="redisInfo.deviceId"
              class="filter-item"
              placeholder="请输入车辆设备ID"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              v-waves
              class="filter-item"
              type="primary"
              @click="getRedisByKey(redisInfo)"
            >
              查询
            </el-button>
          </el-form-item>

        </el-form>
        <el-dialog :title="'redis查询结果'" :visible.sync="showResult">
          <span > 查询结果：</span>
          <el-input v-model="resData"> </el-input>

        </el-dialog>

      </el-card>
    </div>

  </div>
</template>

<script>
import index from './index.js'

export default index

</script>

<style scoped>
.left{
  position: relative;
  margin-left: 90%;
}

.top{
  position: relative;
  margin-top: 2%;
}
</style>

