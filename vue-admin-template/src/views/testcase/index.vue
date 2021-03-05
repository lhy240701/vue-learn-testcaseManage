<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item
        label="测试任务名称"
        prop="groupName"
        label-position="left"
        label-width="120px"
      >
        <template>
          <el-select
            v-model="listPageForm.taskId"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="getTaskName"
            :loading="loading"
          >
            <el-option
              v-for="item in testTaskList"
              :key="item.id"
              :label="item.taskName"
              :value="item.id"
            />
          </el-select>
        </template>

      </el-form-item>

      <el-form-item label="系统名称">
        <el-select
          v-model="listPageForm.serviceName"
          placeholder="选择系统名称"
          filterable
          remote
          reserve-keyword
          :remote-method="getAllServiceName"
          @keyup.enter.native="handleFilter"
        >
          <el-option
            v-for="item in serviceNameList"
            :key="item.serviceName"
            :label="item.serviceName"
            :value="item.serviceName"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="功能描述">
        <el-input
          v-model="listPageForm.functionDes"
          class="filter-item"
          placeholder="功能描述"
          @keyup.enter.native="handleFilter"
        />
      </el-form-item>
      <el-form-item label="场景描述">
        <el-input
          v-model="listPageForm.scene"
          class="filter-item"
          placeholder="场景描述"
          @keyup.enter.native="handleFilter"
        />
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
          @click="resetForm()"
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

    <el-dialog :title="'新建测试用例'" :visible.sync="dialogVisible">
      <el-form
        ref="ruleForm"
        :model="testcase"
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
          <template>
            <el-select
              v-model="testcase.taskId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="getTaskName"
              :loading="loading"
            >
              <el-option
                v-for="item in testTaskList"
                :key="item.id"
                :label="item.taskName"
                :value="item.id"
              />
            </el-select>
          </template>

        </el-form-item>

        <el-form-item
          label="系统名称"
          prop="serviceName"
          label-width="120px"
        >
          <el-select
            v-model="testcase.serviceName"
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
          label="功能描述"
          prop="functionDes"
          label-position="left"
          label-width="120px"
        >
          <el-input v-model="testcase.functionDes" />
        </el-form-item>
        <el-form-item
          label="场景描述"
          prop="scene"
          label-position="left"
          label-width="120px"
        >
          <el-input v-model="testcase.scene" />
        </el-form-item>

        <el-form-item
          label="前提条件"
          prop="preRequisite"
          label-position="left"
          label-width="120px"
        >
          <el-input v-model="testcase.preRequisite" />
        </el-form-item>

        <el-form-item
          label="操作步骤"
          prop="step"
          label-position="left"
          label-width="120px"
        >
          <el-input v-model="testcase.step" />
        </el-form-item>
        <el-form-item
          label="自动化用例Id"
          prop="step"
          label-position="left"
          label-width="120px"
        >
          <el-input v-model="testcase.autoCaseId" />
        </el-form-item>

        <el-form-item
          label="预期结果"
          prop="expectedResults"
          label-position="left"
          label-width="120px"
        >
          <el-input v-model="testcase.expectedResults" />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button type="success" @click="createCase('ruleForm',testcase)">
          保存</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>

    </el-dialog>

    <el-dialog title="确认信息" :visible.sync="deleteForm.confirmDelVisible">
      <span class="dialog-delete">确定删除功能：<span> {{ deleteForm.deleteFunc }} </span>的测试用例吗？</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="success"
          @click="deleteForm.confirmDelVisible = false"
        >取 消</el-button>
        <el-button
          v-hasPermissions="'iam:throne:role:delete'"
          type="danger"
          @click="deleteCasebyId(deleteForm.deleteId)"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!--编辑测试用例-->
    <el-dialog :title="'编辑测试用例'" :visible.sync="inEdit">
      <el-form
        ref="ruleForm"
        :model="editTestcase"
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
          <template>
            <el-select
              v-model="editTestcase.taskName"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="getTaskName"
              :loading="loading"
            >
              <el-option
                v-for="item in testTaskList"
                :key="item.taskName"
                :label="item.taskName"
                :value="item.taskName"
              />
            </el-select>
          </template>

        </el-form-item>

        <el-form-item
          label="系统名称"
          prop="serviceName"
          label-width="120px"
        >
          <el-select
            v-model="editTestcase.serviceName"
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
          label="功能描述"
          prop="functionDes"
          label-position="left"
          label-width="120px"
        >
          <el-input v-model="editTestcase.functionDes" />
        </el-form-item>
        <el-form-item
          label="场景描述"
          prop="scene"
          label-position="left"
          label-width="120px"
        >
          <el-input v-model="editTestcase.scene" />
        </el-form-item>

        <el-form-item
          label="前提条件"
          prop="preRequisite"
          label-position="left"
          label-width="120px"
        >
          <el-input v-model="editTestcase.preRequisite" />
        </el-form-item>

        <el-form-item
          label="操作步骤"
          prop="step"
          label-position="left"
          label-width="120px"
        >
          <el-input v-model="editTestcase.step" />
        </el-form-item>
        <el-form-item
          label="自动化用例Id"
          prop="step"
          label-position="left"
          label-width="120px"
        >
          <el-input v-model="editTestcase.autoCaseId" />
        </el-form-item>

        <el-form-item
          label="预期结果"
          prop="expectedResults"
          label-position="left"
          label-width="120px"
        >
          <el-input v-model="editTestcase.expectedResults" />
        </el-form-item>
        <el-form-item
          label="实际结果"
          prop="actualResults"
          label-position="left"
          label-width="120px"
        >
          <el-select v-model="editTestcase.actualResults" filterable placeholder="请选择实际结果">
            <el-option
              v-for="item in resOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="inEdit = false">取 消</el-button>
        <el-button type="success" @click="updateCaseById('ruleForm', editTestcase.id, editTestcase)">
          确定</el-button>

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
      <el-table-column label="测试任务名称" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.taskName }}
        </template>
      </el-table-column>
      <el-table-column label="系统名称" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.serviceName }}
        </template>
      </el-table-column>
      <el-table-column label="功能描述" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.functionDes }}</span>
        </template>
      </el-table-column>
      <el-table-column label="前提条件" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.preRequisite }}
        </template>
      </el-table-column>
      <el-table-column label="场景描述" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.scene }}
        </template>
      </el-table-column>
      <el-table-column label="操作步骤" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.step }}
        </template>
      </el-table-column>
      <el-table-column label="自动化用例Id" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.autoCaseId }}
        </template>
      </el-table-column>
      <el-table-column label="预期结果" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.expectedResults }}
        </template>
      </el-table-column>
      <el-table-column label="实际结果" width="100" align="center">
        <template slot-scope="scope">
          {{ resOption[scope.row.actualResults]['label'] }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="168" align="center">
        <template slot-scope="scope">
          <el-button
            v-waves
            class="filter-item"
            type="text"
            @click="confirm(scope.row.id,scope.row.functionDes)"
          >
            删除
          </el-button>
          <el-button
            v-waves
            class="filter-item"
            type="text"
            @click="getTestCaseById(scope.row.id)"
          >
            编辑
          </el-button>
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
