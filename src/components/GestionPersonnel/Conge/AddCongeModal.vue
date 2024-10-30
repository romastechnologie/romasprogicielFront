<template>

  <div class="modal fade" id="AddCongeModal" tabindex="-1" role="dialog" ref="addCongeModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="conge">
              <div class="modal-content">
                  <div class="modal-header">
                      <h4 class="modal-title">{{ title }}</h4>
                      <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <Form ref="typeForm" @submit="addConge" :validation-schema="congeSchema">
                      <div class="row">
                        




                        <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Demande <span class="text-danger">*</span>
                  </label>
                  <Field  name="personnel"  v-slot="{ field }">
                    <Multiselect
                      :options="personnelOptions"
                      :searchable="true"
                      track-by="label"
                      label="label"
                      v-model = "field.value"
                      v-bind = "field"
                      placeholder="Sélectionner le personnel"
                    />
                  </Field>  
                </div>
                <ErrorMessage name="personnel" class="text-danger"/>
              </div>

                        <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Personnel <span class="text-danger">*</span>
                  </label>
                  <Field  name="personnel"  v-slot="{ field }">
                    <Multiselect
                      :options="personnelOptions"
                      :searchable="true"
                      track-by="label"
                      label="label"
                      v-model = "field.value"
                      v-bind = "field"
                      placeholder="Sélectionner le personnel"
                    />
                  </Field>  
                </div>
                <ErrorMessage name="personnel" class="text-danger"/>
              </div>
                        

              <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Type de congé  <span class="text-danger">*</span>
                  </label>
                  <Field  name="personnel"  v-slot="{ field }">
                    <Multiselect
                      :options="personnelOptions"
                      :searchable="true"
                      track-by="label"
                      label="label"
                      v-model = "field.value"
                      v-bind = "field"
                      placeholder="Sélectionner le personnel"
                    />
                  </Field>  
                </div>
                <ErrorMessage name="personnel" class="text-danger"/>
              </div>
                        
          
                          
                     <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                               Date de début <span class="text-danger">*</span>
                              </label>
                              <Field name="datedebut" type="Date" class="form-control shadow-none fs-md-15 text-black"/>
                              <ErrorMessage name="datedebut" class="text-danger"/>
                            </div>     
                          </div>

                          <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                               Date de fin <span class="text-danger">*</span>
                              </label>
                              <Field name="datefin" type="Date" class="form-control shadow-none fs-md-15 text-black"/>
                              <ErrorMessage name="datefin" class="text-danger"/>
                            </div>     
                          </div>

                          <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                               Date de fin prévu  <span class="text-danger">*</span>
                              </label>
                              <Field name="datefin" type="Date" class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le contenu"/>
                              <ErrorMessage name="contenu" class="text-danger"/>
                            </div>     
                          </div>

                         



                        <button
                          class="btn btn-primary"
                          type="submit">
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
import * as Yup from 'yup';
import { Conge } from '@/models/Conge';
import Multiselect from '@vueform/multiselect'
import axios from 'axios';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';

export default defineComponent({
  name: "AddCongeModal",
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
  const congeSchema = Yup.object().shape({
    contenu: Yup.string().required("Le contenu est obligatoire"),
    mission: Yup.string().required('La mission est obligatoire'),
  });

  const congeForm = ref<Conge | null>(null);
  const addCongeModalRef = ref<null | HTMLElement>(null);
  // const item = ref({ ...props.item });
  const localItem = ref(props.item);
  const isUPDATE = ref(false);
  const title = ref("Ajouter un conge");
  const btntext = ref('Ajouter');
  const missionOptions = ref([]);

  watch(() => props.item, (newValue) => {
    getConge(newValue);
    isUPDATE.value = true;
    btnTitle();
  });

  const btnTitle = async () => {
    if (isUPDATE.value) {
       title.value = "Modifier le congé";
       btntext.value = "Modifier";
    }else{
       title.value = "Ajouter un congé ";
       btntext.value = "Ajouter";
    }
  }

  const getConge = async (id: number) => {
    return ApiService.get("/conges/"+id)
    .then(({ data }) => {

      const donnees = data.data;
      for (const key in donnees) {
        congeForm.value?.setFieldValue(key, 
        (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
        );
      }
      emit('openmodal', addCongeModalRef.value);

    })
    .catch(({ response }) => {
      error(response.data.message)
    });
  }

  onMounted(()=> {
    fetchMission();
  })

  const fetchMission = async () => {
    try {
      const response = await axios.get('all/missions');
      const missionsData = response.data.data.data;
      missionOptions.value = missionsData.map((mission) => ({
        value: mission.id,
        label: `${mission.description}`,
      }));
    } catch (error) {
      //
    }
  };

  const addConge = async (values: any, congeForm) => {
    values = values as Conge;
    if(isUPDATE.value){
      ApiService.put("/conges/"+values.id,values)
      .then(({ data }) => {
          if(data.code == 200) { 
            success(data.message);
            congeForm.resetForm();
            hideModal(addCongeModalRef.value);
            isUPDATE.value=false;
            btnTitle();
            emit('close');
          }
      })
      .catch(({ response }) => {
          error(response.data.message);
      });
    }else{
      ApiService.post("/conges",values)
      .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            congeForm.resetForm();
            hideModal(addCongeModalRef.value);
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

  return { congeSchema,
    addCongeModalRef,
    addConge,
  congeForm,missionOptions,
    title,btntext,resetValue
  };
},
});
</script>@/models/Conge