<template>
  <div class="container">
    <el-container>
      <!-- 侧边栏容器 -->
      <el-aside width="15%">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText">
        </el-input>
        <el-tree
          :data="labelData"
          :props="labelDataProps"
          @node-click="labelDataClick"
          ref="tree"
          :filter-node-method="filterNode"
        ></el-tree>
      </el-aside>
      <!-- 主要区域容器 -->
      <el-main>
        <!-- 操作区----start -->
        <el-row class="mgb15">
          <el-col :span="23">
            <el-button
              size="small"
              icon="el-icon-plus"
              type="primary"
              @click="formAddClick"
              v-if="buttonList.indexOf('sys:user:add') != -1"
              >新增</el-button
            >
          </el-col>
          <el-col :span="1">
            <!-- 刷新按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="刷新"
              placement="top"
            >
              <el-button
                icon="el-icon-refresh"
                circle
                size="small"
                @click="refresh"
              ></el-button>
            </el-tooltip>
          </el-col>
        </el-row>
        <!-- 表格部分 -->
        <el-table :data="tableData" border stripe style="width: 100%">
          <el-table-column
            :show-overflow-tooltip="$store.state.permission.tooltip"
            type="index"
            align="center"
            label="序号"
            width="60"
            min-width="150"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="$store.state.permission.tooltip"
            prop="username"
            align="center"
            label="账号"
            min-width="120"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="$store.state.permission.tooltip"
            prop="organName"
            align="center"
            label="所属机构"
            min-width="120"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="$store.state.permission.tooltip"
            prop="roleName"
            align="center"
            label="角色"
            min-width="120"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="$store.state.permission.tooltip"
            prop="lockFlag"
            align="center"
            label="允许登陆"
            min-width="300"
          >
            <template slot-scope="scope">
              <span>{{
                parseInt(scope.row.lockFlag, 10) ? "锁定" : "正常"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="$store.state.permission.tooltip"
            prop="updateTime"
            align="center"
            label="创建时间"
            min-width="120"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="$store.state.permission.tooltip"
            prop="email"
            align="center"
            label="邮箱"
            min-width="120"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="$store.state.permission.tooltip"
            prop="phone"
            align="center"
            label="手机号"
            min-width="120"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            width="200"
            align="center"
            label="操作"
            min-width="150"
          >
            <template slot-scope="scope">
              <el-button
                @click="formSeeClick(scope.row)"
                type="text"
                size="small"
                icon="el-icon-view"
                v-if="buttonList.indexOf('sys:user:get') != -1"
                >查看</el-button
              >
              <el-button
                @click="formModifyClick(scope.row)"
                type="text"
                size="small"
                icon="el-icon-edit"
                v-if="buttonList.indexOf('sys:user:edit') != -1"
                >编辑</el-button
              >
              <el-button
                @click="formDeleteClick(scope.row)"
                type="text"
                size="small"
                icon="el-icon-delete"
                 v-if="buttonList.indexOf('sys:user:del') != -1"
                >删 除</el-button
              >
              <el-button
                @click="changePassword(scope.row)"
                type="text"
                size="small"
                 v-if="buttonList.indexOf('sys:user:password') != -1"
                >修改密码</el-button
              >
              <el-button
                @click="loginClick(scope.row)"
                type="text"
                size="small"
                icon="el-icon-info"
                >登陆日志</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页功能 -->
        <el-pagination
          @size-change="
            pageRow.size = val;
            getUpmsLogloginPage();
          "
          @current-change="
            loginRow.current = val;
            getUpmsLogloginPage();
          "
          :current-page="pageRow.current"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
        >
        </el-pagination>

        <!-- 查看用户 ---start -->
        <el-dialog
          title="查看用户"
          class="see"
          :visible.sync="formSeeVisible"
          width="700px"
        >
          <el-form
            :label-position="labelPosition"
            :label-width="labelWidth"
            :inline="true"
            :model="tableDataRow"
            class="demo-form-inline"
          >
            <el-form-item label="id">
              <el-input v-model="tableDataRow.id" readonly></el-input>
            </el-form-item>
            <el-form-item label="账号">
              <el-input v-model="tableDataRow.username" readonly></el-input>
            </el-form-item>
            <el-form-item label="所属机构">
              <el-input v-model="tableDataRow.organName" readonly></el-input>
            </el-form-item>
            <el-form-item label="角色">
              <el-input v-model="tableDataRow.roleName" readonly></el-input>
            </el-form-item>
            <el-form-item label="允许登陆">
              <el-input
                :value="parseInt(tableDataRow.lockFlag, 10) ? '锁定' : '正常'"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-input v-model="tableDataRow.updateTime" readonly></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="tableDataRow.email" readonly></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="tableDataRow.phone" readonly></el-input>
            </el-form-item>
          </el-form>
        </el-dialog>

        <!-- 编辑用户---start -->
        <el-dialog
          title="编辑用户"
          :visible.sync="formModifyVisible"
          @closed="
            tableDataRow = {};
            $refs.tableDataRow.resetFields();
          "
          width="700px"
        >
          <el-form
            :label-position="labelPosition"
            :label-width="labelWidth"
            :model="tableDataRow"
            class="demo-form-inline lazy-form"
            ref="tableDataRow"
          >
            <el-form-item label="id">
              <el-input v-model="tableDataRow.id" disabled></el-input>
            </el-form-item>
            <el-form-item label="账号">
              <el-input v-model="tableDataRow.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="所属机构">
              <el-select
                v-model="tableDataRow.organName"
                value-key="id"
                placeholder="请选择"
              >
                <!-- el-option 属性没有的话会让tree没有数据，所以设置为零 -->
                <el-option value="" style="height: 0px"> </el-option>
                <el-tree
                  :data="labelData"
                  :props="labelDataProps"
                  @node-click="labelDataClick($event, 'row')"
                ></el-tree>
              </el-select>
            </el-form-item>
            <el-form-item
              label="角色"
              prop="roleIds"
              :rules="{
                type: 'array',
                required: true,
                message: '请至少选择一个角色',
                trigger: 'change',
              }"
            >
              <el-checkbox-group v-model="tableDataRow.roleIds">
                <el-checkbox
                  v-for="(item, index) in tableDataRow.roleList"
                  :key="index"
                  :label="item.id"
                  >{{ item.roleName }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
            <el-form-item
              label="允许登陆"
              prop="lockFlag"
              :rules="{
                required: true,
                message: '请选择类型',
                trigger: 'change',
              }"
            >
              <el-radio v-model="tableDataRow.lockFlag" label="0"
                >正常</el-radio
              >
              <el-radio v-model="tableDataRow.lockFlag" label="9"
                >锁定</el-radio
              >
            </el-form-item>
            <el-form-item label="创建时间">
              <el-input v-model="tableDataRow.updateTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="tableDataRow.email" disabled></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="tableDataRow.phone" disabled></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="formModifyVisible = false">取 消</el-button>
            <el-button type="primary" @click="formModifyDetermine"
              >确 定</el-button
            >
          </div>
        </el-dialog>

        <!-- 新增用户---start -->
        <el-dialog
          title="新增用户"
          :visible.sync="formAddVisible"
          @closed="
            formAddData = { organName: '' };
            $refs.formAddData.resetFields();
          "
          width="700px"
        >
          <el-form
            :label-position="labelPosition"
            :label-width="labelWidth"
            :inline="true"
            :model="formAddData"
            class="demo-form-inline lazy-form"
            ref="formAddData"
          >
            <el-form-item
              label="账号"
              prop="username"
              :rules="{ required: true, message: '账号不能为空' }"
            >
              <el-input v-model="formAddData.username" clearable></el-input>
            </el-form-item>
            <el-form-item
              label="密码"
              prop="password"
              :rules="{ required: true, message: '密码不能为空' }"
            >
              <el-input
                show-password
                v-model="formAddData.password"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              label="所属机构"
              prop="organName"
              :rules="{
                required: true,
                message: '请选择所属机构',
              }"
            >
              <el-select
                v-model="formAddData.organName"
                value-key="id"
                placeholder="请选择"
                clearable
              >
                <!-- el-option 属性没有的话会让tree没有数据，所以设置为零 -->
                <el-option value="" style="height: 0px"> </el-option>
                <el-tree
                  :data="labelData"
                  :props="labelDataProps"
                  @node-click="labelDataClick($event, 'add')"
                ></el-tree>
              </el-select>
            </el-form-item>
            <el-form-item
              label="角色"
              prop="roleIds"
              :rules="{
                type: 'array',
                required: true,
                message: '请至少选择一个角色',
                trigger: 'change',
              }"
            >
              <el-checkbox-group v-model="formAddData.roleIds">
                <el-checkbox
                  v-for="(item, index) in formAddData.roleList"
                  :key="index"
                  :label="item.id"
                  >{{ item.roleName }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
            <el-form-item
              label="允许登陆"
              prop="lockFlag"
              :rules="{
                required: true,
                message: '请选择类型',
                trigger: 'change',
              }"
            >
              <el-radio v-model="formAddData.lockFlag" label="0">正常</el-radio>
              <el-radio v-model="formAddData.lockFlag" label="9">锁定</el-radio>
            </el-form-item>
            <el-form-item
              label="邮箱"
              prop="email"
              :rules="[
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                {
                  type: 'email',
                  message: '请输入正确的邮箱地址',
                  trigger: ['blur', 'change'],
                },
              ]"
            >
              <el-input v-model="formAddData.email" clearable></el-input>
            </el-form-item>
            <el-form-item
              label="手机号"
              prop="phone"
              :rules="[
                { required: true, message: '请输入手机号' },
                { min: 11, max: 11, message: '长度在11个字符' },
              ]"
            >
              <el-input v-model="formAddData.phone" clearable></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="formAddVisible = false">取 消</el-button>
            <el-button type="primary" @click="formAddDetermine"
              >确 定</el-button
            >
          </div>
        </el-dialog>

        <!-- 修改密码 ---start -->
        <el-dialog
          title="修改密码"
          :visible.sync="passwordVisible"
          width="700px"
          @closed="tableDataRow = {}"
        >
          <el-form
            :label-position="labelPosition"
            :label-width="labelWidth"
            :model="tableDataRow"
            class="demo-form-inline lazy-form"
          >
            <el-form-item label="新密码">
              <el-input v-model="tableDataRow.newPassword"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="passwordVisible = false">取 消</el-button>
            <el-button type="primary" @click="changePasswordDetermine"
              >确 定</el-button
            >
          </div>
        </el-dialog>

        <!-- 登陆日志 ---start -->
        <el-dialog
          title="查看用户"
          class="see"
          :visible.sync="loginVisible"
          width="1200px"
        >
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
                <el-button
                  @click="loginSeeClick(scope.row)"
                  type="text"
                  size="small"
                  >查看</el-button
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
        </el-dialog>

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
      </el-main>
    </el-container>
  </div>
</template>

<script>
import apis from "@/apis/apis";
export default {
  data() {
    return {
      tableData: [], // 表格内容
      tableDataRow: {}, // 表格的某条内容
      labelData: [], // 机构内容
      filterText: "", // 模糊查询机构输入框
      labelDataProps: {
        label: "name",
        children: "children",
      },
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      formSeeVisible: false, // 查看角色弹出框的布尔值
      formModifyVisible: false, // 修改角色弹出框的布尔值
      // 新增用户内容
      formAddData: {
        id: "",
        username: "",
        rganName: "",
        updateTime: "",
        updateTime: "",
        email: "",
        phone: "",
        organId: "",
        organName: "",
        roleList: [],
        roleIds: [],
      },
      formAddVisible: false, // 新增角色弹出框的布尔值
      passwordVisible: false, // 修改密码弹出框的布尔值
      // 用户管理查询参数配置
      pageRow: {
        current: 1, // 查询当前页数
        size: 10, // 数据大小
        organId: "", // 机构ID
      },
      // 登陆日志查询参数配置
      loginRow: {
        current: 1, // 查询当前页数
        size: 10, // 数据大小
        createId: "", // 登陆者ID
      },
      loginData: [], // 日志内容
      loginVisible: false, // 日志内容弹出框的布尔值
      pageData: {
        total: "",
      }, // 登陆日志分页数据
      loginDataRow: {}, // 单行日志
      loginSeeVisible: false, // 单行日志弹出框的布尔值
    };
  },
  // 初始化表格参数
  mounted() {
    this.getUpmsOrganTree();
    this.formGetClick();
  },
  computed: {
    buttonList() {
      return this.$store._modules.root.context.state.button.buttonList;
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    // 获取所有角色数据
    async getUpmsRolePage() {
      const res = await apis.adminApi.getUpmsRolePage();
      console.log(res);
      return res.data.data.records;
    },
    // 获取所有用户数据
    async getUpmsUserPage() {
      const res = await apis.adminApi.getUpmsUserPage(this.pageRow);
      console.log(res);
      const tableData = res.data.data.records;
      console.log(tableData);
      return tableData;
    },
    // 初始化表格数据
    async formGetClick() {
      // 多个异步函数的时候，先初始化所有异步函数用以平行加速
      let RoleList = this.getUpmsRolePage();
      let tableData = this.getUpmsUserPage();
      RoleList = await RoleList;
      tableData = await tableData;
      console.log(RoleList);
      // 判断用户数据中的roleIds[0]如果等于角色的id就把角色名称(roleName)赋给它。
      tableData.forEach((item) => {
        lazy: for (let i = 0; i < RoleList.length; i++) {
          if (item.roleIds[0] == RoleList[i].id) {
            item.roleName = RoleList[i].roleName;
            break lazy; // 跳出循环
          }
        }
      });
      console.log(tableData);
      this.tableData = tableData;
    },
    // 刷新表格
    refresh() {
      this.tableData = [];
      this.formGetClick();
    },
    // 返回机构树形用户集合[列表请求]
    async getUpmsOrganTree() {
      const res = await apis.adminApi.getUpmsOrganTree();
      console.log(res);
      this.labelData = res.data.data;
    },
    // 模糊查询机构树形用户集合
    filterNode(value, data) {
      console.log(value, data);
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    // 点击机构组织回调
    labelDataClick(row, e) {
      console.log(row);
      if (e == "add") {
        this.formAddData.organId = row.id; //将结构的id给新增的organId
        this.formAddData.organName = row.name; //将结构的name给新增的organName
      } else if (e == "row") {
        this.tableDataRow.organId = row.id; //将结构的id给新增的organId
        this.tableDataRow.organName = row.name; //将结构的name给新增的organName
      } else {
        this.pageRow.organId = row.id; //将结构的id给查询的organId
        this.refresh();
      }
    },
    // 点击查看某条用户
    formSeeClick(row) {
      console.log(row);
      this.tableDataRow = row;
      this.formSeeVisible = true;
    },
    // 点击编辑某条用户
    async formModifyClick(row) {
      this.tableDataRow = JSON.parse(JSON.stringify(row));
      const roleList = await this.getUpmsRolePage();
      console.log(roleList);
      this.tableDataRow.roleList = roleList; // 绑定角色多选框数据
      this.formModifyVisible = true;
    },
    // 点击编辑某条用户后确定
    async formModifyDetermine() {
      try {
        await this.$refs.tableDataRow.validate();
      } catch (err) {
        return false;
      }
      const res = await apis.adminApi.putUpmsUser(this.tableDataRow);
      console.log(res);
      if (res.data.code == 0) {
        this.$message.success("编辑用户成功");
        this.formModifyVisible = false;
        this.refresh();
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 点击删除某条用户
    async formDeleteClick(row) {
      console.log(row);
      try {
        const res = await this.$confirm(
          "此操作将永久删除此租户, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        );
        this.tableDataRow = row;
        this.formDeleteDetermine();
      } catch (err) {
        console.log(err);
      }
    },
    // 确定删除某条用户
    async formDeleteDetermine(row) {
      const res = await apis.adminApi.deleteUpmsUserId(this.tableDataRow.id);
      console.log(res);
      if (res.data.code == 0) {
        this.refresh();
        this.$message.success(`删除用户${row.username}成功`);
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 点击新增用户按钮
    async formAddClick() {
      const roleList = await this.getUpmsRolePage();
      console.log(roleList);
      this.formAddData.roleList = roleList; // 绑定角色多选框数据
      this.formAddVisible = true;
    },
    // 点击新增用户按钮后确定
    async formAddDetermine() {
      try {
        await this.$refs.formAddData.validate();
      } catch (err) {
        return false;
      }
      this.formAddVisible = false;
      const res = await apis.adminApi.postUpmsUser(this.formAddData);
      console.log(res);
      if (res.data.code == 0) {
        this.$message.success("新增用户成功");
        this.refresh();
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 修改某个用户的密码
    changePassword(row) {
      this.tableDataRow = row;
      this.passwordVisible = true;
    },
    // 修改密码确定
    async changePasswordDetermine() {
      this.tableDataRow.password = this.tableDataRow.newPassword; // 将输入的新密码覆盖原密码
      const res = await apis.adminApi.putUpmsUserPassword(this.tableDataRow);
      console.log(res);
      if (res.data.code == 0) {
        this.$message.success("修改密码成功");
        this.refresh();
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 查询登陆日志
    async getUpmsLogloginPage() {
      const res = await apis.systemApi.getUpmsLogloginPage(this.loginRow);
      console.log(res);
      this.pageData = res.data.data; // 登陆日志分页数据
      this.loginData = this.pageData.records; // 登陆日志数据
      this.loginVisible = true;
    },
    // 登陆日志点击
    loginClick(row) {
      this.loginRow.createId = row.tenantId;
      this.getUpmsLogloginPage();
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

<style lang="scss">
</style>