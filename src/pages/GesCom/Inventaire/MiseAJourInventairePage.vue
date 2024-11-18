<template>
  <MiseAjourInventaire />
</template>
  
  <script lang="ts">
import { defineComponent } from "vue";
import MiseAjourInventaire from '@/components/GesCom/Inventaire/MiseAjourInventaire.vue';


export default defineComponent({
  name: "MiseAJourInventairePage",
  components: {
    MiseAjourInventaire,
  },
});
</script>