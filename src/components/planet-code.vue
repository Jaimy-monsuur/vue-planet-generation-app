<template>
  <div class="planet-code">
    {{ planetCode }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      planetCode: '',
    };
  },
  methods: {
    generatePlanetCode() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let code = '';
      for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return `PLANET-${code}`;
    },
  },
  created() {
    this.planetCode = this.generatePlanetCode(); // generate the planet code once on component creation
  },
  computed: {
    planetCode() {
      return this.$data.planetCode;
    },
  },
};
</script>

<style>
.planet-code {
  position: fixed;
  z-index: 999;
  font-size: 2rem;
  font-weight: bold;
  top: 30px;
  left: 25px;
  color: snow;
}
</style>
