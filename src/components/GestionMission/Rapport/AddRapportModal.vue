<template>

    <div class="modal fade" id="AddRapportModal" tabindex="-1" role="dialog" ref="addRapportModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="rapport">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <Form ref="typeForm" @submit="addRapport" :validation-schema="rapportSchema">
                        <div class="row">
                          <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                               Contenue <span class="text-danger">*</span>
                              </label>
                              <Field name="contenue"  cols="20"
                              rows="3" as="textarea" 
                              style="width: 100%; height: 150px;" 
                              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le Contenue"/>
                              <ErrorMessage name="contenue" class="text-danger"/>
                            </div>     
                          </div>


                          <div class="col-md-12 mb-3">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Mission <span class="text-danger">*</span>
                    </label>
                    <Field  name="mission"  v-slot="{ field }">
                      <Multiselect
                        :options="missionOptions"
                        :searchable="true"
                        track-by="label"
                        label="label"
                        v-model = "field.value"
                        v-bind = "field"
                        placeholder="Sélectionner la mission"
                      />
                    </Field>  
                  </div>
                  <ErrorMessage name="mission" class="text-danger"/>
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
import { Rapport } from '@/models/Rapport';
import Multiselect from '@vueform/multiselect'
import axios from 'axios';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';

export default defineComponent({
    name: "AddRapportModal",
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
    const rapportSchema = Yup.object().shape({
      contenue: Yup.string().required("Le contenu est obligatoire"),
      mission: Yup.string().required('La mission est obligatoire'),
    });

    const rapportForm = ref<Rapport | null>(null);
    const addRapportModalRef = ref<null | HTMLElement>(null);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un rapport");
    const btntext = ref('Ajouter');
    const missionOptions = ref([]);

    watch(() => props.item, (newValue) => {
      getRapport(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier le rapport";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter un rapport ";
         btntext.value = "Ajouter";
      }
    }

    const getRapport = async (id: number) => {
      return ApiService.get("/rapportMissions/"+id)
      .then(({ data }) => {

        const donnees = data.data;
        for (const key in donnees) {
          rapportForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addRapportModalRef.value);

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

    const addRapport = async (values: any, rapportForm) => {
      values = values as Rapport;
      if(isUPDATE.value){
        ApiService.put("rapportMissions/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              rapportForm.resetForm();
              hideModal(addRapportModalRef.value);
              isUPDATE.value=false;
              btnTitle();
              emit('close');
            }
        })
        .catch(({ response }) => {
            error(response.data.message);
        });
      }else{
        ApiService.post("/rapportMissions",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              rapportForm.resetForm();
              hideModal(addRapportModalRef.value);
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

    return { rapportSchema,
      addRapportModalRef,
      addRapport,
    rapportForm,missionOptions,
      title,btntext,resetValue
    };
  },
});
</script>@/models/Rapport