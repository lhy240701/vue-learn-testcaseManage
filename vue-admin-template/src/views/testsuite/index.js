import {
  createSuite,
  getList,
  delById,
  getById,
  updateById,
  getTaskNameByServiceName
} from '@/api/testsuite'
const defaultForm = {
  groupName: '',
  createBy: '',
  serviceName: '',
  taskId: ''

}
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

  data() {
    return {
      listLoading: false,
      dialogVisible: false,
      inEdit: false,
      createorOptions: [{
        value: '刘红岩',
        label: '刘红岩'
      }, {
        value: '沈巍',
        label: '沈巍'
      }, {

        value: '庚珊珊',
        label: '庚珊珊'
      }, {
        value: '成明鸽',
        label: '成明鸽'
      }],
      // 列表分页
      listData: [],
      total: 0,
      currentPage: 1,
      listPageForm: { // 分页列表查询条件表单
        groupName: null,
        createBy: null,
        serviceName: null,
        pageNo: 1,
        pageSize: 10
      },
      // 根据serviceName获取的task数据
      serviceNameTasklist: [],
      addRule: { // 校验规则
        serviceName: [
          { required: true, message: '请选择测试系统', trigger: 'blur' }
        ],
        groupName: [
          { required: true, message: '用例集名称必填', trigger: 'blur' }
        ]
      },

      testsuite: {
        id: null,
        groupName: null,
        serviceName: null,
        createBy: null,
        createAt: null,
        caseNum: 0
      },

      deleteForm: { // 删除表单
        confirmDelVisible: false,
        deleteId: null,
        deleteName: null
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    createSuite(ruleForm, form) {
      console.log(this.$refs[ruleForm])
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          createSuite(form).then(res => {
            if (res && res.code === 0) {
              this.$notify({
                title: '温馨提示',
                message: '操作成功',
                type: 'success'
              })
              this.dialogVisible = false
              this.fetchData()
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    fetchData() {
      this.listLoading = true
      getList(this.listPageForm).then(res => {
        if (res && res.code === 0) {
          const data = res.data
          this.listData = data.results
          this.total = parseInt(data.totalCount)
          this.currentPage = data.pageNo
        } else {
          this.$message.error(res.msg)
        }
        this.listLoading = false
      })
    },
    handleFilter(data) {
      getList(data).then(res => {
        if (res && res.code === 0) {
          const data = res.data
          this.listData = data.results
          this.total = parseInt(data.totalCount)
          this.currentPage = data.pageNo
        } else {
          this.$message.error(res.msg)
        }
        this.listLoading = false
      })
    },
    handleSizeChange(pageSize) {
      this.listPageForm.pageSize = pageSize
      this.fetchData()
    },
    handleCurrentChange(pageNo) {
      this.listPageForm.pageNo = pageNo
      this.fetchData()
    },
    showAddDialog() {
      this.dialogVisible = true
      this.testsuite = {}
      this.testsuite = Object.assign({}, defaultForm)
    },
    confirm(id, name) {
      this.deleteForm.deleteId = id
      this.deleteForm.deleteName = name
      this.deleteForm.confirmDelVisible = true
    },
    delById(id) {
      delById(id).then(res => {
        if (res && res.code === 0) {
          this.$notify({
            title: '温馨提示',
            message: '操作成功',
            type: 'success'
          })
          this.deleteForm.confirmDelVisible = false
          this.fetchData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getById(id) {
      getById(id).then(res => {
        if (res && res.code === 0) {
          this.testsuite = res.data
          this.inEdit = true
          this.getTaskNameByServiceName(res.data.serviceName)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    updateById(ruleForm, id, data) {
      console.log(this.$refs[ruleForm])
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          updateById(id, data).then(res => {
            if (res && res.code === 0) {
              this.$notify({
                title: '温馨提示',
                message: '操作成功',
                type: 'success'
              })
              this.inEdit = false
              this.fetchData()
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getTaskNameByServiceName(serviceName) {
      getTaskNameByServiceName(serviceName).then(res => {
        if (res && res.code === 0) {
          this.serviceNameTasklist = res.data
          console.log(this.serviceNameTasklist)
        } else {
          this.$message.error(res.msg)
        }
        this.listLoading = false
      })
    },
    resetForm() {
      this.listPageForm.serviceName = ''
      this.listPageForm.groupName = ''
      this.listPageForm.createBy = ''
    },
    // 跳转到测试用例页面并根据serviceName查询测试用例集
    getTestCaseByServiceName(serviceName) {
      this.$router.push({
        path: '/testcase',
        query: { serviceName: serviceName }
      })
    }

  }
}
