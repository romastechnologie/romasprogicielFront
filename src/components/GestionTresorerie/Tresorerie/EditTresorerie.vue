<template>
    <main>
      <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form
            class="col"
            :validation-schema="tresorerieschema"
            @submit="addTresorerie"
            :initial-values="tresorerie"
          >
            <div class="row">
              <div class="col-4 my-3">
                <label for="nom">Nom</label>
                <Field type="text" name="nom" v-model="tresorerie.nom" id="nom" class="form-control" />
                <ErrorMessage name="nom" class="text-danger" />
              </div>
              <div class="col-4 my-3">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="operation" id="nonOperationnelle" value="Non Opérationnelle" v-model="tresorerie.operation" />
                  <label class="form-check-label" for="nonOperationnelle">
                    Non Opérationnelle
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="operation" id="operationnelle" value="Opérationnelle" v-model="tresorerie.operation" />
                  <label class="form-check-label" for="operationnelle">
                    Opérationnelle
                  </label>
                </div>
              </div>
            </div>
  
            <div class="row">
              <div class="col-4 my-3">
                <label for="typeTresorerieId">Type de trésorerie</label>
                <Multiselect v-model="tresorerie.typeTresorerieId" :options="tresorerieOptions" :close-on-select="true" :clear-on-select="false" :multiple="false" :preserve-search="true" :searchable="true" placeholder="Sélectionner le type de trésorerie" label="label" track-by="label" />
                <ErrorMessage name="typeTresorerieId" class="text-danger" />
              </div>
  
              <div class="col-4 my-3">
                <label for="montant">Montant</label>
                <Field type="number" name="montant" v-model="tresorerie.montant" id="montant" class="form-control" placeholder="Entrer le montant" />
                <ErrorMessage name="montant" class="text-danger" />
              </div>
  
              <div class="col-4 my-3">
                <label for="dateCreation">Date de création</label>
                <Field type="date" name="dateCreation" v-model="tresorerie.dateCreation" id="dateCreation" class="form-control" />
                <ErrorMessage name="dateCreation" class="text-danger" />
              </div>
            </div>
  
            <div class="col-6">
              <button type="submit" class="btn btn-primary mx-2">Modifier</button>
              <router-link to="/tresoreries/liste-tresorerie/" type="button" class="btn btn-danger">Annuler</router-link>
            </div>
          </Form>
        </div>
      </div>
    </main>
    <router-view />
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { Form, Field, ErrorMessage, configure } from "vee-validate";
  import * as Yup from "yup";
  import { useRouter, useRoute } from "vue-router";
  import Swal from "sweetalert2";
  import ApiService from "@/services/ApiService";
  import Multiselect from "@vueform/multiselect";
  import { error } from "../../../utils/utils";
  
  // State and route setup
  const router = useRouter();
  const route = useRoute();
  const tresorerie = ref({
    nom: "",
    operation: "Non Opérationnelle",
    montant: null,
    dateCreation: "",
    typeTresorerieId: null,
  });
  
  const typeTresorerieOptions = ref([]);
  
  // Validation schema
  const tresorerieschema = Yup.object().shape({
    nom: Yup.string().required("Le nom est obligatoire").label("Nom"),
    montant: Yup.number().required("Le montant est obligatoire").label("Montant"),
    dateCreation: Yup.string().required("La date de création est obligatoire").label("Date de création"),
  });
  
  // Vee-validate configuration
  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
  });
  
  onMounted(async () => {
    console.log("route.params.id", route.params.id);
    await getTypeTresorerie();
  
    if (route.params.id) {
      getTresorerie(parseInt(route.params.id as string));
    }
  });
  
  const getTypeTresorerie = async () => {
    try {
      const res = await ApiService.get("/all/typeTresoreries");
      if (res.data && res.data.data && Array.isArray(res.data.data.data)) {
        const tresorerieArray = res.data.data.data;
        typeTresorerieOptions.value = tresorerieArray.map((tresorerie: any) => ({
          value: tresorerie.id,
          label: tresorerie.libelle,
        }));
      } else {
        console.error("Unexpected response format:", res.data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des types de trésoreries", error);
    }
  };
  
  const getTresorerie = async (id: number) => {
  try {
    const { data } = await ApiService.get("/tresoreries/" + id);

    // Format dateCreation to 'YYYY-MM-DD' format
    const formattedDateCreation = data.data.dateCreation
      ? new Date(data.data.dateCreation).toISOString().split('T')[0]
      : '';

    // Assign the values to tresorerie, including the formatted date
    tresorerie.value = {
      nom: data.data.nom || '',
      operation: data.data.operation || 'Non Opérationnelle',
      montant: data.data.montant || null,
      dateCreation: formattedDateCreation, // Use formatted date here
      typeTresorerieId: data.data.typeTresorerieId || null,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des informations de la trésorerie", error);
  }
};

  
  const addTresorerie = async (value: object) => {
    try {
      await ApiService.put(`/tresoreries/${route.params.id}`, value);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Type de trésorerie modifié",
        showConfirmButton: false,
        timer: 1500,
      });
  
      router.push("/tresoreries/liste-tresorerie");
    } catch (error) {
      console.error("Erreur lors de la modification de la trésorerie", error);
    }
  };
  </script>
  

<style scoped>
.overview {
  margin: auto;
}

.text-title {
  text-align: center;
}

.overflow {
  padding: 10px 400px;
}
</style>
