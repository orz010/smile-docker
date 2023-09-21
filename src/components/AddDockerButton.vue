<template>
    <el-button @click="handleAdd" icon="el-icon-plus" circle></el-button>
</template>

<script>
export default {
  name: "AddDockerButton",
  methods:{
    handleAdd(){
      this.$router.push('/create_docker');
    },
  }
}
</script>

<style scoped>

</style>
