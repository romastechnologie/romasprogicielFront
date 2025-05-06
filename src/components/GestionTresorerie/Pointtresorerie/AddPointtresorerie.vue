<template>
    <main>
      <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
        <div class="card-header">
      <h3 class="text-black fw-semibold">Ajouter un point de trésorerie</h3>
    </div>
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form class="col" :validation-schema="pointtresorerieSchema" @submit="addPointtresorerie">
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="form-group mb-15">
                  <label class="d-block text-black mb-10">
                    Utilisateur <span class="text-danger">*</span>
                  </label>
                  <Field name="user" v-slot="{ field }">
                    <Multiselect
                      :options="userOptions"
                      :searchable="true"
                      track-by="value"
                      label="label"
                      v-model="field.value"
                      placeholder="Sélectionner l'utilisateur"
                      @change="(value) => { field.value = value; onUserSelected(value); }"
                    />
                  </Field>
                  <ErrorMessage name="user" class="text-danger" />
                </div>
              </div>
  
              <div class="col-md-6 mb-3">
                <div class="form-group mb-15">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date de début <span class="text-danger">*</span>
                  </label>
                  <Field name="dateDebut" type="date" class="form-control shadow-none fs-md-15 text-black" />
                  <ErrorMessage name="dateDebut" class="text-danger" />
                </div>
              </div>
  
              <div class="col-md-6 mb-3">
                <div class="form-group mb-15">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date de fin <span class="text-danger">*</span>
                  </label>
                  <Field name="dateFin" type="date" class="form-control shadow-none fs-md-15 text-black" />
                  <ErrorMessage name="dateFin" class="text-danger" />
                </div>
              </div>
  
              <div class="col-md-6 mb-3">
                <div class="form-group mb-15">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date d'exécution <span class="text-danger">*</span>
                  </label>
                  <Field name="dateExecution"
                 
                   type="date" class="form-control shadow-none fs-md-15 text-black" />
                  <ErrorMessage name="dateExecution" class="text-danger" />
                </div>
              </div>
            </div>
  
            <!-- Tableau des Trésoreries -->
            <div class="row mt-4" v-if="userSelected">
              <div class="col-12">
                <table class="table table-bordered table-striped text-center">
                  <thead style="background-color: #0a59a4; color: white;">
                    <tr>
                      <th style="color: white;">Trésorerie</th>
                      <th style="color: white;">Montant Disponible</th>
                      <th style="color: white;">Montant Visible</th>
                      <th style="color: white;">Écart</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(tresorerie, index) in tresoreries" :key="index">
                      <td>{{ tresorerie.nom }}</td>
                      <td>{{ tresorerie.montant }}</td>
                      <td>
                        <input
                          type="number"
                          v-model.number="tresorerie.montantVisible"
                          class="form-control"
                          placeholder="Saisir le montant"
                        />
                      </td>
                      <td>
                        {{ calculateEcart(tresorerie.montant, tresorerie.montantVisible) }}
                      </td>
                    </tr>
                  </tbody>
  
                  <tfoot>
                    <tr style="background-color: #d8e9f3;">
                      <td colspan="3" class="text-end fw-bold align-middle" style="font-size: 1.1rem;">
                        Montant Total Disponible :
                      </td>
                      <td>{{ totalDisponible }}</td>
                    </tr>
                    <tr style="background-color: #d8e9f3;">
                      <td colspan="3" class="text-end fw-bold align-middle" style="font-size: 1.1rem;">
                        Montant Total Renseigné :
                      </td>
                      <td>{{ totalRenseigne }}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
  
            <!-- Boutons d'action -->
            <div class="row mt-4">
              <div class="col-6">
                <button type="submit" class="btn btn-primary mx-2">Ajouter</button>
                <router-link to="/pointtresoreries/liste-pointtresorerie" type="button" class="btn btn-danger">
                  Annuler
                </router-link>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </main>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref, computed } from 'vue';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as Yup from 'yup';
  import axios from 'axios';
  import ApiService from '@/services/ApiService';
  import { useRouter } from 'vue-router';
  import Multiselect from '@vueform/multiselect/src/Multiselect';
  import { error, success } from '@/utils/utils';

  
  export default defineComponent({
    name: 'AddPointtresorerie',
    components: { Form, Field, ErrorMessage, Multiselect },
    setup() {
      const pointtresorerieSchema = Yup.object().shape({
    user: Yup.string().required('Le user est obligatoire.'),
    dateDebut: Yup.date().required('La date de début est obligatoire.'),
    dateExecution: Yup.date()
        .required('La date d\'exécution est obligatoire.')
        .min(Yup.ref('dateFin'), 'La date d\'exécution doit être égale ou postérieure à la date de fin.'),
    dateFin: Yup.date()
        .required('La date de fin est obligatoire.')
        .min(Yup.ref('dateDebut'), 'La date de fin ne peut pas être antérieure à la date de début.'),
    tresoreries: Yup.array()
        .of(
            Yup.object().shape({
                id: Yup.number().required(),
                montantVisible: Yup.number().required('Montant visible obligatoire.'),
            })
        )
        .min(1, 'Au moins une trésorerie doit être spécifiée.'),
});

      const tresoreries = ref([]);
      const userOptions = ref([]);
      const userSelected = ref(false);
      const router = useRouter();

  
      const getUser = async (id) => {
        try {
          console.log('Appel API pour récupérer les trésoreries du user ID:', id);
          const { data } = await ApiService.get(`/userTresorerie/${id}`);
          console.log('Réponse des trésoreries récupérées:', data); 
          tresoreries.value = data.data;
        } catch (err) {
          console.error(err);
        }
      };
  
      const getAllAllUsers = async () => {
        try {
          const response = await ApiService.get('/all/users');
          userOptions.value = response.data.data.map((user) => ({
            value: user.id,
            label: `${user.nom} ${user.prenom}`,
          }));
        } catch (error) {
          console.error(error);
        }
      };
      const addPointtresorerie = async (values, { resetForm }) => {
    const payload = {
        user: values.user,
        dateDebut: values.dateDebut,
        dateFin: values.dateFin,
        dateExecution: values.dateExecution,
        tresoreries: tresoreries.value.map((tresorerie) => ({
            id: tresorerie.id,
            montant: tresorerie.montant,
            montantVisible: tresorerie.montantVisible,
        })),
    };

    try {
        const { data } = await ApiService.post("/pointtresoreries", payload);
        if (data.code === 201) {
            success(data.message);
            resetForm();
            router.push({ name: "ListePointtresoreriePage" });
        }
    } catch ({ response }) {
        error(response.data.message);
    }
};

      onMounted(() => getAllAllUsers());
  
      const onUserSelected = (selectedUserId) => {
        console.log('User sélectionné ID:', selectedUserId); 
        if (selectedUserId) {
          getUser(selectedUserId);
          userSelected.value = true;
        } else {
          userSelected.value = false;
        }
      };
  
      const calculateEcart = (montantDisponible, montantVisible) =>
        montantVisible ? montantDisponible - montantVisible : 0;
  
      const totalDisponible = computed(() =>
        tresoreries.value.reduce((sum, tresorerie) => sum + tresorerie.montant, 0)
      );
  
      const totalRenseigne = computed(() =>
        tresoreries.value.reduce((sum, tresorerie) => sum + (tresorerie.montantVisible || 0), 0)
      );
  
      return {
        pointtresorerieSchema,
        tresoreries,
        userOptions,
        userSelected,
        onUserSelected,
        calculateEcart,
        totalDisponible,
        totalRenseigne,
        addPointtresorerie
      };
    },
  });
  </script>
  