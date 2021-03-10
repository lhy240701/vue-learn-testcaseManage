export default {
  createsuite: `/testGroup/createGroup`, // 创建测试用例集
  login: '/user/login',
  getList: '/testGroup/getGroupPage', // 分页查询
  delById: '/testGroup/deleteGroup',
  getById: '/testGroup/getGroupById',
  updateById: '/testGroup/updateGroup',
  createTask: `/testTask/createTask`, // 创建测试任务
  getByTaskID: '/testTask/getTaskById', // 获取详情
  deleteTask: '/testTask/deleteTask', // 删除测试任务
  updateTask: '/testTask/updateTask', // 更新测试任务
  getTaskList: '/testTask/getTaskPage', // 分页查询测试任务
  getTaskNameByServiceName: '/testGroup/getTaskName', // 根据serviceName查询测试任务id和taskName
  getGroupName: '/testCase/getGroupName', // 模糊查询用例集id和name
  createCase: '/testCase/createCase', // 创建测试用例
  getAllServiceName: '/testGroup/AllServiceName', // 获取所有的系统
  getTaskName: '/testCase/getTaskName', // 模糊查询测试任务id和name
  getCaseList: '/testCase/getCasePage', // 测试用例分页查询
  deleteCasebyId: '/testCase/deleteCase', // 删除测试用例
  getCaseById: '/testCase/getCaseById', // 根据id查询测试用例详情
  updateCaseById: '/testCase/updateCase', // 根据id更新测试用例详情
  handleExportCases: '/testCase/export' // 根据测试任务id导出测试用例

}
