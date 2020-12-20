<template>
  <div class="container iconList">
    <i class="icon" v-for="(item, index) in iconList" :key="index" :class="`el-icon-${item}`" @click="iconClick(item)" ></i>
  </div>
</template>

<script>
export default {
  name: "lazyIcon",
  data() {
    return {
      iconList: [
        "delete",
        "setting",
        "phone",
        "phone-outline",
        "more",
        "more-outline",
        "star-on",
        "star-off",
        "goods",
        "location",
        "el-icon-plus",
      ],
    };
  },
  methods: {
    // 点击某个图标
    iconClick(e) {
      console.log(e);
      this.$emit('iconEmit', e);
    },
  },
};
</script>

<style scoped>
.icon {
  font-size: 24px;
  width: 50px;
  transition: all .5s ease;
}

.icon:hover {
  transform:scale(1.5, 1.5);
}
</style>
