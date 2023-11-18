<template>
  <div class="layout">
    <div class="header">
      <Nav></Nav>
    </div>
    <div class="main">
      <div class="content">
        <router-view></router-view>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script setup>
import Nav from "@/components/Nav/Nav.vue";
import Footer from "@/components/Footer/Footer.vue";
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.header {
  width: 100%;
  position: fixed;
  z-index: 9
}
.main {
  padding-top: 67px;
  display: flex;
  flex-direction: column;
  flex: 1
}
 .content {
    flex: 1
  }
</style>
