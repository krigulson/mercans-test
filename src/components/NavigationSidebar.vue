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
    <div class="sidebar-heading">Employee self service</div>

    <div class="sidebar-inner">
      <ul class="menu-links">
        <li v-for="sortedLinks in sortedLinks">
          <a :href="sortedLinks.path">{{ humanize(sortedLinks.title) }}</a>
        </li>
      </ul>
      <ul class="copyright"><li>Mercans &copy; {{ new Date().getFullYear() }}</li></ul>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  max-width: 230px;
  border-right: 1px solid var(--dark-gray);
  background: var(--white);
}

.sidebar-inner {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 88px);
}

.sidebar-heading {
  padding: 20px 110px 20px 36px;
  background: #001738 0% 0% no-repeat padding-box;
  font-weight: 700;
  color: var(--white);
}

.sidebar ul {
  list-style: none;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  padding-top: 40px;
}

.sidebar ul li {
  height: 40px;
}

.sidebar ul li:hover:not(.sidebar ul.copyright li) {
  background: var(--light-grayish-blue) 0% 0% no-repeat padding-box;
  cursor: pointer;
}

.sidebar ul li a,
.sidebar ul.copyright li {
  display: block;
  color: var(--black);
  text-align: left;
  font-size: 14px;
  letter-spacing: 0px;
  opacity: 1;
  padding: 10px 35px;
}

.sidebar ul.copyright {
  padding-top: 0;
  margin-top: auto;
  padding-bottom: 22px;
}
</style>