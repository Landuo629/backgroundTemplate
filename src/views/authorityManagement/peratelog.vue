<template>
  <div class="container">
    <!-- 操作区----start -->
    <!-- 搜索框----start -->
    <el-row v-show="inputShow" style="margin-bottom: 20px">
      <el-col :span="6">
        <span>类型：</span>
        <el-select v-model="loginRow.type" size="small" placeholder="请选择">
          <el-option label="正常" :value="0"> </el-option>
          <el-option label="异常" :value="1"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <span>请求方式：</span>
        <el-select v-model="loginRow.method" size="small" placeholder="请选择">
          <el-option label="查询" value="GET"> </el-option>
          <el-option label="更新" value="PUT"> </el-option>
          <el-option label="新增" value="POST"> </el-option>
          <el-option label="删除" value="DELETE"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="12">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-search"
          @click="refresh"
          >搜索</el-button
        >
        <el-button size="small" icon="el-icon-delete">清空</el-button>
      </el-col>
    </el-row>

    <el-row class="mgb15">
      <el-col :span="22">
        <!-- <el-button size="small" round type="primary" @click="formPrintClick"
        >打印</el-button
      >
      <el-button size="small" round type="primary" @click="formExportClick"
        >导出</el-button
      > -->
      </el-col>
      <el-col :span="2">
        <!-- 刷新按钮 -->
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button
            icon="el-icon-refresh"
            circle
            size="small"
            @click="refresh"
          ></el-button>
        </el-tooltip>
        <!-- 显示搜索按钮 -->
        <el-tooltip class="item" effect="dark" content="搜索" placement="top">
          <el-button
            icon="el-icon-search"
            circle
            size="small"
            @click="inputShow = !inputShow"
          ></el-button>
        </el-tooltip>
      </el-col>
    </el-row>

    <!-- 登陆日志 ---start -->
    <!-- 表格部分 -->
    <el-table :data="loginData" border style="width: 100%">
       <el-table-column
      :show-overflow-tooltip="$store.state.permission.tooltip"
        type="index"
        align="center"
        label="序号"
        width="80"
        min-width="150"
      >
      </el-table-column>
       <el-table-column
      :show-overflow-tooltip="$store.state.permission.tooltip"
        prop="type"
        align="center"
        label="类型"
        min-width="120"
        :formatter="typeFormat"
      >
      </el-table-column>
       <el-table-column
      :show-overflow-tooltip="$store.state.permission.tooltip" prop="title" align="center" label="标题" min-width="120">
      </el-table-column>
       <el-table-column
      :show-overflow-tooltip="$store.state.permission.tooltip"
        prop="remoteAddr"
        align="center"
        label="IP地址"
        min-width="120"
      >
      </el-table-column>
       <el-table-column
      :show-overflow-tooltip="$store.state.permission.tooltip"
        prop="requestUri"
        align="center"
        label="资源路径"
        min-width="120"
      >
      </el-table-column>
       <el-table-column
      :show-overflow-tooltip="$store.state.permission.tooltip"
        prop="method"
        align="center"
        label="请求方式"
        min-width="120"
        :formatter="methodFormat"
      >
      </el-table-column>
       <el-table-column
      :show-overflow-tooltip="$store.state.permission.tooltip"
        prop="serviceId"
        align="center"
        label="操作人"
        min-width="120"
      >
      </el-table-column>
       <el-table-column
      :show-overflow-tooltip="$store.state.permission.tooltip"
        prop="time"
        align="center"
        label="请求时间"
        min-width="120"
      >
      </el-table-column>
       <el-table-column
      :show-overflow-tooltip="$store.state.permission.tooltip"
        prop="createTime"
        align="center"
        label="创建时间"
        min-width="120"
      >
      </el-table-column>
       <el-table-column
      :show-overflow-tooltip="$store.state.permission.tooltip"
        fixed="right"
        align="center"
        label="操作"
        min-width="100"
      >
        <template slot-scope="scope">
          <el-button
            @click="loginSeeClick(scope.row)"
            icon="el-icon-view"
            type="text"
            size="small"
            >查看</el-button
          >
          <el-button
            @click="loginDeleteClick(scope.row)"
            type="text"
            size="small"
            icon="el-icon-delete"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="loginRow.current"
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageData.total"
    >
    </el-pagination>

    <!-- 查看日志 ---start -->
    <el-dialog
      title="查看日志"
      class="see"
      :visible.sync="loginSeeVisible"
      width="700px"
    >
      <el-form
        :label-position="labelPosition"
        :label-width="labelWidth"
        :inline="true"
        :model="loginDataRow"
        class="demo-form-inline"
      >
        <el-form-item label="登陆者ID">
          <el-input v-model="loginDataRow.createId" readonly></el-input>
        </el-form-item>
        <el-form-item label="登陆者">
          <el-input v-model="loginDataRow.createBy" readonly></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="loginDataRow.createTime" readonly></el-input>
        </el-form-item>
        <el-form-item label="IP地址">
          <el-input v-model="loginDataRow.remoteAddr" readonly></el-input>
        </el-form-item>
        <el-form-item label="地址信息">
          <el-input v-model="loginDataRow.address" readonly></el-input>
        </el-form-item>
        <el-form-item label="用户代理">
          <el-input v-model="loginDataRow.userAgent" readonly></el-input>
        </el-form-item>
        <el-form-item label="登陆方式">
          <el-input v-model="loginDataRow.email" readonly></el-input>
        </el-form-item>
        <el-form-item label="操作提交的数据">
          <el-input v-model="loginDataRow.params" readonly></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="loginDataRow.createTime" readonly></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import apis from "@/apis/apis";
export default {
  data() {
    return {
      pageData: [], // 登陆日志分页数据
      loginData: [], // 登陆日志数据
      loginSeeVisible: false, // 查看日志弹出框的布尔值
      loginDataRow: {}, // 单行登陆日志数据
      // 登陆日志查询参数配置
      loginRow: {
        current: 1, // 查询当前页数
        size: 10, // 数据大小
        createId: "", // 登陆者ID
        type: "", // 搜索框类型
        method: "", // 搜索框方法
      },
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      inputShow: true, // 显示搜索栏的布尔值
    };
  },
  // 初始化表格参数
  mounted() {
    this.getUpmsLogPage();
  },
  methods: {
    // 刷新按钮
    refresh() {
      this.loginData = [];
      this.getUpmsLogPage();
    },
    // 查询登陆日志
    async getUpmsLogPage() {
      const res = await apis.systemApi.getUpmsLogPage(this.loginRow);
      console.log(res);
      this.pageData = res.data.data; // 登陆日志分页数据
      this.loginData = this.pageData.records; // 登陆日志数据
    },
    // 日志分页 size 变更
    handleSizeChange(val) {
      console.log(val);
      this.loginRow.size = val;
      this.getUpmsLogPage();
    },
    // 日志分页 curren 变更
    handleCurrentChange(val) {
      console.log(val);
      this.loginRow.current = val;
      this.getUpmsLogPage();
    },
    // 登陆日志查看
    loginSeeClick(row) {
      console.log(row);
      this.loginDataRow = row;
      this.loginSeeVisible = true;
    },
    // 登陆日志删除
    async loginDeleteClick(row) {
      try {
        const qqq = await this.$confirm(
          "此操作将永久删除此日志, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        );
        const res = await apis.systemApi.deleteUpmsLog(row.id);
        console.log(res);
        if (res.data.code == 0) {
          this.$message.success("删除成功");
          this.refresh();
        } else {
          this.$message.error(res.data.msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 请求方式值回调
    methodFormat(row, column) {
      switch (row.method) {
        case "GET":
          return "查询";
        case "PUT":
          return "更新";
        case "POST":
          return "新增";
        case "DELETE":
          return "删除";
      }
    },
    // 日志类型回调
    typeFormat(row, column) {
      switch (row.type) {
        case "0":
          return "正常";
        case "1":
          return "异常";
      }
    },
  },
};
</script>
