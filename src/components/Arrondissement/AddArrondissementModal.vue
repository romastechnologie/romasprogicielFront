<template>
  <div
    class="modal fade createNewModal"
    id="AddArrondissementModal"
    tabindex="-1"
    ref="addArrondissementModalRef"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header">
          <h4 class="modal-title fw-bold text-black">{{ title }}</h4>
          <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <Form ref="arrondissementForm" @submit="addArrondissement" :validation-schema="arrondissementSchema">
            <div class="row">
             <!-- <div class="col-md-12 mt-3">
               <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Code <span class="text-danger">*</span>
                  </label>
                  <Field name="code" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code"/>
                  <ErrorMessage name="code" class="text-danger"/>
                </div>
              </div>-->
              <div class="col-md-12 mt-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Libellé <span class="text-danger">*</span>
                  </label>
                  <Field name="libelle" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libellé"/>
                  <ErrorMessage name="libelle" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-12 mb-3">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Commune <span class="text-danger">*</span>
                    </label>
                    <Field  name="commune"  v-slot="{ field }">
                      <Multiselect
                        :options="communeOptions"
                        :searchable="true"
                        track-by="label"
                        mode ="tags"
                        label="label"
                        v-model = "field.value"
                        v-bind = "field"
                        placeholder="Sélectionner la commune"
                      />
                    </Field>  
                  </div>
                  <ErrorMessage name="commune" class="text-danger"/>
                </div>
                <button class="btn btn-primary" type="submit">
                {{ btntext }}
              </button>
          </div>
        </Form>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import ApiService from '../../services/ApiService';
import * as Yup from 'yup';
import { Arrondissement } from '../../models/Arrondissement';
import { error , success, hideModal } from '../../utils/utils';
import Multiselect from '@vueform/multiselect'
import axios from 'axios';

export default defineComponent({
    name: "AddArrondissementModal",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  props: {
    item: {
      type: Number,
      default: 0,
    }
  },
  setup(props, { emit }){
    const arrondissementSchema = Yup.object().shape({
   //   code: Yup.string().required("Le code est obligatoire"),
      libelle: Yup.string().required('Le libellé est obligatoire'),
      commune: Yup.string().required('La commune est obligatoire'),

    });

    const arrondissementForm = ref<Arrondissement | null>(null);
    const addArrondissementModalRef = ref<null | HTMLElement>(null);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un arrondisement");
    const btntext = ref('Ajouter');
    const communeOptions = ref([]);

    watch(() => props.item, (newValue) => {
      getArrondissement(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier l' arrondissement";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter un arrondissement";
         btntext.value = "Ajouter";
      }
    }

    const getArrondissement = async (id: number) => {
      return ApiService.get("/arrondissements/"+id)
      .then(({ data }) => {
        // map data in form
        const donnees = data.data;
        for (const key in donnees) {
          arrondissementForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addArrondissementModalRef.value);

      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    onMounted(()=> {
      fetchCommune();
    })

    const fetchCommune = async () => {
      try {
        const response = await axios.get('all/communes');
        const communesData = response.data.data.data;
        communeOptions.value = communesData.map((commune) => ({
          value: commune.id,
          label: `${commune.libelle}`,
        }));
      } catch (error) {
        //
      }
    };

    const addArrondissement = async (values: any, arrondissementForm) => {
      values = values as Arrondissement;
      if(isUPDATE.value){
        ApiService.put("/arrondissements/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              arrondissementForm.resetForm();
              hideModal(addArrondissementModalRef.value);
              isUPDATE.value=false;
              btnTitle();
              emit('close');
            }
        })
        .catch(({ response }) => {
            error(response.data.message);
        });
      }else{
        ApiService.post("/arrondissements",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              arrondissementForm.resetForm();
              hideModal(addArrondissementModalRef.value);
              emit('close');
            }
        })
        .catch(({ response }) => {
            error(response.data.message);
        });
      }
    };

    const resetValue = () => {
      const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
        isUPDATE.value=false;
      formFields.forEach(field => {
        field.value = '';
      });
      btnTitle()
    };

    return { arrondissementSchema,
      addArrondissementModalRef,
      addArrondissement,
      arrondissementForm,communeOptions,
      title,btntext,resetValue
    };
  },
});
</script>@/models/Arrondissement