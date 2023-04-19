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

  methods: {
    humanize(str) {
      var i, frags = str.split('_');

      for (i=0; i<frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
      }
      return frags.join(' ');
    }
  }
}
</script>

<template>
  <aside class="sidebar">
    <ul>
      <li v-for="sortedLinks in sortedLinks">
        <a :href="sortedLinks.path">{{ humanize(sortedLinks.title) }}</a>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.sidebar {
  height: 100vh;
  border-right: 1px solid var(--dark-gray);
  background: var(--white);
}

.sidebar ul {
  list-style: none;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;

  padding-left: 36px;
  padding-right: 30px;
}

.sidebar ul li {
  padding-top: 10px;
  padding-bottom: 10px;
  height: 40px;
}

.sidebar ul li a {
  color: var(--black);
  text-align: left;
  font-size: 14px;
  letter-spacing: 0px;
  color: #001738;
  opacity: 1;
}
</style>