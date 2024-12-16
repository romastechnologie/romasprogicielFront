<template>
  <div
    class="modal fade createNewModal"
    id="AddCommuneModal"
    tabindex="-1"
    ref="addCommuneModalRef"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header">
          <h4 class="modal-title fw-bold text-black">{{ title }}</h4>
          <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <Form ref="communeForm" @submit="addCommune" :validation-schema="communeSchema">
            <div class="row">
              <div class="col-md-12 mt-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Code <span class="text-danger">*</span>
                  </label>
                  <Field name="code" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code"/>
                  <ErrorMessage name="code" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-12 mb-3">
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
                      Département <span class="text-danger">*</span>
                    </label>
                    <Field  name="departement"  v-slot="{ field }">
                      <Multiselect
                        :options="departementOptions"
                        :searchable="true"
                        track-by="label"
                        label="label"
                        v-model = "field.value"
                        v-bind = "field"
                        placeholder="Sélectionner le département"
                      />
                    </Field>  
                  </div>
                  <ErrorMessage name="departement" class="text-danger"/>
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
import { Commune } from '../../models/Commune';
import { error , success, hideModal } from '../../utils/utils';
import Multiselect from '@vueform/multiselect'
import axios from 'axios';

export default defineComponent({
    name: "AddCommuneModal",
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
    const communeSchema = Yup.object().shape({
      code: Yup.string().required("Le code est obligatoire"),
      libelle: Yup.string().required('Le libellé est obligatoire'),
      departement: Yup.string().required('Le département est obligatoire'),
    });

    const communeForm = ref<Commune | null>(null);
    const addCommuneModalRef = ref<null | HTMLElement>(null);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter une commune");
    const btntext = ref('Ajouter');
    const departementOptions = ref([]);

    watch(() => props.item, (newValue) => {
      getCommune(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier la commune";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter une commune";
         btntext.value = "Ajouter";
      }
    }

    const getCommune = async (id: number) => {
      return ApiService.get("/communes/"+id)
      .then(({ data }) => {
        // map data in form
        const donnees = data.data;
        for (const key in donnees) {
          communeForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addCommuneModalRef.value);

      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    onMounted(()=> {
      fetchDepartement();
    })

    const fetchDepartement = async () => {
      try {
        const response = await axios.get('all/departements');
        const departementsData = response.data.data.data;
        departementOptions.value = departementsData.map((departement) => ({
          value: departement.id,
          label: `${departement.libelle}`,
        }));
      } catch (error) {
        //
      }
    };

    const addCommune = async (values: any, communeForm) => {
      values = values as Commune;
      if(isUPDATE.value){
        ApiService.put("/communes/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              communeForm.resetForm();
              hideModal(addCommuneModalRef.value);
              isUPDATE.value=false;
              btnTitle();
              emit('close');
            }
        })
        .catch(({ response }) => {
            error(response.data.message);
        });
      }else{
        ApiService.post("/communes",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              communeForm.resetForm();
              hideModal(addCommuneModalRef.value);
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

    return { communeSchema,
      addCommuneModalRef,
      addCommune,
      communeForm,departementOptions,
      title,btntext,resetValue
    };
  },
});
</script>@/models/Commune