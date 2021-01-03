<template>
  <el-row type="flex" class="row-bg">
    <el-col :span="Vshow.span">
      <div class="container">
        <!-- 操作区----start -->
        <!-- 搜索框----start -->
        <el-collapse-transition>
          <div v-show="inputShow">
            <el-row style="margin-bottom: 20px">
              <el-col :span="6">
                <span>类型：</span>
                <el-select
                  v-model="loginRow.type"
                  size="small"
                  placeholder="请选择"
                >
                  <el-option label="正常" :value="0"> </el-option>
                  <el-option label="异常" :value="1"> </el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <span>请求方式：</span>
                <el-select
                  v-model="loginRow.method"
                  size="small"
                  placeholder="请选择"
                >
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
          </div>
        </el-collapse-transition>

        <el-row class="mgb15">
          <el-col :span="22">
            <el-button
              size="small"
              type="primary"
              @click="formAddClick"
              icon="el-icon-plus"
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

          <!-- 显示搜索按钮 -->
          <el-col :span="1">
            <el-tooltip
              class="item"
              effect="dark"
              content="搜索"
              placement="top"
            >
              <el-button
                icon="el-icon-search"
                circle
                size="small"
                @click="inputShow = !inputShow"
              ></el-button>
            </el-tooltip>
          </el-col>
        </el-row>

        <!-- 字典 ---start -->
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
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="$store.state.permission.tooltip"
            prop="description"
            align="center"
            label="描述"
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
                icon="el-icon-view"
                @click="loginSeeClick(scope.row)"
                type="text"
                size="small"
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
                @click="loginDeleteClick(scope.row)"
                type="text"
                size="small"
                icon="el-icon-delete"
                >删除</el-button
              >
              <el-button
                @click="KVListClick(scope.row, 'open')"
                type="text"
                size="small"
                icon="el-icon-delete"
                >键值列表</el-button
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

        <!-- 新增弹框---start -->
        <el-dialog
          title="新增字典"
          :visible.sync="fromAddVisible"
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
            class="demo-form-inline"
            ref="formAddData"
          >
            <el-form-item
              label="类型"
              prop="type"
              :rules="{ required: true, message: '类型不能为空' }"
            >
              <el-input v-model="formAddData.type" clearable></el-input>
            </el-form-item>
            <el-form-item
              label="描述"
              prop="description"
              :rules="{ required: true, message: '类型不能为空' }"
            >
              <el-input v-model="formAddData.description" clearable></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="fromAddVisible = false">取 消</el-button>
            <el-button type="primary" @click="formAddDetermine"
              >确 定</el-button
            >
          </div>
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
            :model="tableDataRow"
            class="demo-form-inline"
          >
            <el-form-item label="类型">
              <el-input v-model="tableDataRow.type" readonly></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input v-model="tableDataRow.description" readonly></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-input v-model="tableDataRow.createTime" readonly></el-input>
            </el-form-item>
          </el-form>
        </el-dialog>

        <!-- 编辑---start -->
        <el-dialog
          title="编辑"
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
              label="类型"
              prop="type"
              :rules="{ required: true, message: '类型不能为空' }"
            >
              <el-input v-model="tableDataRow.type" clearable></el-input>
            </el-form-item>
            <el-form-item
              label="描述"
              prop="description"
              :rules="{ required: true, message: '描述不能为空' }"
            >
              <el-input v-model="tableDataRow.description" clearable></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-input v-model="tableDataRow.createTime" disabled></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="formModifyVisible = false">取 消</el-button>
            <el-button type="primary" @click="formModifyDetermine"
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </div>
    </el-col>

    <el-col :span="12" v-show="Vshow.show">
      <el-card class="container">
        <div slot="header" class="clearfix">
          <span>{{ KV.title }}</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="KVListClick"
            >关闭</el-button
          >
        </div>
        <!-- 新增按钮 -->
        <el-col :span="24">
          <el-button
            size="small"
            icon="el-icon-plus"
            type="primary"
            @click="fromAddVisible2 = true"
            >新增</el-button
          >
        </el-col>
        <!--键值列表部分 -->
        <el-table :data="KV.data.records" border style="width: 100%">
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
            prop="value"
            align="center"
            label="数据值"
            min-width="120"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="$store.state.permission.tooltip"
            prop="label"
            align="center"
            label="标签名"
            min-width="120"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="$store.state.permission.tooltip"
            prop="description"
            align="center"
            label="描述"
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
                @click="formModifyClick2(scope.row)"
                type="text"
                size="small"
                icon="el-icon-edit"
                >编辑</el-button
              >
              <el-button
                @click="loginDeleteClick2(scope.row)"
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
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :current-page="KVROW.current"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="KV.data.total"
        >
        </el-pagination>
      </el-card>
    </el-col>
    <!-- 编辑---start -->
    <el-dialog
      title="编辑"
      :visible.sync="formModifyVisible2"
      @closed="
        KV.tableDataRow = {};
        $refs.tableDataRow2.resetFields();
      "
      width="700px"
    >
      <el-form
        :label-position="labelPosition"
        :label-width="labelWidth"
        :inline="true"
        :model="KV.tableDataRow"
        class="demo-form-inline"
        ref="tableDataRow2"
      >
        <el-form-item
          label="数据值"
          prop="value"
          :rules="{ required: true, message: '数据值不能为空' }"
        >
          <el-input v-model="KV.tableDataRow.value" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="标签名"
          prop="label"
          :rules="{ required: true, message: '标签名不能为空' }"
        >
          <el-input v-model="KV.tableDataRow.label" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="排序"
          prop="sort"
          :rules="{ required: true, message: '排序不能为空' }"
        >
          <el-input
            v-model="KV.tableDataRow.sort"
            type="number"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="描述"
          prop="description"
          :rules="{ required: true, message: '描述不能为空' }"
        >
          <el-input v-model="KV.tableDataRow.description" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formModifyVisible = false">取 消</el-button>
        <el-button type="primary" @click="formModifyDetermine2"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 新增---start -->
    <el-dialog
      title="新增"
      :visible.sync="fromAddVisible2"
      @closed="
        KV.formAddData = {};
        $refs.formAddData2.resetFields();
      "
      width="700px"
    >
      <el-form
        :label-position="labelPosition"
        :label-width="labelWidth"
        :inline="true"
        :model="KV.formAddData"
        class="demo-form-inline"
        ref="formAddData2"
      >
        <el-form-item
          label="数据值"
          prop="value"
          :rules="{ required: true, message: '数据值不能为空' }"
        >
          <el-input v-model="KV.formAddData.value" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="标签名"
          prop="label"
          :rules="{ required: true, message: '标签名不能为空' }"
        >
          <el-input v-model="KV.formAddData.label" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="排序"
          prop="sort"
          :rules="{ required: true, message: '排序不能为空' }"
        >
          <el-input
            v-model="KV.formAddData.sort"
            type="number"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="描述"
          prop="description"
          :rules="{ required: true, message: '描述不能为空' }"
        >
          <el-input v-model="KV.formAddData.description" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formModifyVisible = false">取 消</el-button>
        <el-button type="primary" @click="formAddDetermine2">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import apis from "@/apis/apis";
export default {
  data() {
    return {
      pageData: [], // 字典分页数据
      loginData: [], // 字典数据
      loginSeeVisible: false, // 查看日志弹出框的布尔值
      tableDataRow: {}, // 单行字典数据
      fromAddVisible: false, // 新增弹框的布尔值
      // 新增数据
      formAddData: {
        description: "", // 描述
        type: "", // 类型
      },
      formModifyVisible: false, // 编辑字典的布尔值
      // 字典查询参数配置tableDataRow
      loginRow: {
        current: 1, // 查询当前页数
        size: 10, // 数据大小
        type: "", // 搜索框类型
        method: "", // 搜索框方法
      },
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      inputShow: true, // 显示搜索栏的布尔值
      // 键值列表点击事件
      Vshow: {
        show: false,
        span: 24,
      },
      // 键值列表的数据
      KV: {
        title: "",
        tableDataRow: {},
        formAddData: {
          value: "",
          label: "",
          sort: "",
          description: "",
          dictId: "",
          type: "",
        },
        data: {
          total: 0,
          records: [],
        },
      },
      KVROW: {
        current: 1, // 查询当前页数
        size: 10, // 数据大小
        dictId: "", // 字典ID
        type: "", // 搜索框类型
        method: "", // 搜索框方法
      },
      formModifyVisible2: false, // 键值对编辑弹出框的布尔值
      fromAddVisible2: false, // 键值对新增弹出框的布尔值
    };
  },
  // 初始化表格参数
  mounted() {
    this.getUpmsLogDictPage();
  },
  methods: {
    // 刷新按钮
    refresh() {
      this.loginData = [];
      this.getUpmsLogDictPage();
    },
    // 查询字典
    async getUpmsLogDictPage() {
      const res = await apis.systemApi.getUpmsLogDictPage(this.loginRow);
      console.log(res);
      this.pageData = res.data.data; // 字典分页数据
      this.loginData = this.pageData.records; // 字典数据
    },
    // 日志分页 size 变更
    handleSizeChange(val) {
      console.log(val);
      this.loginRow.size = val;
      this.getUpmsLogDictPage();
    },
    // 日志分页 curren 变更
    handleCurrentChange(val) {
      console.log(val);
      this.loginRow.current = val;
      this.getUpmsLogDictPage();
    },
    // 字典查看
    loginSeeClick(row) {
      console.log(row);
      this.tableDataRow = row;
      this.loginSeeVisible = true;
    },
    // 点击字典新增按钮
    formAddClick() {
      this.fromAddVisible = true;
    },
    // 确认字典新增
    async formAddDetermine() {
      try {
        await this.$refs.formAddData.validate();
      } catch (err) {
        return false;
      }
      const res = await apis.systemApi.postUpmsDict(this.formAddData);
      this.fromAddVisible = false;
      if (res.data.code == 0) {
        this.$message.success("增加字典成功");
        this.refresh();
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 点击编辑某条字典
    formModifyClick(row) {
      console.log(row);
      this.tableDataRow = JSON.parse(JSON.stringify(row));
      this.formModifyVisible = true;
    },
    // 点击编辑某条字典后确定
    async formModifyDetermine() {
      try {
        await this.$refs.tableDataRow.validate();
      } catch (err) {
        return false;
      }
      this.formModifyVisible = false;
      const res = await apis.systemApi.putUpmsDict(this.tableDataRow);
      console.log(res);
      if (res.data.code == 0) {
        this.$message.success("编辑成功");
        this.refresh();
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 字典删除
    async loginDeleteClick(row) {
      try {
        const qqq = await this.$confirm(
          "此操作将永久删除此租户, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        );
        const res = await apis.systemApi.deleteUpmsDict(row.id);
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
    // 键值列表点击
    KVListClick(row, e) {
      console.log(row);
      if (e == "open") {
        this.KV.title = `键值列表，所属类型：${row.type}`;
        this.loginRow.dictId = row.id;
        this.KV.formAddData.dictId = row.id;
        this.KV.formAddData.type = row.type;
        this.getUpmsLogDictItemPage();
        this.Vshow.show = true;
      } else {
        this.Vshow.show = false;
      }
      this.Vshow.span = this.Vshow.show ? 12 : 24;
    },
    // 键值对获取分页数据
    async getUpmsLogDictItemPage() {
      const res = await apis.systemApi.getUpmsLogDictItemPage(this.KVROW);
      console.log(res);
      this.KV.data = res.data.data;
    },
    // 键值对分页 size 变更
    handleSizeChange2(val) {
      console.log(val);
      this.KVROW.size = val;
      this.getUpmsLogDictItemPage();
    },
    // 键值对分页 curren 变更
    handleCurrentChange2(val) {
      console.log(val);
      this.KVROW.current = val;
      this.getUpmsLogDictItemPage();
    },
    // 点击编辑某条键值对
    formModifyClick2(row) {
      console.log(row);
      this.KV.tableDataRow = JSON.parse(JSON.stringify(row));
      this.formModifyVisible2 = true;
    },
    // 点击编辑某条键值对后确定
    async formModifyDetermine2() {
      try {
        await this.$refs.tableDataRow2.validate();
      } catch (err) {
        return false;
      }
      this.formModifyVisible2 = false;
      const res = await apis.systemApi.putUpmsDictItem(this.KV.tableDataRow);
      console.log(res);
      if (res.data.code == 0) {
        this.$message.success("编辑成功");
        this.getUpmsLogDictItemPage();
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 确认键值对新增
    async formAddDetermine2() {
      try {
        await this.$refs.formAddData2.validate();
      } catch (err) {
        return false;
      }
      const res = await apis.systemApi.postUpmsDictItem(this.KV.formAddData);
      this.fromAddVisible2 = false;
      if (res.data.code == 0) {
        this.$message.success("增加键值对成功");
        this.getUpmsLogDictItemPage();
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 键值对删除
    async loginDeleteClick2(row) {
      console.log(row.id);
      try {
        const qqq = await this.$confirm(
          "此操作将永久删除此数据, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        );
        const res = await apis.systemApi.deleteUpmsDictItem(row.id);
        console.log(res);
        if (res.data.code == 0) {
          this.$message.success("删除成功");
          this.getUpmsLogDictItemPage();
        } else {
          this.$message.error(res.data.msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
