<template>
     <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing ">
                <Form @submit="updateTresorerie" :validation-schema="schema" class="card">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="row">
                                <p class="col-md-3">
                                    monnaie
                                </p>
                                <p class="col-md-3">
                                    Quantité de billet
                                </p>
                                <p class="col-md-3">
                                    Montant
                                </p>
                            </div>
                            <template v-for="billetage in billetageList" :key="billetage.monnaie">
                                <Form :validation-schema="schema" class="card">
                                    <div class="container">

                                        <div class="row">
                                            <div class="col-md-3">
                                                <div class="">
                                                    <select name="monnaie" id="monnaie" readonly
                                                        placeholder="Sélectionner la monnaie" class="form-control"
                                                        v-model="billetage.valueAct">
                                                        <template v-for="monnaie in monnaieList" :key="monnaie.id">
                                                            <option v-if="billetage.monnaie == monnaie.id"
                                                                :value="monnaie.valeur">
                                                                {{ monnaie.valeur }}
                                                            </option>
                                                        </template>
                                                    </select>

                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="">
                                                    <Field name="qteBillet" id="qteBillet" v-model="billetage.qteBillet"
                                                        type="number" placeholder="Entrer la quantité"
                                                        class="form-control"
                                                        @change="billetage.montant = billetage.valueAct * billetage.qteBillet" />
                                                    <ErrorMessage name="qteBillet" />
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="">
                                                    <Field name="montant" id="montant" type="text"
                                                        v-model="billetage.montant" placeholder="Entrer le montant"
                                                        readonly class="form-control" />
                                                    <ErrorMessage name="montant" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </Form>
                            </template>
                            <p>Montant total: {{ montantTotal }}</p>
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
    qteBillet: number
    valueAct: number
    monnaie: number
    // financeName?: string
    ouv_fer?: number
}
const billetageList = reactive<Billetage[]>([])
const monnaieList = ref([] as any[])
let montantTotal = ref(0)


const schema = Yup.object().shape({
    fondDeRoulement: Yup.string().required('Le fond de roulement est obligatoire').label('Fond de roulement'),
    // ecart: Yup.number().required('L\'écart est obligatoire').label('Ecart'),
    // solde: Yup.string().required('Le solde est obligatoire').label('Solde'),

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
    await ApiService.get('/monnaies').then(res => {
        monnaieList.value = res.data
        console.log(monnaieList.value)

        monnaieList.value.forEach(element => {
            billetageList.push({
                montant: 0,
                valueAct: element.valeur,
                monnaie: element.id,
                qteBillet: 0,
                ouv_fer: 0
            })
        });

        // for (let index = 0; index < monnaieList.value.length; index++) {
        //     billetageList.push({
        //         montant: 0,
        //         qteBillet: 0,
        //         valueAct: monnaieList.value[index].valeur,
        //         monnai: monnaieList.value[index].id
        //     })

        //     //    // console.log(monnaieList.value[index].id);
        //     //     console.log(billetageList);
        // }

        // console.log(billetageList,'tttttttttttttttttttttttttttttttttttttttttttt')
    })
}

const calculateTotal = () => {
    montantTotal.value = billetageList.reduce((total, billetage) => total + billetage.montant, 0);
    return montantTotal;
};
watch(billetageList, () => {
    calculateTotal();
});

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