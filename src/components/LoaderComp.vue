<template>
  <div class="loader"></div>
</template>

<script>
export default{
  created: function(){
    window.addEventListener("load", ()=>{
        const loader = document.querySelector(".loader");
        loader.classList.add("loader-hidden");
        loader.addEventListener("transitioned", ()=>{
          document.body.removeChild("loader");
        })
      })
  },
  unmounted: function(){
    location.reload();
  }
}
</script>

<style lang="scss" scoped>
  .loader{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  transition: opacity 0.75s, visibility 0.75s;
}

.loader-hidden{
  opacity: 0;
  visibility: hidden;
}

.loader::after{
  content: "";
  width: 75px;
  height: 75px;
  border: 15px solid #dddddd;
  border-top-color: #f70776;
  border-radius: 50%;
  animation: loading 0.75s ease infinite;
}

@keyframes loading{
  from{
    transform: rotate(0turn);
  }
  to{
    transform: rotate(1turn);
  }

}
</style>