<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item label="测试任务名称">
        <el-input
          v-model="listPageForm.taskName"
          class="filter-item"
          placeholder="请输入测试任务名称"
          @keyup.enter.native="handleFilter"
        />
      </el-form-item>
      <el-form-item label="测试人员">
        <el-input
          v-model="listPageForm.tester"
          class="filter-item"
          placeholder="请输入测试人员"
          @keyup.enter.native="handleFilter"
        />
      </el-form-item>
      <el-form-item label="系统名称">
        <el-select
          v-model="listPageForm.serviceName"
          placeholder="选择系统名称"
          filterable
          remote
          reserve-keyword
          :remote-method="getAllServiceName"
        >
          <el-option
            v-for="item in serviceNameList"
            :key="item.serviceName"
            :label="item.serviceName"
            :value="item.serviceName"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          @click="handleFilter(listPageForm)"
        >
          查询
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          @click="resetForm"
        >
          重置
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          @click="showAddDialog"
        >
          新增
        </el-button>
      </el-form-item>

    </el-form>
    <!--新建测试任务-->
    <el-dialog :title="'新建测试任务'" :visible.sync="dialogVisible">
      <el-form
        ref="ruleForm"
        :model="testTask"
        :rules="addRule"
        label-position="left"
        label-width="80px"
      >
        <el-form-item
          label="任务名称"
          prop="taskName"
          label-width="120px"
        >
          <el-input v-model="testTask.taskName" />
        </el-form-item>
        <el-form-item
          label="测试人员"
          prop="testerList"
          label-position="left"
          label-width="120px"
        >
          <el-select v-model="testTask.testerList" multiple placeholder="请选择测试人员">
            <el-option
              v-for="item in testerList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="系统名称"
          prop="serviceName"
          label-width="120px"
        >
          <el-select
            v-model="testTask.serviceName"
            placeholder="选择系统名称"
            filterable
            remote
            reserve-keyword
            :remote-method="getAllServiceName"
          >
            <el-option
              v-for="item in serviceNameList"
              :key="item.serviceName"
              :label="item.serviceName"
              :value="item.serviceName"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="系统版本"
          prop="version"
          label-width="120px"
        >
          <el-input v-model="testTask.version" />
        </el-form-item>
        <el-form-item label="开始时间" label-width="120px" prop="startAt">
          <el-date-picker
            v-model="testTask.startAt"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 35%;"
          />
        </el-form-item>
        <el-form-item label="结束时间" label-width="120px" prop="endAt">
          <el-date-picker
            v-model="testTask.endAt"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 35%;"
          />
        </el-form-item>
        <el-form-item
          label="总时长"
          prop="duration"
          label-width="120px"
        >
          <el-input v-model="testTask.duration" />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button type="success" @click="createTask('ruleForm',testTask)">
          保存</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!--编辑测试任务-->
    <el-dialog :title="'编辑测试任务'" :visible.sync="inEdit">
      <el-form
        ref="ruleForm"
        :model="testTask"
        :rules="addRule"
        label-position="left"
        label-width="80px"
      >
        <el-form-item
          label="测试任务名称"
          prop="taskName"
          label-position="left"
          label-width="120px"
        >
          <el-input v-model="testTask.taskName" />
        </el-form-item>
        <el-form-item
          label="测试人员"
          prop="testerList"
          label-position="left"
          label-width="120px"
        >
          <el-select v-model="testTask.testerList" multiple placeholder="请选择测试人员">
            <el-option
              v-for="item in testerList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="系统名称"
          prop="serviceName"
          label-width="120px"
        >
          <el-select
            v-model="testTask.serviceName"
            placeholder="选择系统名称"
            filterable
            remote
            reserve-keyword
            :remote-method="getAllServiceName"
          >
            <el-option
              v-for="item in serviceNameList"
              :key="item.serviceName"
              :label="item.serviceName"
              :value="item.serviceName"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="系统版本"
          prop="version"
          label-width="120px"
        >
          <el-input v-model="testTask.version" />
        </el-form-item>
        <el-form-item label="开始时间" label-width="120px" prop="startAt">
          <el-date-picker
            v-model="testTask.startAt"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 35%;"
          />
        </el-form-item>
        <el-form-item label="结束时间" label-width="120px" prop="endAt">
          <el-date-picker
            v-model="testTask.endAt"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 35%;"
          />
        </el-form-item>
        <el-form-item
          label="总时长"
          prop="duration"
          label-position="left"
          label-width="120px"
        >
          <el-input v-model="testTask.duration" />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="inEdit = false">取 消</el-button>
        <el-button type="success" @click="updateTask('ruleForm', testTask.id, testTask)">
          确定</el-button>

      </span>
    </el-dialog>
    <!--删除的确认提示-->
    <el-dialog title="确认信息" :visible.sync="deleteForm.confirmDelVisible">
      <span class="dialog-delete">确定删除 测试任务名称为"<span>{{ deleteForm.deleteName }}</span>" 的测试任务吗？</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="deleteForm.confirmDelVisible = false"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="deleteTask(deleteForm.deleteId)"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-table
      v-loading="listLoading"
      :data="listData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="100">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="测试任务名称" width="200">
        <template slot-scope="scope">
          {{ scope.row.taskName }}
        </template>
      </el-table-column>
      <el-table-column label="测试人员" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.testerList }}</span>
        </template>
      </el-table-column>
      <el-table-column label="系统名称" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.serviceName }}
        </template>
      </el-table-column>
      <el-table-column label="系统版本" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.version }}
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.startAt }}
        </template>
      </el-table-column>
      <el-table-column label="结束时间" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.endAt }}
        </template>
      </el-table-column>
      <el-table-column label="总时长" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.duration }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button
            v-waves
            class="filter-item"
            type="text"
            @click="confirm(scope.row.id,scope.row.taskName)"
          >
            删除
          </el-button>
          <el-button
            v-waves
            class="filter-item"
            type="text"
            @click=" getByTaskID(scope.row.id)"
          >
            编辑
          </el-button>
          <el-button
            v-waves
            class="filter-item"
            type="text"
            @click=" getTestCaseByTaskId(scope.row.id)"
          >
            查看测试用例
          </el-button>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button type="text">上传测试用例</el-button>
          </el-upload>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件-->
    <el-pagination
      :current-page="listPageForm.pageNo"
      :page-sizes="[10, 20, 30, 40]"
      background
      :page-size="10"
      layout="sizes, prev, pager, next, jumper,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import index from './index.js'

export default index

</script>
