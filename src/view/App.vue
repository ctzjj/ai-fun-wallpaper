<template>
  <div id="app" class="full-height">
    <router-view/>
  </div>
</template>

<style>
  html, body {
    height: 100%;
    margin: 0;
  }

  body {
    padding: 0;
  }

  .full-height {
    height: 100%;
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-track {
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    background   : #ededed;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius   : 10px;
    background-color: skyblue;
    background-image: -webkit-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.2) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.2) 75%,
            transparent 75%,
            transparent
    );
  }
</style>
