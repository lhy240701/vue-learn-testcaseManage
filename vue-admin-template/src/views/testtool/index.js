import { getRedisByKey } from '@/api/testtool'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data: function() {
    return {
      resData: null,
      showResult: false,
      redisInfo: {
        env: null,
        key: null,
        accountId: null,
        vin: null,
        mobileModel: '',
        seriesNo: '',
        deviceId: null

      },
      relRedisInfo: {
        env: null,
        key: null
      },
      options: [
        {
          value: 'test_iam',
          label: 'test_iam'
        },
        {
          value: 'test_ble',
          label: 'test_ble'
        }
      ],
      redisKey: [
        {
          value: 'aisp:iam:ble',
          label: 'aisp:iam:ble'
        },
        {
          value: 'aisp:iam:ble:config:mobile_model',
          label: 'aisp:iam:ble:config:mobile_model'
        },
        {
          value: 'aisp:iam:vehicle:vin',
          label: 'aisp:iam:vehicle:vin'

        },
        {
          value: 'aisp:iam:vehicle:device:id',
          label: 'aisp:iam:vehicle:device:id'
        }
      ]

    }
  },
  created() {

  },
  methods: {
    getRedisByKey(redisInfo) {
      this.relRedisInfo.env = redisInfo.env
      if (redisInfo.key === 'aisp:iam:ble') {
        this.relRedisInfo.key = redisInfo.key + ':' + redisInfo.accountId + '_' + redisInfo.vin
      }
      if (redisInfo.key === 'aisp:iam:ble:config:mobile_model') {
        if (redisInfo.mobileModel.length !== 0 && redisInfo.seriesNo.length !== 0 && redisInfo.mobileModel.split(' ').join('').length !== 0 && redisInfo.seriesNo.split(' ').join('').length !== 0) {
          this.relRedisInfo.key = redisInfo.key + ':' + redisInfo.mobileModel + '_' + redisInfo.seriesNo
        } else if (redisInfo.mobileModel.length !== 0 && redisInfo.mobileModel.split(' ').join('').length !== 0 && redisInfo.seriesNo.length === 0) {
          this.relRedisInfo.key = redisInfo.key + ':' + redisInfo.mobileModel
        } else if (redisInfo.mobileModel.length === 0 && redisInfo.seriesNo.length !== 0 && redisInfo.seriesNo.split(' ').join('').length !== 0) {
          this.relRedisInfo.key = redisInfo.key + ':' + redisInfo.seriesNo
        }
      }
      if (redisInfo.key === 'aisp:iam:vehicle:vin') {
        this.relRedisInfo.key = redisInfo.key + ':' + redisInfo.vin
      }
      if (redisInfo.key === 'aisp:iam:vehicle:device:id') {
        this.relRedisInfo.key = redisInfo.key + ':' + redisInfo.deviceId
      }

      getRedisByKey(this.relRedisInfo.env, this.relRedisInfo.key).then(res => {
        if (res && res.code === 0) {
          this.showResult = true
          this.resData = res.data
        } else {
          this.$message.error(res.msg)
        }
        this.listLoading = false
      })
    }

  }
}
