<template>
  <div class="legend">
    <div class="legend-item" v-for="(item, index) in items" :key="index">
      <div class="legend-item-box" :style="{ backgroundColor: item.color }"></div>
      <span class="legend-item-label">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Legend",
  data() {
    return {
      items: [
        {
          name: "Ocean",
          color: "#009cde",
        },
        {
          name: "Land",
          color: "#669933",
        },
        {
          name: "Mountain",
          color: "#3a2613",
        },
        {
          name: "Ice/Snow",
          color: "#FFFFFF",
        },
      ],
    };
  },
};
</script>

<style scoped>
.legend {
  display: flex;
  align-items: center;
  padding-left: 25px;
}

.legend-item {
  display: flex;
  padding-right: 20px;
  align-items: center;
}

.legend-item-box {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.legend-item-label {
  font-size: 14px;
}
</style>
