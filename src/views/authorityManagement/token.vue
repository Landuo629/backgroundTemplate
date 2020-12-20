<template>
  <div class="container">
    <!-- 操作区----start -->
    <el-row class="mgb15">
      <el-col :span="23">
      </el-col>
      <el-col :span="1">
        <!-- 刷新按钮 -->
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button
            icon="el-icon-refresh"
            circle
            size="small"
            @click="refresh"
          ></el-button>
        </el-tooltip>
      </el-col>
    </el-row>

    <!-- 登陆日志 ---start -->
    <!-- 表格部分 -->
    <el-table :data="loginData" border style="width: 100%">
       <el-table-column
      :show-overflow-tooltip="$store.state.permission.tooltip"
        prop="createId"
        align="center"
        label="登陆者ID"
        width="80"
        min-width="150"
      >
      </el-table-column>
       <el-table-column
      :show-overflow-tooltip="$store.state.permission.tooltip"
        prop="createBy"
        align="center"
        label="登陆者 "
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
        prop="remoteAddr"
        align="center"
        label="IP地址"
        min-width="120"
      >
      </el-table-column>
       <el-table-column
      :show-overflow-tooltip="$store.state.permission.tooltip"
        prop="address"
        align="center"
        label="地址信息"
        min-width="120"
      >
      </el-table-column>
       <el-table-column
      :show-overflow-tooltip="$store.state.permission.tooltip"
        prop="userAgent"
        align="center"
        label="用户代理"
        min-width="120"
      >
      </el-table-column>
       <el-table-column
      :show-overflow-tooltip="$store.state.permission.tooltip"
        prop="email"
        align="center"
        label="登陆方式"
        min-width="120"
      >
      </el-table-column>
       <el-table-column
      :show-overflow-tooltip="$store.state.permission.tooltip"
        prop="params"
        align="center"
        label="操作提交的数据"
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
          <el-button @click="loginSeeClick(scope.row)" type="text" size="small"  icon="el-icon-view"
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
      },
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
    };
  },
  // 初始化表格参数
  mounted() {
    this.getUpmsLogloginPage();
  },
  methods: {
    // 刷新按钮
    refresh() {
      this.pageData = [];
      this.getUpmsLogloginPage();
    },
    // 查询登陆日志
    async getUpmsLogloginPage() {
      const res = await apis.systemApi.getUpmsLogloginPage(this.loginRow);
      console.log(res);
      this.pageData = res.data.data; // 登陆日志分页数据
      this.loginData = this.pageData.records; // 登陆日志数据
    },
    // 日志分页 size 变更
    handleSizeChange(val) {
      console.log(val);
      this.loginRow.size = val;
      this.getUpmsLogloginPage();
    },
    // 日志分页 curren 变更
    handleCurrentChange(val) {
      console.log(val);
      this.loginRow.current = val;
      this.getUpmsLogloginPage();
    },
    // 登陆日志查看
    loginSeeClick(row) {
      console.log(row);
      this.loginDataRow = row;
      this.loginSeeVisible = true;
    },
  },
};
</script>
