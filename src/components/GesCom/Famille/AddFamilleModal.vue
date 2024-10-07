<template>
  <div class="modal fade" id="AddFamilleModal" tabindex="-1" role="dialog" ref="addFamilleModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">{{ title }}</h4>
                <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
          <Form ref="familleForm" @submit="addFamille" :validation-schema="familleSchema">
            <div class="row">
            <div class="col-md-12 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Code famille <span class="text-danger">*</span>
                </label>
                <Field name="codeFamille" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code famille"/>
                <ErrorMessage name="codeFamille" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-12 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Libellé famille <span class="text-danger">*</span>
                </label>
                <Field name="libelleFamille" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libelle famille"/>
                <ErrorMessage name="libelleFamille" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-12 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Parent <span class="text-danger">*</span>
                </label>
                <Field  name="famille"  v-slot="{ field }">
                  <Multiselect
                    :options="familleOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le parent"
                  />
                </Field>  
                <ErrorMessage name="famille" class="text-danger"/>
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
        <!-- <button
          type="button"
          class="btn-close shadow-none"
          data-bs-dismiss="modal"
          aria-label="Close"
          @click="resetValue()"
        ></button> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import ApiService from '@/services/ApiService';
import * as Yup from 'yup';
import { hideModal } from '@/utils/utils';
import { Famille } from '@/models/Famille';
import { error , success } from '@/utils/utils';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "AddFamilleModal",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  props: {
    item: {
      type: Object as () => Famille | null,
      default: null
    }
  },
  setup(props, { emit }){
    const familleSchema = Yup.object().shape({
      famille: Yup.string().notRequired(),
      codeFamille: Yup.string().required('Le code famille est obligatoire'),
      libelleFamille: Yup.string().required('Le libellé famille est obligatoire'),
      //  libelleFamille: Yup.string()
      //   .matches(/^[A-Za-z ]+$/, 'Le libellé famille doit contenir uniquement des lettres alphabétiques')
      //   .required('Le libellé famille est obligatoire'),
    });

    const familleForm = ref<Famille | null>(null);
    const addFamilleModalRef = ref<null | HTMLElement>(null);
    const router = useRouter();
    const familleOptions = ref([]);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter une famille");
    const btntext = ref('Ajouter');

    watch(() => props.item, (newValue) => {
      getFamille(newValue.id);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier la famille";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter une famille";
         btntext.value = "Ajouter";
      }
    }

    const getFamille = async (id: number) => {
      return ApiService.get("/familles/"+id)
      .then(({ data }) => {
        // map data in form
        const donnees = data.data;
        for (const key in donnees) {
          familleForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addFamilleModalRef.value);

      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    const fetchFamille = async () => {
      try {
        const response = await ApiService.get('all/familles');
        const familleData = response.data.data.data;
        familleOptions.value = familleData.map((famille) => ({
          value: famille.id,
          label: `${famille.codeFamille} - ${famille.libelleFamille}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchFamille();
    });
    

    const addFamille = async (values: any, familleForm) => {
      values = values as Famille;
      if(isUPDATE.value){
        console.log('values',values)
        ApiService.put("/familles/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              familleForm.resetForm();
              hideModal(addFamilleModalRef.value);
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
        ApiService.post("/familles",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              familleForm.resetForm();
              hideModal(addFamilleModalRef.value);
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

    return { familleSchema,
      addFamilleModalRef,
      addFamille,
      familleForm,
      title,btntext,resetValue,
      familleOptions,
    };
  },
});
</script>@/models/CategorieInfo