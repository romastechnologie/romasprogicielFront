<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
            <div class="card">
                <div class="">
                    <div class="card-header"><h5 class="">Formulaire d'ajout de personnel</h5><!----><!----><!----></div>
                    <div class="card-body">
                        <div class="row g-xl-5 g-3">
                            <AddTab />
                            <AddPersonnelContent/>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
  
import AddPersonnelContent from "@/components/GesCom/Personnel/AddPersonnelContent.vue";
import AddTab from "@/components/GesCom/Personnel/AddTab.vue";
export default defineComponent({
    name: "AddPersonnelNewPage",
    components: {
        AddPersonnelContent,
      AddTab,
    },
  });
</script>