<script>
import menuLinks from '../static/menuLinks.json';
import Icon from './SvgIcon.vue';

export default {
  data() {
    return {
      menuLinks: menuLinks
    }
  },

  components: {
    Icon
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
    <div class="collapse-sidebar">
      <div class="collapse-sidebar-inner">
        <Icon name="chevron" />
        <div class="tooltip tooltip-right">Collapse sidebar</div>
      </div>
    </div>
    <div class="sidebar-inner">
      <ul class="menu-links">
        <li v-for="(sortedLinks, index) in sortedLinks" :key="index">
          <router-link :to="{path:sortedLinks.path}">
            <div>
              <Icon :name="sortedLinks.icon" />
            </div>
            {{ humanize(sortedLinks.title) }}
          </router-link>
        </li>
      </ul>
      <ul class="copyright"><li>Mercans &copy; {{ new Date().getFullYear() }}</li></ul>
    </div>
    <div class="separator"></div>
  </aside>
</template>

<style scoped>
.collapse-sidebar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  right: -25px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
.collapse-sidebar-inner {
  width: inherit;
  height: inherit;
  background: white;
  border-radius: 50%;
  border: 7px solid #F4F6F8;

  display: flex;
  align-items: center;
  justify-content: center;
}

.collapse-sidebar:hover .collapse-sidebar-inner {
  background: #FEE5DB;
  cursor: pointer;
}

.collapse-sidebar:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.collapse-sidebar-inner svg {
  height: 10px;
}
.separator {
  position: absolute;
  height: 100%;
  width: 1px;
  background: var(---97a0ac) 0% 0% no-repeat padding-box;
  background: #97A0AC 0% 0% no-repeat padding-box;
  opacity: 1;
  top: 0;
  left: 230px;
}
.sidebar {
  max-width: 230px;
  min-width: 230px;
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
  line-height: 1;
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
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--black);
  text-align: left;
  font-size: 14px;
  letter-spacing: 0px;
  opacity: 1;
  padding: 10px 35px;
  padding-right: 25px;
}

.sidebar ul li a div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
}
.sidebar ul li a div svg {
  height: 24px;
  fill: #001738;
}

.sidebar ul li a.is-active {
  background: var(--light-grayish-blue) 0% 0% no-repeat padding-box;
  color: #FC6541;
}
.sidebar ul li a.is-active svg {
  fill: #FC6541;
}
.sidebar ul li a.is-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background: #FC6541 0% 0% no-repeat padding-box;
}
.sidebar ul.copyright {
  padding-top: 0;
  margin-top: auto;
  padding-bottom: 22px;
}

.sidebar ul.copyright li {
  color: var(--dark-gray);
  justify-content: center;
}
</style>