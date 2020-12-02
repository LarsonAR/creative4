<template>
  <div id="app">
    <div class="row no-gutters text-center shadow" id="nav">
      <div class="col">
        <router-link to="/"><h3>Home</h3></router-link>
      </div>
      <div class="col">
        <router-link to="/add"><h3>Add</h3></router-link>
      </div>
      <div class="col">
        <router-link to="/about"><h3>About</h3></router-link>
      </div>
    </div>
    <div class="container shadow"><router-view/></div>
    <div class="github shadow"><a href="https://github.com/LarsonAR/creative3">Github</a></div>
  </div>
</template>

<style>
.page-title {
  font-size: 3em;
  margin-bottom: 1em;
  text-align: center;
}
body {
  background-color: #b9cdcd;
}
#nav {
  padding: 10px;
  background-color: #497575;
}

#nav a {
  font-weight: bold;
  color: #172121;
}

#nav a.router-link-exact-active {
  color: #93ffff;
}

.container {
  padding: 10px 15px;
  background-color: white;
}

.github {
  text-align: center;
  width: 10em;
  margin: 10px auto;
  background-color: white;
  border-radius: 10px;
}
</style>
