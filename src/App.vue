<template>
  <!-- <div class="loader-wrapper" v-if="showLoader">
    <div class="loader loader-1">
      <div class="loader-outter"></div>
      <div class="loader-inner"></div>
      <div class="loader-inner-1"></div>
    </div>
  </div> -->
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, onUnmounted } from "vue"
import { useRouter } from 'vue-router'
import { useProductsStore } from "@/store/products"
let showLoader = ref<boolean>(false)
let router = useRouter()

watch(
  () => router,
  () => {
    showLoader.value = true;
    setTimeout(() => {
      showLoader.value = false
    }, 1500);
  },
  { deep: true },
);
function add() {
  let localItem = JSON.stringify(useProductsStore().cart);
  localStorage.setItem('cart', localItem)

}
onMounted(() => {
  let allBgImageCover = document.getElementsByClassName('bg-img-cover');
  window.addEventListener('beforeunload', add)
  useProductsStore().intialUpload(JSON.parse(localStorage.getItem('cart')) || [])
  setTimeout(() => {
    for (let i = 0; i < allBgImageCover.length; i++) {
      var image = allBgImageCover[i]
      var parentEl: any = allBgImageCover[i].parentElement
      var src = image.getAttribute('src')
      parentEl.style.backgroundImage = "url(" + src + ")"
      parentEl.style.backgroundSize = "cover"
      parentEl.style.backgroundPosition = "center"
      parentEl.classList.add('bg-size')
      image.classList.add('d-none')
    }
  }, 0);
})
onUnmounted(() => {
  window.removeEventListener('beforeunload', add)
})
</script>

<style>
  .multiselect-wrapper {
      min-height: calc(var(--ms-border-width, 1px)* 2 + var(--ms-font-size, 1rem)* var(--ms-line-height, 1.375) + var(--ms-py, .4rem)* 2) !important;
  }
  .multiselect {
      border: 1px dashed rgba(106, 113, 133, 0.3)!important;
      min-height: calc(var(--ms-border-width, 1px)* 2 + var(--ms-font-size, 1rem)* var(--ms-line-height, 1.375) + var(--ms-py, .4rem)* 2) !important;
  }
</style>

