<template>
     <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing ">
                <Form @submit="updateTresorerie" :validation-schema="schema" class="card">
                    <div class="row">
                        <div class="col-md-6">
                
                <div class="row">
<div class="col-md-12 mb-md-25">
 <div class="tab-pane fade show active p-10" id="home-tab-pane" role="tabpanel" tabindex="0">
   <div class="row">
     <div class="border border-primary mb-10">
       <div class="row d-flex align-items-center justify-content-between fw-bold py-2" style="background-color: #0a59a4">
         <div class="col-md-7">
           <h3 class="fs-4 text-white">Billetage</h3>
         </div>
       </div>
       <div>
         <div class="row d-flex align-items-center justify-content-between mt-2">
           <div class="col-md-3">
             <label class="d-block text-black fw-semibold">Monnaie</label>
           </div>
           <div class="col-md-3">
             <label class="d-block text-black fw-semibold">Quantité</label>
           </div>
           <div class="col-md-3">
             <label class="d-block text-black fw-semibold">Montant</label>
           </div>
         </div>
         <hr class="mt-0" />
                   <template v-for="(billetage,index) in billetageList" :key="index">
<Form :validation-schema="schema" class="container m-3">
   <div class="">
       <div class="row">
           <div class="col-md-4">
               <input name="monnaie" id="monnaie" 
                   placeholder="Sélectionner la monnaie" v-model="billetage.libelle" readonly class="form-control">
           </div>
           <div class="col-md-4">
               <Field  name="qteBillet" 
    id="qteBillet" 
    type="number" 
    placeholder="Entrer la quantité" 
    class="form-control" 
    :value="billetage.qteBillet"
    @input="event => handleBilletageInput(event, billetage)" />
               <ErrorMessage name="qteBillet" />
           </div>
           <div class="col-md-4">
               <Field name="montant" 
                      id="montant" 
                      type="text" 
                      v-model="billetage.montant"
                      placeholder="Montant" 
                      readonly class="form-control" />
               <ErrorMessage name="montant" />
           </div>
       </div>
   </div>
</Form>
</template>
<p>Montant Total: {{ montantTotal }}</p>
   </div>
 </div>
</div>
</div>
</div>
</div>
           </div>
                        <div class="col-md-6">
                            <template v-for="ouv_fer in ouvFerList" :key="ouv_fer.id">
                                <div class="card-body" v-if="ouv_fer.id == $route.params.id">
                                    <div class="mb-3">
                                        <label for="fondDeRoulement">Fonds de roulement</label>
                                        <Field type="number" id="fondDeRoulement" name="fondDeRoulement"
                                            class="form-control" v-model=" montantTotal" />
                                        <ErrorMessage name="fondDeRoulement" class="text-danger" />
                                    </div>
                                    <div class="mb-3">
                                        <button type="submit" class="btn btn-primary">Save</button>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>


                </Form>
            </div>
        </div>

</template>

<script setup lang="ts">
import { Ouv_Fer } from "@/models/OuvFer";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";

import { useRouter, useRoute } from "vue-router";
import { onMounted, ref, reactive, watch } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import ApiService from "@/services/ApiService";


const ouvFerList = ref<Ouv_Fer[]>([])
const router = useRouter()
const route = useRoute()
const ouv_fer = ref<Ouv_Fer>({})


interface Billetage {
    montant: number
    libelle: number
    qteBillet: number
    valueAct: number
    monnaie: number
    ouv_fer?: number
}
const billetageList = reactive<Billetage[]>([])
const monnaieList = ref([] as any[])
let montantTotal = ref(0)


const schema = Yup.object().shape({
    fondDeRoulement: Yup.string().required('Le fond de roulement est obligatoire').label('Fond de roulement'),
   

})

const updateTresorerie = async (value: any) => {
    value['fondDeRoulement'] = montantTotal.value
    const res= await ApiService.put(`/ouv_fers/${route.params.id}`, value)
    console.log(res.data)
    const ouvFerId = res.data.id;


    if (res.data) {
            try {

                const billetageData = billetageList.map(billetage => ({
                    ...billetage,
                    ouv_fer: ouvFerId
                }));

                await ApiService.put(`/billetages`, billetageData)
                console.log(billetageData)
                Swal.fire({
                    timer: 1000,
                    position: "top-end",
                    text: "billetage réussi avec succès",
                    icon: "success"
                })
            } catch (error) {
                console.error('Erreur lors du billetage:', error)
                throw error;
            }
        }

}

const getTresorerie = async () => {
    await ApiService.get('/ouv_fers').then(res => {
        ouvFerList.value = res.data
        console.log(ouvFerList.value)
    })
}

const getMonnaie = async () => {
  try {
    const res = await ApiService.get("/monnaies");
    monnaieList.value = res.data.data.data;
    monnaieList.value.forEach((element) => {
      billetageList.push({
        libelle:element.libelle,
        montant: 0,
        valueAct: element.valeur,
        monnaie: element.id,
        qteBillet: 0,
      });
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des monnaies:", error);
  }
};

function handleBilletageInput(event: Event, billetage: Billetage) {
  const newValue = Number((event.target as HTMLInputElement).value); 
  billetage.qteBillet = newValue || 0; 
  updateMontant(billetage); 
};


const updateMontant = (billetage: Billetage) => {
  billetage.montant = billetage.qteBillet * billetage.valueAct || 0; 
  calculateTotal(); 
};

const calculateTotal = () => {
  montantTotal.value = billetageList.reduce((total, billetage) => {
    return total + (billetage.montant || 0); 
  }, 0);
};

// Watch billetageList deeply for changes and recalculate automatically
watch(
  billetageList,
  () => {
    calculateTotal();
  },
  { deep: true }
);


onMounted(() => {
    getTresorerie(),
    getMonnaie(),
    calculateTotal()
})


</script>

<style scoped>
.overview {
    margin: auto;


}

.text-title {
    text-align: center;
}

.overflow {
    padding: 20px 100px;

}
</style>