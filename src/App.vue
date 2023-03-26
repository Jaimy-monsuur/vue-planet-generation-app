<template>
  <div class="header">
    <PlanetCode />
    <RefreshButton />
  </div>
  <div class="container">
    <PlanetView />
  </div>
  <div class="footer">
    <Legend />
  </div>
</template>

<script setup>
import PlanetView from './components/planet-view.vue'
import RefreshButton from './components/refresh-button.vue'
import PlanetCode from "@/components/planet-code.vue"
import Legend from "@/components/Legend.vue";
</script>

<style>
.container{
  z-index: 200;
}

.header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  color: #000;
  z-index: 1000;
}
.footer{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  font-family: Arial, Helvetica, sans-serif;
  color: snow;
  z-index: 1000;
}
</style>
