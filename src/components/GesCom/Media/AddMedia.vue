<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="mediaForm" @submit="addMedia" :validation-schema="mediaSchema">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                 Image principale<span class="text-danger">*</span>
                </label>
                <Field name="photo" type="file" 
                      accept="image/jpeg, image/png application/pdf"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Choisissez une image"/>
              </div>
              <ErrorMessage name="photo" class="text-danger"/>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Nom du media <span class="text-danger">*</span>
                </label>
                <Field name="nomMedia" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le titre"/>
                <ErrorMessage name="nomMedia" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Type de média ? <span class="text-danger">*</span>
                </label>
                <Field  name="typeMedia"  v-slot="{ field }">
                  <Multiselect
                    :options="typeMediaOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner l'option"
                  />
                </Field>  
              </div>
              <ErrorMessage name="typeMedia" class="text-danger"/>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Extension <span class="text-danger">*</span>
                </label>
                <Field name="extension" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'extension"/>
                <ErrorMessage name="extension" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Numéro de table <span class="text-danger">*</span>
                </label>
                <Field name="idTable" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le numéro"/>
                <ErrorMessage name="idTable" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Nom de la table <span class="text-danger">*</span>
                </label>
                <Field name="nomTable" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                <ErrorMessage name="nomTable" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Identifiant de la table <span class="text-danger">*</span>
                </label>
                <Field name="idTable" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'id"/>
                <ErrorMessage name="idTable" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-12">
              <div class="d-flex align-items-center ">
                <button
                  class="btn btn-success me-3"
                  type="submit"
                >
                    Ajouter un media
                </button>
                <router-link to="/liste-medias" 
                    class=" btn btn-danger"><i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                    <span class="position-relative"></span>Annuler</router-link>
              </div>
            </div>
      </div>
    </Form>
  </div>
</div>
</template>

<script lang="ts">

import { defineComponent, ref, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRouter } from "vue-router";
import ApiService from '@/services/ApiService';
import { Media } from '@/models/Media';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "AddMedia",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const mediaSchema = Yup.object().shape({
      photo: Yup.string().notRequired(),
      nomMedia: Yup.string().required('Le titre est obligatoire'),
      typeMedia: Yup.string().required('Le titre est obligatoire'),
      extension: Yup.string().required('Le titre est obligatoire'),
      idTable: Yup.number().typeError('Veuillez entrer des chiffres').required('L\'id de la table est obligatoire'),
      nomTable: Yup.string().required('Le nom de la table est obligatoire'),
    });

    const mediaForm =  ref<Media | null>(null);
    const router = useRouter();

    const typeMediaOptions = 
      [
      {
          value: "1" ,
          label: "Image"
      },
      {
          value: "2" ,
          label: "Vidéo"
      }
    ];

    const addMedia = async (values, {resetForm}) => {
      ApiService.post("/medias",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeMediaPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    return { mediaSchema,
       addMedia,
        mediaForm,typeMediaOptions,
      };
  },
});
</script>