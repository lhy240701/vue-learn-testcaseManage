<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item label="系统简介">
        <el-input
          v-model="listPageForm.groupName"
          class="filter-item"
          placeholder="系统简介"
          @keyup.enter.native="handleFilter"
        />
      </el-form-item>
      <el-form-item label="负责人">
        <el-input
          v-model="listPageForm.createBy"
          class="filter-item"
          placeholder="负责人"
          @keyup.enter.native="handleFilter"
        />
      </el-form-item>
      <el-form-item label="系统名称">
        <el-input
          v-model="listPageForm.serviceName"
          class="filter-item"
          placeholder="系统名称"
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
    <el-dialog :title="'新建系统'" :visible.sync="dialogVisible">
      <el-form
        ref="ruleForm"
        :model="testsuite"
        :rules="addRule"
        label-position="left"
        label-width="80px"
      >
        <el-form-item
          label="系统简介"
          prop="groupName"
          label-position="left"
          label-width="120px"
        >
          <el-input v-model="testsuite.groupName" />
        </el-form-item>
        <el-form-item
          label="负责人"
          prop="createBy"
          label-position="left"
          label-width="120px"
        >
          <el-select v-model="testsuite.createBy" filterable placeholder="请选择创建人员">
            <el-option
              v-for="item in createorOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="系统名称"
          prop="serviceName"
          label-position="left"
          label-width="120px"
        >
          <el-input v-model="testsuite.serviceName" />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button type="success" @click="createSuite('ruleForm',testsuite)">
          保存</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>

    </el-dialog>

    <el-dialog :title="'编辑测试用例集'" :visible.sync="inEdit">
      <el-form
        ref="ruleForm"
        :model="testsuite"
        :rules="addRule"
        label-position="left"
        label-width="80px"
      >
        <el-form-item
          label="系统简介"
          prop="groupName"
          label-position="left"
          label-width="120px"
        >
          <el-input v-model="testsuite.groupName" />
        </el-form-item>
        <el-form-item
          label="负责人"
          prop="createBy"
          label-position="left"
          label-width="120px"
        >
          <el-input v-model="testsuite.createBy" />
        </el-form-item>
        <el-form-item
          label="系统名称"
          prop="serviceName"
          label-position="left"
          label-width="120px"
        >
          <el-input v-model="testsuite.serviceName" />

        </el-form-item>

      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="inEdit = false">取 消</el-button>
        <el-button type="success" @click="updateById('ruleForm',testsuite.id,testsuite)">
          确定</el-button>

      </span>

    </el-dialog>

    <el-dialog title="确认信息" :visible.sync="deleteForm.confirmDelVisible">
      <span class="dialog-delete">确认测试用例集名称为<span> {{ deleteForm.deleteName }} </span>的测试用例集吗？</span>
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
          @click="delById(deleteForm.deleteId)"
        >确 定</el-button>
      </span>
    </el-dialog>

    <div class="table card-shadow">
      <el-table
        v-loading="listLoading"
        :data="listData"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" width="200">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="系统简介" width="350" align="center">
          <template slot-scope="scope">
            {{ scope.row.groupName }}
          </template>
        </el-table-column>
        <el-table-column label="负责人" width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createBy }}</span>
          </template>
        </el-table-column>
        <el-table-column label="系统名称" width="200" align="center">
          <template slot-scope="scope">
            {{ scope.row.serviceName }}
          </template>
        </el-table-column>
        <el-table-column label="测试用例总数" width="200" align="center">
          <template slot-scope="scope">
            {{ scope.row.caseNum }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="200" align="center">
          <template slot-scope="scope">
            {{ scope.row.createAt }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button
              v-waves
              class="filter-item"
              type="text"
              @click="confirm(scope.row.id,scope.row.groupName)"
            >
              删除
            </el-button>
            <el-button
              v-waves
              class="filter-item"
              type="text"
              @click=" getById(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-waves
              class="filter-item"
              type="text"
              @click=" getTestCaseByServiceName(scope.row.serviceName)"
            >
              查看测试用例
            </el-button>

          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="handleCurrentChange"
        :page-sizes="[10, 20, 30]"
        :page-size="10"
        layout=" sizes, prev, pager, next, jumper,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

  </div>
</template>

<script>
import index from './index.js'

export default index
</script>
