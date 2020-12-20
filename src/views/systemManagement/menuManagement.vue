<template>
  <div class="container">
    <!-- 操作区----start -->
    <el-row class="mgb15">
      <!-- 新增按钮 -->
      <el-col :span="23">
        <el-button
          size="small"
          icon="el-icon-plus"
          type="primary"
          @click="formAddDataClick"
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
        label="名称"
        sortable
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="$store.state.permission.tooltip"
        label="类型"
        sortable
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{
              parseInt(scope.row.type, 10) ? "按钮" : "菜单"
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="$store.state.permission.tooltip"
        prop="permission"
        label="权限标识"
        sortable
        width="180"
        align="center"
      >
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
        prop="icon"
        label="图标"
        align="center"
      >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <i :class="'el-icon-' + scope.row.icon" style="font-size: 2em"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="$store.state.permission.tooltip"
        prop="path"
        label="菜单路径"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="$store.state.permission.tooltip"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button @click="formSeeClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button
            @click="formModifyClick(scope.row)"
            type="text"
            size="small"
            >编辑</el-button
          >
          <el-button
            @click="formDeleteClick(scope.row)"
            type="text"
            size="small"
            >删 除</el-button
          >
          <el-button
            @click="formAddDataClick(scope.row)"
            type="text"
            size="small"
            >添加下级菜单</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增菜单弹框---start -->;
    <el-dialog
      title="新增菜单"
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
          label="上级菜单"
          prop="parentId"
          :rules="{
            required: true,
            message: '请选择上级菜单',
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
              :data="tableDatar"
              :props="upMenuProps"
              @node-click="upMenuDataTreeClick($event, 'add')"
            ></el-tree>
          </el-select>
        </el-form-item>
        <el-form-item
          label="名称"
          prop="name"
          :rules="{ required: true, message: '名称不能为空' }"
        >
          <el-input v-model="formAddData.name" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="类型"
          prop="type"
          :rules="{
            required: true,
            message: '请选择类型',
            trigger: 'change',
          }"
        >
          <el-select
            v-model="formAddData.type"
            value-key="formAddData.type"
            placeholder="请选择"
            clearable
          >
            <el-option :key="0" label="菜单" :value="0"> </el-option>
            <el-option :key="1" label="按钮" :value="1"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input v-model="formAddData.permission" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="排序"
          prop="sort"
          :rules="{ required: true, message: '排序不能为空' }"
        >
          <el-input v-model="formAddData.sort" type="Number"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <div
            @click="iconShow = true"
            style="display: flex; align-items: center"
          >
            <el-input
              :value="formAddData.icon ? `el-icon-${formAddData.icon}` : ''"
              clearable
            ></el-input>
            <i
              :class="`el-icon-${formAddData.icon}`"
              style="font-size: 2em"
            ></i>
          </div>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="formAddData.path" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="fromAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="formAddDataDetermine"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 查看菜单 ---start -->
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
        <el-form-item label="上级菜单">
          <el-input :value="tableDataRow.parentName" readonly></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input :value="tableDataRow.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input
            :value="tableDataRow.type ? '菜单' : '按钮'"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input :value="tableDataRow.permission" readonly></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input :value="tableDataRow.sort" readonly></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <div style="display: flex; align-items: center">
            <el-input
              :value="`el-icon-${tableDataRow.icon}`"
              readonly
            ></el-input>
            <i
              :class="`el-icon-${tableDataRow.icon}`"
              style="font-size: 2em"
            ></i>
          </div>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input :value="tableDataRow.path" readonly></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input :value="tableDataRow.createTime" readonly></el-input>
        </el-form-item>
        <el-form-item label="修改时间">
          <el-input :value="tableDataRow.updateTime" readonly></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑菜单---start -->
    <el-dialog
      title="编辑菜单"
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
          label="上级菜单"
          prop="parentId"
          :rules="{
            required: true,
            message: '请选择上级菜单',
            trigger: 'change',
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
              :data="tableDatar"
              :props="upMenuProps"
              @node-click="upMenuDataTreeClick($event, 'modify')"
            ></el-tree>
          </el-select>
        </el-form-item>
        <el-form-item
          label="名称"
          prop="name"
          :rules="{ required: true, message: '名称不能为空' }"
        >
          <el-input v-model="tableDataRow.name" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="类型"
          prop="type"
          :rules="{
            required: true,
            message: '请选择类型',
            trigger: 'change',
          }"
        >
          <el-select
            v-model="tableDataRow.type"
            clearable
            prefix="124"
            value-key="tableDataRow.type"
            placeholder="请选择"
          >
            <el-option :key="0" label="菜单" :value="0"> </el-option>
            <el-option :key="1" label="按钮" :value="1"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input v-model="tableDataRow.permission" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="排序"
          prop="sort"
          :rules="{ required: true, message: '排序不能为空' }"
        >
          <el-input v-model="tableDataRow.sort" type="Number"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <div
            @click="iconShow = true"
            style="display: flex; align-items: center"
          >
            <el-input
              :value="`el-icon-${tableDataRow.icon}`"
              clearable
            ></el-input>
            <i
              :class="`el-icon-${tableDataRow.icon}`"
              style="font-size: 2em"
            ></i>
          </div>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="tableDataRow.path" clearable></el-input>
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

    <!-- 图标模块 -->
    <el-dialog title="选择图标" :visible.sync="iconShow" width="1400px">
      <lazy-icon @iconEmit="iconEmit"></lazy-icon>
    </el-dialog>
  </div>
</template>

<script>
import apis from "@/apis/apis";
import lazyIcon from "@/Lazy/Lazy-icon/lazyIcon.vue";
export default {
  name: "tablepage",
  components: {
    lazyIcon,
  },
  data() {
    return {
      tableData: [], //表格树形数据
      tableDatar: [], // 选择的上级菜单展示数据
      tableDataRow: {}, // 表格的某条内容
      formSeeVisible: false, // 查看角色弹出框的布尔值
      formModifyVisible: false, // 编辑角色弹出框的布尔值
      fromAddVisible: false, // 新增菜单弹框的布尔值
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      // 新增表单对象
      formAddData: {
        name: "",
        updateTime: "",
        createTime: "",
        icon: "",
        keepAlive: "",
        parentId: "",
        permission: "",
        sort: "",
        type: "",
        label: "",
        parentName: "",
      },
      // 上级菜单的组织树配置
      upMenuProps: {
        label: "label", // 指定节点标签为节点对象的某个属性值
        children: "children", // 指定子树为节点对象的某个属性值
      },
      iconShow: false, // 图标弹框的布尔值
    };
  },
  mounted() {
    this.formGetClick();
  },
  methods: {
    // 获取所有表格数据
    async formGetClick() {
      const res = await apis.adminApi.getUpmsMenuAllTree();
      console.log(res);
      if (res.data.code == 0) {
        this.tableData = res.data.data;
        this.tableDatar = [
          {
            label: "顶级",
            id: 0,
            children: this.tableData,
          },
        ];
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 刷新按钮
    refresh() {
      this.tableData = [];
      this.formGetClick();
    },
    // 点击查看某条菜单
    formSeeClick(row) {
      console.log(row);
      this.tableDataRow = row;
      this.parentIdToName();
      this.formSeeVisible = true;
    },
    // 点击编辑某条菜单
    formModifyClick(row) {
      console.log(row);
      this.tableDataRow = JSON.parse(JSON.stringify(row));
      this.tableDataRow.type = row.type ? parseInt(row.type, 10) : null; // 编辑菜单的时候，type改为数字，然后就可以让select默认选中当前这个。
      this.parentIdToName();
      this.formModifyVisible = true;
    },
    // 点击编辑某条菜单后确定
    async formModifyDetermine() {
      try {
        await this.$refs.tableDataRow.validate();
      } catch (err) {
        return false;
      }
      this.formModifyVisible = false;
      const res = await apis.adminApi.putUpmsMenu(this.tableDataRow);
      console.log(res);
      if (res.data.code == 0) {
        this.$message.success("编辑菜单成功");
        this.formGetClick();
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 点击删除某条菜单
    async formDeleteClick(row) {
      try {
        const res = await this.$confirm(
          "此操作将永久删除此菜单, 是否继续?",
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
    // 确定删除某条菜单
    async formDeleteDetermine() {
      const res = await apis.adminApi.deleteUpmsMenu(this.tableDataRow.id);
      console.log(res);
      if (res.data.code == 0) {
        this.$message.success("删除菜单成功");
        this.formGetClick();
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 点击添加下级菜单 || 点击菜单新增按钮
    formAddDataClick(row) {
      console.log(row);
      this.formAddData.parentName = row.label ? row.label : ""; // 把当前菜单的lable给下级菜单的parentName
      this.formAddData.parentId = row.id ? row.id : ""; // 把当前菜单的id给下级菜单的父id
      this.fromAddVisible = true;
    },
    // 确认增加菜单
    async formAddDataDetermine() {
      try {
        await this.$refs.formAddData.validate();
      } catch (err) {
        return false;
      }
      const res = await apis.adminApi.postUpmsMenu(this.formAddData);
      this.fromAddVisible = false;
      if (res.data.code == 0) {
        this.$message.success("增加菜单成功");
        this.formGetClick();
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 根据当前菜单的父级id去查询对应的name
    async parentIdToName() {
      const res = await apis.adminApi.getUpmsMenuId(this.tableDataRow.parentId);
      console.log(res);
      // 如果查不出name值的话使用顶级
      try {
        this.$set(this.tableDataRow, "parentName", res.data.data.label);
      } catch (e) {
        this.$set(this.tableDataRow, "parentName", "顶级");
      }
    },
    // 新增菜单弹框的上级菜单被点击时的回调 || 编辑菜单弹框的上级菜单被点击时的回调
    upMenuDataTreeClick(row, e) {
      console.log(row, e);
      if (e == "add") {
        this.$set(this.formAddData, "parentName", row.label);
        //this.formAddData.parentName = row.label; // 把当前菜单的name给下级菜单的父parentName
        this.formAddData.parentId = row.id; // 把当前菜单的id给下级菜单的父id
      } else {
        this.tableDataRow.parentName = row.label; // 把当前菜单的name给下级菜单的父parentName
        this.tableDataRow.parentId = row.id; // 把当前菜单的id给下级菜单的父id
      }
    },
    // 修改类型
    modifyType() {},
    // 点击图标回调
    iconEmit(e) {
      this.tableDataRow.icon = e;
      this.formAddData.icon = e;
      this.iconShow = false;
    },
  },
};
</script>

<style lang="scss">
</style>