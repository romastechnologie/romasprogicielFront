<template>
  <div class="modal fade" id="AddTypeEmplacementModal" tabindex="-1" role="dialog" ref="addTypeEmplacementModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
          <Form ref="typeEmplacementForm" @submit="addTypeEmplacement" :validation-schema="typeEmplacementSchema">
            <div class="row">
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Code <span class="text-danger">*</span>
                </label>
                <Field name="code" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code"/>
                <ErrorMessage name="code" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Libellé <span class="text-danger">*</span>
                </label>
                <Field name="libelle" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libellé"/>
                <ErrorMessage name="libelle" class="text-danger"/>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Préfixe <span class="text-danger">*</span>
                </label>
                <Field name="prefixe" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le Préfixe"/>
                <ErrorMessage name="prefixe" class="text-danger"/>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Ordre <span class="text-danger">*</span>
                </label>
                <Field name="ordre" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'ordre"/>
                <ErrorMessage name="ordre" class="text-danger"/>
              </div>
            </div>

            <div class="col-md-12 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Type Emplacement <span class="text-danger">*</span>
                </label>
                <Field name="typesemplacements" v-slot="{ field }">
                  <Multiselect v-model="field.value" v-bind="field" :options="typeEmplacementOptions"
                    :preserve-search="true" :multiple="false" :searchable="true"
                    placeholder="Sélectionner le type Emplacement" label="label" track-by="label" />
                </Field>
                <ErrorMessage name="typesemplacements" class="text-danger" />
              </div>
            </div>

            <button
              class="btn btn-primary mt-3"
            >
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
import { error , success } from '@/utils/utils';
import { useRouter } from 'vue-router';
import { TypeEmplacement } from '@/models/TypeEmplacement';
import Multiselect from '@vueform/multiselect/src/Multiselect';


export default defineComponent({
    name: "AddTypeEmplacementModal",
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
    const typeEmplacementSchema = Yup.object().shape({
      code: Yup.string().required('Le code est obligatoire'),
      libelle: Yup.string().required('Le libellé est obligatoire'),
      prefixe: Yup.string().required('Le sort final est obligatoire'),
      ordre: Yup.string().required('La durée conservation est obligatoire'),
      typesemplacements: Yup.string().notRequired(),
      

    });

    const typeEmplacementForm = ref<TypeEmplacement | null>(null);
    const addTypeEmplacementModalRef = ref<null | HTMLElement>(null);
    const router = useRouter();
    const typeEmplacementOptions = ref([]);
    const typesemplacements = ref();
    
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un Type Emplacement");
    const btntext = ref('Ajouter');

    watch(() => props.item, (newValue) => {
      getTypeEmplacement(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier le Type Emplacement";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter un Type Emplacement";
         btntext.value = "Ajouter";
      }
    }

    const getTypeEmplacement = async (id: number) => {
      return ApiService.get("/typeEmplacements/"+id)
      .then(({ data }) => {
        // map data in form
        const donnees = data.data;
        for (const key in donnees) {
          typeEmplacementForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addTypeEmplacementModalRef.value);
      
      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }
    
    const fetchTypeEmplacement = async () => {
      try {
        const response = await ApiService.get('/all/typeEmplacements');
        const typeEmplacementData = response.data.data.data;
        typeEmplacementOptions.value = typeEmplacementData.map((typeEmplacement) => ({
          value: typeEmplacement.id,
          label: `${typeEmplacement.codeTypeEmplacement} - ${typeEmplacement.libelleTypeEmplacement}`,
        }));
      } catch (error) {
        //
      }
    };

    const getAllTypeEmplacements = async () => {
    try {
      const response = await ApiService.get('all/typeEmplacements');
      const typeEmplacementsData = response.data.data.data;
      console.log('Data', typeEmplacementsData)
      typeEmplacementOptions.value = typeEmplacementsData.map((typeEmplacement) => ({
        value: typeEmplacement.id,
        label: typeEmplacement.libelle,
      }));
    }
    catch (error) {
      //error(response.data.message)
    }
  }


    onMounted(() => {
      fetchTypeEmplacement();
      getAllTypeEmplacements();
    });

    const addTypeEmplacement = async (values: any, typeEmplacementForm) => {
      values = values as TypeEmplacement;
      if(isUPDATE.value){
        ApiService.put("/typeEmplacements/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              typeEmplacementForm.resetForm();
              hideModal(addTypeEmplacementModalRef.value);
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
        ApiService.post("/typeEmplacements/",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              typeEmplacementForm.resetForm();
              hideModal(addTypeEmplacementModalRef.value);
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

    return { typeEmplacementSchema,
      addTypeEmplacementModalRef,
      addTypeEmplacement,
      typeEmplacementForm,
      title,btntext,resetValue,
      typeEmplacementOptions,
      typesemplacements,
      
    };
  },
});
</script>