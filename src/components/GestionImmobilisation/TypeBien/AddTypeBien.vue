<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="bienForm" @submit="addTypeBien" :validation-schema="typeBienSchema">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Code <span class="text-danger">*</span>
              </label>

              <Field name="code" class="form-control" type="text" />

              <ErrorMessage name="code" class="text-danger" />
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Libelle <span class="text-danger">*</span>
              </label>

              <Field name="libelle" class="form-control" type="text" />

              <ErrorMessage name="libelle" class="text-danger" />
            </div>
          </div>
          <div class="col-md-12">
            <div class="d-flex align-items-center ">
              <button
                class="default-btn me-20 transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-success m-2"
                type="submit" >
                Créer un Type de Bien
              </button>
              <router-link to="/typebiens/liste-typebiens" class=" btn btn-danger transition border-0 lh-1 fw-medium"><i
                  class="flaticon-delete lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Annuler</router-link>
            </div> 
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, onMounted, ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { TypeBien } from '@/models/TypeBien';
import { error, success } from '@/utils/utils';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "AddTypeBien",
  components: {
    Form,
    Field,
    ErrorMessage,
    //Multiselect
  },

  setup: () => {
    const typeBienSchema = Yup.object().shape({
      code: Yup.string().required("Le code est obligatoire."),
      libelle: Yup.string().required("Le libellé est obligatoire."),
    });

    onMounted(() => {
      getAllTypeBien()
    });

    const bienForm = ref(null);
    const typeOptions = ref([]);
    const router = useRouter();

    const addTypeBien = async (values, { resetForm }) => {
      values = values as TypeBien;
      console.log('DOnnées e voyées', values)
      ApiService.post("/types", values)
        .then(({ data }) => {
          if (data.code == 201) {
            success(data.message)
            resetForm();
            router.push({ name: "ListeTypeBienPage" });
          }
        }).catch(({ response }) => {
          error(response.message);
        });
    }

    const getAllTypeBien = async () => {
      try {
        const response = await ApiService.get('/all/types');
        const typesData = response.data.data;

        typeOptions.value = typesData.map((type) => ({
          value: type.id,
          label: type.libelle,
        }));
      }
      catch (error) {
        //error(response.data.message)
      }
    }

    return { typeBienSchema, addTypeBien, bienForm, typeOptions };
  },
});
</script>