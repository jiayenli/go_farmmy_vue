<template>
  <div class="home-content">
    <div class="mask">
      <div class="home-anime">
        <div><img src="./../assets/home-img-4.png" /></div>
        <div><img src="./../assets/home-img-5.png" /></div>
        <div><img src="./../assets/home-img-3.jpg" /></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.home-content {
  margin: 0 0;
  outline: 1px red solid;
  width: 100vw;
  height: 100vh;
  background-image: url("./../assets/home-background.png");
  .mask {
    width: 100%;
    -webkit-mask: url("./../assets/home-img-cover.png") no-repeat center center /
      contain;
    mask-size: cover;
    position: relative;
  }
  .home-anime {
    position: relative;
    height: 90vh;

    div {
      display: block;
      position: absolute;
      opacity: 0;
      filter: alpha(opacity=0);
      /*動畫全長時間設定*/
      -webkit-animation: slider 18s linear infinite;
      animation: slider 18s linear infinite;
    }
  }

  img {
    height: 90vh;
    width: 100vw;
    overflow: hidden;
    object-fit: cover;
  }
}

/*動畫關鍵影格, slider動畫名字*/
  @-webkit-keyframes slider {
    10% {
      opacity: 1;
      filter: alpha(opacity=100);
    }
    27% {
    opacity: 1;
    filter: alpha(opacity=100);
    }
    45% {
    opacity: 0;
    filter: alpha(opacity=0);
    }
  }
  @keyframes slider {
    10% {
      opacity: 1;
      filter: alpha(opacity=100);
    }
    27% {
    opacity: 1;
    filter: alpha(opacity=100);
    }
    45% {
    opacity: 0;
    filter: alpha(opacity=0);
    }
  }
 
  .home-anime div:nth-child(1) {
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
  }
 
  .home-anime div:nth-child(2) {
    -webkit-animation-delay: 5s;
    animation-delay: 6s;
  }
 
  .home-anime div:nth-child(3) {
    -webkit-animation-delay: 10s;
    animation-delay: 12s;
  }

</style>