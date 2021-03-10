import { createTask, deleteTask, getAllServiceName, getByTaskID, getTaskPage, updateTask, handleExportCases } from '@/api/testtask'

const defaultForm = {
  taskName: '',
  testerList: [],
  startAt: '',
  endAt: '',
  duration: '',
  id: 0,
  serviceName: '',
  version: ''

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
  data: function() {
    return {
      listLoading: true,
      dialogVisible: false,
      inEdit: false,
      testerList: [{
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
      testTask: {
        taskName: null,
        testerList: null,
        startAt: null,
        endAt: null,
        duration: null,
        id: 0,
        status: null,
        serviceName: null,
        version: null

      },
      listData: [],
      importUrl: '',
      serviceNameList: [],
      addRule: { // 校验规则
        taskName: [
          { required: true, message: '测试任务名称不能为空', trigger: 'blur' }
        ],
        serviceName: [
          { required: true, message: '请选择测试系统', trigger: 'blur' }
        ],
        version: [
          { required: true, message: '系统版本号不能为空', trigger: 'blur' }
        ],
        testerList: [
          { required: true, message: '请选择测试人员', trigger: 'change' }
        ],
        duration: [
          { required: true, message: '时长不能为空', trigger: 'blur' }
        ],
        startAt: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        endAt: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      // 分页查询
      list: null,
      currentPage: 1,
      total: 0,
      listPageForm:
        {
          taskName: null,
          serviceName: null,
          tester: null,
          pageNo: 1,
          pageSize: 10

        },
      deleteForm:
        { // 删除表单
          confirmDelVisible: false,
          deleteId: null,
          deleteName: null
        }

    }
  },
  created() {
    this.fetchData()
    this.importUrl = process.env.VUE_APP_BASE_API
  },
  methods:
    {
      createTask(ruleForm, form) {
        if (new Date(this.testTask.startAt).getTime() > new Date(this.testTask.endAt).getTime()) {
          this.$notify({
            title: '温馨提示',
            message: '开始时间不能大于结束时间',
            type: 'error'
          })
          return
        }
        console.log(this.$refs[ruleForm])
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            createTask(form).then(res => {
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
        getTaskPage(this.listPageForm).then(res => {
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
        getTaskPage(data).then(res => {
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
      showAddDialog() {
        this.dialogVisible = true
        this.testTask = {}
        this.testTask = Object.assign({}, defaultForm)
      },
      showEditDialog() {
        this.inEdit = true
      },
      // 删除确认框
      confirm(id, name) {
        this.deleteForm.deleteId = id
        this.deleteForm.deleteName = name
        this.deleteForm.confirmDelVisible = true
      },
      deleteTask(id) {
        deleteTask(id).then(res => {
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
      getByTaskID(id) {
        getByTaskID(id).then(res => {
          if (res && res.code === 0) {
            this.testTask = res.data
            this.inEdit = true
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      updateTask(ruleForm, id, data) {
        if (new Date(this.testTask.startAt).getTime() > new Date(this.testTask.endAt).getTime()) {
          this.$notify({
            title: '温馨提示',
            message: '开始时间不能大于结束时间',
            type: 'error'
          })
          return
        }
        console.log(this.$refs[ruleForm])
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            updateTask(id, data).then(res => {
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
      // 分页组件的方法
      handleSizeChange(pageSize) {
        this.listPageForm.pageSize = pageSize
        this.fetchData()
      },
      handleCurrentChange(pageNo) {
        this.listPageForm.pageNo = pageNo
        this.fetchData()
      },
      // 查询所有的serviceName
      getAllServiceName() {
        getAllServiceName().then(res => {
          if (res && res.code === 0) {
            this.serviceNameList = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      resetForm() {
        this.listPageForm.serviceName = ''
        this.listPageForm.taskName = ''
        this.listPageForm.tester = ''
      },
      // 跳转到测试用例页面并根据测试任务id查询测试用例集
      getTestCaseByTaskId(taskId) {
        this.$router.push({
          path: '/testcase',
          query: { taskId: taskId }
        })
      },
      handleBeforUpload() {
        this.loadingModal = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'li-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      },
      handleImportSuccess(res) {
        if (res.code * 1 === 0) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.fetchData()
        } else {
          this.$message.error(res.msg)
        }
        this.loadingModal.close()
      },
      // 手动导出测试用例到excel文件
      handleExportCases(id) {
        window.location.href = process.env.VUE_APP_BASE_API + '/testCase/export/' + id
      }
    }

}
