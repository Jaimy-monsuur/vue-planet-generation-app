<template>
  <div class="refresh-button" @click="refresh">Refresh
  </div>
</template>

<script>
export default {
  methods: {
    refresh : function () {
      console.log('refresh');
      location.reload(); // refresh the page
    },
  },
};
</script>

<style scoped>
.refresh-button {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0px 0px 10px #ccc;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  color: #000;
}


</style>
