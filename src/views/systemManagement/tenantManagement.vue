<template>
  <div class="container">
    <!-- 操作区----start -->
    <el-row class="mgb15">
      <!-- 新增按钮 -->
      <el-col :span="23">
        <el-button
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="formAddClick"
          >新增</el-button
        >
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

    <!-- 表格区域 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column
        :show-overflow-tooltip="$store.state.permission.tooltip"
        prop="name"
        label="租户名称"
        sortable
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="$store.state.permission.tooltip"
        label="租户类型"
        sortable
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{
            scope.row.type == 1
              ? "公司"
              : scope.row.type == 2
              ? "部门"
              : scope.row.type == 3
              ? "小组"
              : "其它"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="$store.state.permission.tooltip"
        prop="sort"
        width="100"
        label="排序"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="$store.state.permission.tooltip"
        prop="createTime"
        label="创建时间"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="$store.state.permission.tooltip"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            @click="formSeeClick(scope.row)"
            type="text"
            size="small"
            icon="el-icon-view"
            >查看</el-button
          >
          <el-button
            @click="formModifyClick(scope.row)"
            type="text"
            size="small"
            icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button
            @click="formDeleteClick(scope.row)"
            type="text"
            size="small"
            icon="el-icon-delete"
            >删 除</el-button
          >
          <el-button
            @click="formMenuClick(scope.row)"
            type="text"
            size="small"
            icon="el-icon-document"
            >管理员角色权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 查看租户 ---start -->
    <el-dialog
      title="查看"
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
        <el-form-item label="父类租户">
          <el-input :value="tableDataRow.parentName" readonly></el-input>
        </el-form-item>
        <el-form-item label="租户名称">
          <el-input :value="tableDataRow.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="租户类型">
          <el-input
            :value="parseInt(tableDataRow.type, 10) ? '公司' : '部门'"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="租户编码">
          <el-input :value="tableDataRow.code" readonly></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input :value="tableDataRow.sort" readonly></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input :value="tableDataRow.phone" readonly></el-input>
        </el-form-item>
        <el-form-item label="传真">
          <el-input :value="tableDataRow.fax" readonly></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input :value="tableDataRow.email" readonly></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input :value="tableDataRow.address" readonly></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input :value="tableDataRow.remarks" readonly></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input :value="tableDataRow.createTime" readonly></el-input>
        </el-form-item>
        <el-form-item label="修改时间">
          <el-input :value="tableDataRow.updateTime" readonly></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 新增租户---start -->
    <el-dialog
      title="新增租户"
      :visible.sync="fromAddVisible"
      @closed="
        formAddData = { parentName: '' };
        $refs.formAddData.resetFields();
      "
      width="700px"
    >
      <el-form
        :label-position="labelPosition"
        :label-width="labelWidth"
        :inline="true"
        :model="formAddData"
        class="demo-form-inline"
        ref="formAddData"
      >
        <el-form-item
          label="父类租户"
          prop="parentName"
          :rules="{
            required: true,
            message: '请选择父类租户',
          }"
        >
          <!-- 选择框自定义模板 -->
          <el-select
            v-model="formAddData.parentName"
            value-key="parentId"
            placeholder="请选择"
          >
            <!-- el-option 属性没有的话会让tree没有数据，所以设置为零 -->
            <el-option value="" style="height: 0px"> </el-option>
            <el-tree
              :data="tableData"
              :props="upMenuProps"
              @node-click="upMenuDataTreeClick($event, 'add')"
            ></el-tree>
          </el-select>
        </el-form-item>
        <el-form-item
          label="租户名称"
          prop="name"
          :rules="{ required: true, message: '租户名称不能为空' }"
        >
          <el-input v-model="formAddData.name" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="租户类型"
          prop="type"
          :rules="{
            required: true,
            message: '请选择租户类型',
            trigger: 'change',
          }"
        >
          <el-select v-model="formAddData.type" placeholder="请选择">
            <el-option key="1" label="公司" value="1"> </el-option>
            <el-option key="2" label="部门" value="2"> </el-option>
            <el-option key="3" label="小组" value="3"> </el-option>
            <el-option key="4" label="其它" value="4"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="租户编码"
          prop="code"
          :rules="{ required: true, message: '租户编码不能为空' }"
        >
          <el-input v-model="formAddData.code" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="排序"
          prop="sort"
          :rules="{ required: true, message: '排序不能为空' }"
        >
          <el-input
            v-model="formAddData.sort"
            type="number"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="电话"
          prop="phone"
          :rules="[{ min: 11, max: 11, message: '长度在11个字符' }]"
        >
          <el-input v-model="formAddData.phone" clearable></el-input>
        </el-form-item>
        <el-form-item label="传真">
          <el-input v-model="formAddData.fax" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
          :rules="[
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input v-model="formAddData.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="formAddData.address" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formAddData.remarks" clearable></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="formAddData.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formAddData.password" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="fromAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="formAddDetermine">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑租户---start -->
    <el-dialog
      title="编辑租户"
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
        :inline="true"
        :model="tableDataRow"
        class="demo-form-inline"
        ref="tableDataRow"
      >
        <el-form-item
          label="父类租户"
          prop="parentId"
          :rules="{
            required: true,
            message: '请选择父类租户',
          }"
        >
          <!-- 选择框自定义模板 -->
          <el-select
            v-model="tableDataRow.parentName"
            value-key="parentId"
            placeholder="请选择"
          >
            <!-- el-option 属性没有的话会让tree没有数据，所以设置为零 -->
            <el-option value="" style="height: 0px"> </el-option>
            <el-tree
              :data="tableData"
              :props="upMenuProps"
              @node-click="upMenuDataTreeClick($event, 'modify')"
            ></el-tree>
          </el-select>
        </el-form-item>
        <el-form-item
          label="租户名称"
          prop="name"
          :rules="{ required: true, message: '机构名称不能为空' }"
        >
          <el-input v-model="tableDataRow.name" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="租户类型"
          prop="type"
          :rules="{
            required: true,
            message: '请选择机构类型',
            trigger: 'change',
          }"
        >
          <el-select v-model="tableDataRow.type" placeholder="请选择">
            <el-option key="1" label="公司" value="1"> </el-option>
            <el-option key="2" label="部门" value="2"> </el-option>
            <el-option key="3" label="小组" value="3"> </el-option>
            <el-option key="4" label="其它" value="4"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="租户编码">
          <el-input v-model="tableDataRow.code" disabled></el-input>
        </el-form-item>
        <el-form-item
          label="排序"
          prop="sort"
          :rules="{ required: true, message: '排序不能为空' }"
        >
          <el-input
            v-model="tableDataRow.sort"
            type="number"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="电话"
          prop="phone"
          :rules="[{ min: 11, max: 11, message: '长度在11个字符' }]"
        >
          <el-input v-model="tableDataRow.phone" clearable></el-input>
        </el-form-item>
        <el-form-item label="传真">
          <el-input v-model="tableDataRow.fax" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
          :rules="[
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input v-model="tableDataRow.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="tableDataRow.address" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="tableDataRow.remarks" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            formModifyVisible = false;
            formGetClick();
          "
          >取 消</el-button
        >
        <el-button type="primary" @click="formModifyDetermine">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配权限 ---start -->
    <el-dialog title="分配权限" :visible.sync="formMenuVisible" width="700px">
      <el-tree
        :data="formMenuData"
        default-expand-all
        show-checkbox
        node-key="id"
        :default-checked-keys="formMenuDatacheckbox.listMenuVO"
        :props="defaultProps"
        ref="tree"
      >
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formMenuVisible = false">取 消</el-button>
        <el-button type="primary" @click="formMenuDataPut">更 新</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import apis from "@/apis/apis";
export default {
  name: "tenantManagement",
  data() {
    return {
      tableData: [], // 表格主体数据
      tableDataRow: {}, // 当前选中的单行数据
      formSeeVisible: false, // 查看租户弹出框的布尔值
      formModifyVisible: false, // 编辑角色弹出框的布尔值
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      // 新增数据
      formAddData: {
        parentId: "",
        name: "",
        type: "",
        sort: "",
        phone: "",
        code: "",
        fax: "",
        email: "",
        address: "",
        remarks: "",
        parentName: "",
        password: "",
        username: "",
      },
      // 父级租户的组织树配置
      upMenuProps: {
        label: "name", // 指定节点标签为节点对象的某个属性值
        children: "children", // 指定子树为节点对象的某个属性值
      },
      fromAddVisible: false, // 新增租户弹出框的布尔值
      formMenuVisible: false, // 权限弹出框的布尔值
      formMenuData: [], // 权限的树形数据
      formMenuDatacheckbox: {}, // 权限的树形数据默认选中的节点数组和角色信息
      // 权限配置选项
      defaultProps: {
        children: "children", //指定节点标签为节点对象的某个属性值
        label: "label", //指定子树为节点对象的某个属性值
      },
    };
  },
  // 初始化数据
  mounted() {
    this.formGetClick();
  },
  methods: {
    // 获取所有表格数据
    async formGetClick() {
      const res = await apis.adminApi.getUpmsTenantTree();
      console.log(res);
      this.tableData = res.data.data;
    },
    // 刷新表格数据
    refresh() {
      this.tableData = [];
      this.formGetClick();
    },
    // 点击查看某条租户
    formSeeClick(row) {
      console.log(row);
      this.tableDataRow = row;
      this.parentIdToName();
      this.formSeeVisible = true;
    },
    // 根据当前租户的父级id去查询对应的name
    async parentIdToName() {
      const res = await apis.adminApi.getUpmsTenantId(
        this.tableDataRow.parentId
      );
      console.log(res);
      // 如果查不出name值的话使用顶级
      try {
        this.$set(this.tableDataRow, "parentName", res.data.data.name);
      } catch (e) {
        this.$set(this.tableDataRow, "parentName", "顶级");
      }
    },
    // 点击租户新增按钮
    formAddClick() {
      this.fromAddVisible = true;
    },
    // 确认增加租户
    async formAddDetermine() {
      try {
        await this.$refs.formAddData.validate();
      } catch (err) {
        return false;
      }
      const res = await apis.adminApi.postUpmsTenant(this.formAddData);
      this.fromAddVisible = false;
      if (res.data.code == 0) {
        this.$message.success("增加租户成功");
        this.refresh();
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 新增租户弹框的上级租户被点击时的回调 || 编辑租户弹框的上级租户被点击时的回调
    upMenuDataTreeClick(row, e) {
      console.log(row, e);
      if (e == "add") {
        this.formAddData.parentName = row.name; // 把当前租户的name给下级租户的父parentName
        this.formAddData.parentId = row.id; // 把当前租户的id给下级租户的父id
      } else {
        this.tableDataRow.parentName = row.name; // 把当前租户的name给下级租户的父parentName
        this.tableDataRow.parentId = row.id; // 把当前租户的id给下级租户的父id
      }
    },
    // 点击编辑某条租户
    formModifyClick(row) {
      console.log(row);
      this.tableDataRow = JSON.parse(JSON.stringify(row));
      this.parentIdToName();
      this.formModifyVisible = true;
    },
    // 点击编辑某条租户后确定
    async formModifyDetermine() {
      try {
        await this.$refs.tableDataRow.validate();
      } catch (err) {
        return false;
      }
      this.formModifyVisible = false;
      const res = await apis.adminApi.putUpmsTenant(this.tableDataRow);
      console.log(res);
      if (res.data.code == 0) {
        this.$message.success("编辑租户成功");
        this.refresh();
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 点击删除某条租户
    async formDeleteClick(row) {
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
    // 确定删除某条租户
    async formDeleteDetermine() {
      const res = await apis.adminApi.deleteUpmsTenantId(this.tableDataRow.id);
      console.log(res);
      if (res.data.code == 0) {
        this.$message.success("删除租户成功");
        this.refresh();
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 点击管理员角色权限按钮
    async formMenuClick(row) {
      this.tableDataRow = row;
      const res = await apis.adminApi.getUpmsMenuTreeTenantTenantId(row.id);
      console.log(res);
      this.formMenuDatacheckbox = res.data.data;
      const data = await apis.adminApi.getUpmsMenuTree(row.id);
      console.log(data);
      this.formMenuData = data.data.data;
      this.formMenuVisible = true;
    },
    // 更新管理员角色的权限
    async formMenuDataPut() {
      const menuId = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys())
        .toString(); // 目前被选中的节点和办选中的节点的 key 所组成的数组
      const param = {
        menuId: menuId, // 目前被选中的节点的 key 所组成的数组
        roleId: this.formMenuDatacheckbox.sysRole.id, // 管理员角色id
        tenantId: this.tableDataRow.id,
      };
      const res = await apis.adminApi.putUpmsRoleMenuTenant(param);
      console.log(res);
      if (res.data.code == 0) {
        this.formMenuVisible = false;
        this.$message.success("分配权限更新成功");
      } else {
        this.$message.error(res.data.msg);
      }
    },
  },
};
</script>

<style lang="scss">
</style>