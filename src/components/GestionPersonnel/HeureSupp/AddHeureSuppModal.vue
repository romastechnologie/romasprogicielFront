<template>
  <div
    class="modal fade createNewModal"
    id="AddHeureSuppModal"
    tabindex="-1"
    ref="addHeureSuppModalRef"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
          <Form ref="heureSuppForm" @submit="addHeureSupp" :validation-schema="heureSuppSchema">
            <div class="row">
            <div class="col-md-12 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Date <span class="text-danger">*</span>
                </label>
                <Field name="date" type="date" 
                class="form-control shadow-none fs-md-15 text-black"/>
                <ErrorMessage name="date" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-12 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Personnel <span class="text-danger">*</span>
              </label>
              <Field name="personnel" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="personnelOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner le personnel"
                label="label" track-by="value" />
              </Field>
              <ErrorMessage name="personnel" class="text-danger" />
            </div>
          </div>

            <div class="col-md-12 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                 Duree<span class="text-danger">*</span>
                </label>
                <Field name="duree" type="number" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la duree"/>
                <ErrorMessage name="duree" class="text-danger"/>
              </div>
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
import ApiService from '@/services/ApiService';
import * as Yup from 'yup';
import { HeureSupp } from '@/models/HeureSupp';
import { error , success,hideModal } from '@/utils/utils';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';
  

export default defineComponent({
    name: "AddHeureSuppModal",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  props: {
    item: {
      type: Number,
      default: 0,
    }
  },
  setup(props, { emit }){
    const heureSuppSchema = Yup.object().shape({
      date: Yup.string().required('La date est obligatoire'),
      personnel: Yup.string().required("Le personnel est obligatoire."),
      duree: Yup.number().required("La duree est obligatoire."),


    });

    const heureSuppForm = ref<HeureSupp | null>(null);
    const addHeureSuppModalRef = ref<null | HTMLElement>(null);
    const router = useRouter();
    const heureSuppOptions = ref([]);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter une heureSupp");
    const btntext = ref('Ajouter');
    const personnels = ref();
      const personnel = ref();
      
    const personnelOptions = ref();

    watch(() => props.item, (newValue) => {
      getHeureSupp(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier le type de taxe";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter un type de taxe";
         btntext.value = "Ajouter"
      }
    }

    const getHeureSupp = async (id: number) => {
      return ApiService.get("/heureSups/"+id)
      .then(({ data }) => {
        // map data in form
        const donnees = data.data;
        for (const key in donnees) {
          heureSuppForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addHeureSuppModalRef.value);

      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    const fetchHeureSupp = async () => {
      try {
        const response = await ApiService.get('/heureSups');
        const heureSuppData = response.data.data.data;
        heureSuppOptions.value = heureSuppData.map((heureSupp) => ({
          value: heureSupp.id,
          label: `${heureSupp.codeHeureSupp} - ${heureSupp.libelleHeureSupp}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchHeureSupp();
      getAllPersonnels();
    });

    const getAllPersonnels = async () => {
        try{
        const response = await ApiService.get('all/personnels');
        const personnelsData = response.data.data.data;
        console.log('Data', personnelsData)
        personnelOptions.value = personnelsData.map((personnel) => ({
          value: personnel.id,
          label: personnel.nom + " " + personnel.prenom,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      }

    const addHeureSupp = async (values: any, heureSuppForm) => {
      values = values as HeureSupp;
      if(isUPDATE.value){
        ApiService.put("/heureSups/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              heureSuppForm.resetForm();
              hideModal(addHeureSuppModalRef.value);
              isUPDATE.value=false;
              btnTitle();
              emit('close');
            }
        })
        .catch(({ response }) => {
            error(response.data.message);
        });
      }else{
        console.log('values',values)
        ApiService.post("/heureSups",values)
        .then(({ data }) => {
          console.log("donnée", data);
            if(data.code == 201) { 
              success(data.message);
              heureSuppForm.resetForm();
              hideModal(addHeureSuppModalRef.value);
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

    return { heureSuppSchema,
      addHeureSuppModalRef,
      addHeureSupp,
      heureSuppForm,
      title,btntext,resetValue,
      heureSuppOptions,personnelOptions

    };
  },
});
</script>@/models/CategorieInfo