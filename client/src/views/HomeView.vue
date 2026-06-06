<template>
  <div class="home">
    <el-card class="welcome-card">
      <template #header>
        <h2>Stock Recommendation</h2>
      </template>
      <p>股票推荐系统</p>
      <el-button type="primary">Get Started</el-button>
    </el-card>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.welcome-card {
  width: 400px;
  text-align: center;
}
</style>
