<script>
import menuLinks from '../static/menuLinks.json';

export default {
  data() {
    return {
      menuLinks: menuLinks
    }
  },

  computed: {
    sortedLinks() {
      return this.menuLinks
      .filter(link => link.enabled && link.path)
      .sort((a, b) => { return a.ordinal - b.ordinal;});
    }
  },

}
</script>

<template>
  <aside class="sidebar">
    <ul>
      <li v-for="sortedLinks in sortedLinks">
      </li>
    </ul>
  </aside>
</template>
