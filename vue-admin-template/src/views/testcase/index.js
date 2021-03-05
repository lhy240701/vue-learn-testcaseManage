import {
  getCaseList,
  getGroupName,
  getTaskName,
  createCase,
  deleteCaseById,
  getTestCaseById,
  updateCaseById
} from '@/api/testcase'
import { getAllServiceName } from '@/api/testtask'

const defaultForm = {
  taskId: '',
  functionDes: '',
  preRequisite: '',
  scene: '',
  expectedResults: ''

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
      testGroupList: [],
      testTaskList: [],
      serviceNameList: [],
      listData: [],
      groupName: null,
      resOption: [
        {
          value: 0,
          label: '未执行'
        }, {
          value: 1,
          label: '成功'
        }, {
          value: 2,
          label: '失败'
        }

      ],
      testcase: {
        id: null,
        taskId: null,
        serviceName: null,
        functionDes: null,
        scene: null,
        preRequisite: null,
        step: null,
        autoCaseId: null,
        expectedResults: null,
        actualResults: null
      },
      editTestcase: {
        id: null,
        taskName: null,
        serviceName: null,
        functionDes: null,
        scene: null,
        preRequisite: null,
        step: null,
        autoCaseId: null,
        expectedResults: null,
        actualResults: null
      },
      total: 0,
      listPageForm: { // 分页列表查询条件表单
        taskId: null,
        serviceName: null,
        functionDes: null,
        scene: null,
        pageNo: 1,
        pageSize: 10
      },
      deleteForm: { // 删除表单
        confirmDelVisible: false,
        deleteId: null,
        deleteFunc: null
      },
      addRule: { // 校验规则

        serviceName: [
          { required: true, message: '系统名称必填', trigger: 'blur' }
        ],
        functionDes: [
          { required: true, message: '功能描述必填', trigger: 'blur' }
        ],
        scene: [
          { required: true, message: '场景描述必填', trigger: 'blur' }
        ],
        expectedResults: [
          { required: true, message: '预期结果必填', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const taskId = this.$route.query.taskId
    if (taskId) {
      this.listPageForm.taskId = taskId
    }
    const serviceName = this.$route.query.serviceName
    if (serviceName) {
      this.listPageForm.serviceName = serviceName
    }
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getCaseList(this.listPageForm).then(res => {
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
      getCaseList(data).then(res => {
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
    // 分页组件的方法
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
      this.testcase = {}
      this.testcase = Object.assign({}, defaultForm)
    },
    getGroupName(groupName) {
      getGroupName(groupName).then(res => {
        if (res && res.code === 0) {
          this.testGroupList = res.data
          console.log(this.testGroupList)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getTaskName(taskName) {
      getTaskName(taskName).then(res => {
        if (res && res.code === 0) {
          this.testTaskList = res.data
          console.log(this.testTaskList)
        } else {
          this.$message.error(res.msg)
        }
      })
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
    createCase(ruleForm, form) {
      console.log(this.$refs[ruleForm])
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          createCase(form).then(res => {
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
    // 删除确认提示
    confirm(id, name) {
      this.deleteForm.deleteId = id
      this.deleteForm.deleteFunc = name
      this.deleteForm.confirmDelVisible = true
    },
    // 根据Id删除测试用例
    deleteCasebyId(id) {
      deleteCaseById(id).then(res => {
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
    // 重置分页查询条件
    resetForm() {
      this.listPageForm.taskId = ''
      this.listPageForm.serviceName = ''
      this.listPageForm.scene = ''
      this.listPageForm.functionDes = ''
    },
    // 根据ID查询测试用例详情
    getTestCaseById(id) {
      getTestCaseById(id).then(res => {
        if (res && res.code === 0) {
          this.editTestcase = res.data
          this.inEdit = true
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 根据Id更新case
    updateCaseById(ruleForm, id, data) {
      console.log(this.$refs[ruleForm])
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          updateCaseById(id, data).then(res => {
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
    }

  }
}
