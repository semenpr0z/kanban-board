<script>

import Header from '@/components/Common/Header/Header.vue';
import Footer from '@/components/Common/Footer.vue';

import { useUserStore } from '@/stores/userStore.js';

import Alerts from './components/UI/Alerts.vue';
export default {
  data() {
    return {};
  },
  components: { Header, Footer, Alerts },
  setup() {
    const userStore = useUserStore()

    userStore.initializeUserFromLocalStorage();

    return {
      userStore
    }
  },
}
</script>

<template>
  <div>
    <Header />
    <Alerts />
    <main>
      <div class="container">
        <router-view></router-view>
      </div>
    </main>
    <Footer />
  </div>
</template>

<style lang='scss'>
@import '@/assets/main.scss';

main {
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 40px);
  background-color: var(--lightBlue);

  .container {
    padding-top: 25px;
    position: relative;
  }
}
</style>