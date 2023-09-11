<template>
  <div id="app">
    <header class="header"></header>
    <main class="main">
      <router-view/>
    </main>
    <footer class="footer"></footer>
  </div>
</template>

<style>
#app {
  font-family: 'Roboto';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #353535;
  min-height: 100%;
  line-height: 21px;
  letter-spacing: -0.425px;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #474747;
  height: 60px;
}

.main {
  flex: 1 1 auto;
  height: calc(100vh - 60px - 270px);
  overflow-y: auto;
}

.footer {
  background-color: #474747;
  height: 270px
}
</style>
