<template>
  <div class="container">
    <!-- 操作区----start -->
    <el-row class="mgb15">
      <el-col :span="23">
        <el-button
          size="small"
          icon="el-icon-plus"
          type="primary"
          @click="formAddClick"
          v-if="buttonList.indexOf('sys:role:add') != -1"
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

    <!-- 表格部分 -->
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column
        :show-overflow-tooltip="$store.state.permission.tooltip"
        fixed
        type="index"
        align="center"
        label="序号"
        min-width="150"
        width="60"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="$store.state.permission.tooltip"
        prop="roleName"
        align="center"
        label="角色名称"
        min-width="120"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="$store.state.permission.tooltip"
        prop="roleCode"
        align="center"
        label="角色编码"
        min-width="120"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="$store.state.permission.tooltip"
        prop="roleDesc"
        align="center"
        label="角色描述"
        min-width="120"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="$store.state.permission.tooltip"
        prop="dsType"
        align="center"
        label="数据权限"
        min-width="300"
      >
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
        width="200"
        fixed="right"
        align="center"
        label="操作"
        min-width="100"
      >
        <template slot-scope="scope">
          <el-button
            @click="formSeeClick(scope.row)"
            type="text"
            size="small"
            icon="el-icon-view"
            v-if="buttonList.indexOf('sys:role:get') != -1"
            >查看</el-button
          >
          <el-button
            @click="formModifyClick(scope.row)"
            type="text"
            size="small"
            icon="el-icon-edit"
            v-if="buttonList.indexOf('sys:role:edit') != -1"
            >编辑</el-button
          >
          <el-button
            @click="formDeleteClick(scope.row)"
            type="text"
            size="small"
            icon="el-icon-delete"
            v-if="buttonList.indexOf('sys:role:del') != -1"
            >删 除</el-button
          >
          <el-button
            @click="formMenuClick(scope.row)"
            type="text"
            size="small"
            icon="el-icon-document"
             v-if="buttonList.indexOf('sys:role:perm') != -1"
            >权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 查看角色---start -->
    <el-dialog
      title="查看角色"
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
        <el-form-item label="角色名称">
          <el-input v-model="tableDataRow.roleName" readonly></el-input>
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="tableDataRow.roleCode" readonly></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="tableDataRow.roleDesc" readonly></el-input>
        </el-form-item>
        <el-form-item label="数据权限">
          <el-input v-model="tableDataRow.dsType" readonly></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="tableDataRow.updateTime" readonly></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑角色---start -->
    <el-dialog
      title="编辑角色"
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
        class="demo-form-inline lazy-form" 
        ref="tableDataRow"
      >
        <el-form-item
          label="角色名称"
          prop="roleName"
          :rules="{ required: true, message: '角色名称不能为空' }"
        >
          <el-input v-model="tableDataRow.roleName" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="角色编码"
          prop="roleCode"
          :rules="{ required: true, message: '角色编码不能为空' }"
        >
          <el-input v-model="tableDataRow.roleCode" disabled></el-input>
        </el-form-item>
        <el-form-item
          label="角色描述"
          prop="roleDesc"
          :rules="{ required: true, message: '角色描述不能为空' }"
        >
          <el-input v-model="tableDataRow.roleDesc" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="数据权限"
          prop="dsType"
          :rules="{ required: true, message: '数据权限不能为空' }"
        >
          <el-input v-model="tableDataRow.dsType" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formModifyVisible = false">取 消</el-button>
        <el-button type="primary" @click="formModifyDetermine">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增角色---start -->
    <el-dialog
      title="新增角色"
      :visible.sync="formAddVisible"
      @closed="
        formAddData = {};
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
          label="角色名称"
          prop="roleName"
          :rules="{ required: true, message: '角色名称不能为空' }"
        >
          <el-input v-model="formAddData.roleName" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="角色编码"
          prop="roleCode"
          :rules="{ required: true, message: '角色编码不能为空' }"
        >
          <el-input v-model="formAddData.roleCode" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="角色描述"
          prop="roleDesc"
          :rules="{ required: true, message: '角色描述不能为空' }"
        >
          <el-input v-model="formAddData.roleDesc" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="数据权限"
          prop="dsType"
          :rules="{ required: true, message: '数据权限不能为空' }"
        >
          <el-input v-model="formAddData.dsType" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="formAddDetermine">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配权限 ---start -->
    <el-dialog title="分配权限" :visible.sync="formMenuVisible" width="700px">
      <el-tree
        :data="formMenuData"
        default-expand-all
        show-checkbox
        node-key="id"
        :default-checked-keys="formMenuDatacheckbox"
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
  data() {
    return {
      tableData: [], // 表格内容
      tableDataRow: {}, // 表格的某条内容
      formSeeVisible: false, // 查看角色弹出框的布尔值
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      formModifyVisible: false, // 编辑角色弹出框的布尔值
      formAddData: {
        roleName: "",
        roleCode: "",
        roleDesc: "",
        dsType: "",
        createTime: "",
      }, // 新增内容
      formAddVisible: false, // 新增角色弹出框的布尔值
      formMenuVisible: false, // 权限弹出框的布尔值
      formMenuData: [], // 权限的树形数据
      formMenuDatacheckbox: [], // 权限的树形数据默认选中的节点数组
      // 权限配置选项
      defaultProps: {
        children: "children", //指定节点标签为节点对象的某个属性值
        label: "label", //指定子树为节点对象的某个属性值
      },
    };
  },
  // 初始化表格参数
  mounted() {
    this.formGetClick();
  },
  computed: {
    buttonList() {
      return this.$store._modules.root.context.state.button.buttonList;
    }
  },
  methods: {
    // 获取所有角色数据
    async formGetClick() {
      const res = await apis.adminApi.getUpmsRolePage();
      console.log(res);
      this.tableData = res.data.data.records;
      console.log(this.tableData);
    },
    // 刷新按钮
    refresh() {
      this.tableData = [];
      this.formGetClick();
    },
    // 点击查看某条角色
    formSeeClick(row) {
      console.log(row);
      this.tableDataRow = row;
      this.formSeeVisible = true;
    },
    // 点击新增角色按钮
    formAddClick() {
      this.formAddVisible = true;
    },
    // 点击新增角色按钮后确定
    async formAddDetermine() {
      try {
        await this.$refs.formAddData.validate();
      } catch (err) {
        return false;
      }
      this.formAddVisible = false;
      const res = await apis.adminApi.addUpmsRole(this.formAddData);
      console.log(res);
      if (res.data.code == 0) {
        this.$message.success("新增角色成功");
        this.refresh();
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 点击编辑某条角色
    formModifyClick(row) {
      this.tableDataRow = JSON.parse(JSON.stringify(row));
      this.formModifyVisible = true;
    },
    // 点击编辑某条角色后确定
    async formModifyDetermine() {
      try {
        await this.$refs.tableDataRow.validate();
      } catch (err) {
        return false;
      }
      this.formModifyVisible = false;
      const res = await apis.adminApi.putUpmsRole(this.tableDataRow);
      console.log(res);
      if (res.data.code == 0) {
        this.$message.success("编辑角色成功");
        this.refresh();
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 点击删除某条角色
    async formDeleteClick(row) {
      try {
        const res = await this.$confirm(
          "此操作将永久删除此角色, 是否继续?",
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
    // 确定删除某条角色
    async formDeleteDetermine() {
      const res = await apis.adminApi.deleteUpmsRole(this.tableDataRow.id);
      console.log(res);
      if (res.data.code == 0) {
        this.$message.success("编辑角色成功");
        this.refresh();
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 点击权限按钮
    async formMenuClick(row) {
      this.tableDataRow = row;
      const res = await apis.adminApi.getUpmsMenuTreeRoleId(row.id);
      console.log(res);
      this.formMenuDatacheckbox = res.data.data;
      const data = await apis.adminApi.getUpmsMenuTree(row.id);
      console.log(data);
      this.formMenuData = data.data.data;
      this.formMenuVisible = true;
    },
    // 更新某条角色的权限
    async formMenuDataPut() {
      const menuId = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys())
        .toString(); // 目前被选中的节点和办选中的节点的 key 所组成的数组
      const param = {
        menuId: menuId, // 目前被选中的节点的 key 所组成的数组
        roleId: this.tableDataRow.id, // 角色id
      };
      const res = await apis.adminApi.putUpmsRoleMenu(param);
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