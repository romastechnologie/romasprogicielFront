<template>

<div class="modal fade" id="AddTaxeModal" tabindex="-1" role="dialog" ref="addTaxeModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
          <Form ref="taxeForm" @submit="addTaxe" :validation-schema="taxeSchema">
            <div class="row">
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Code taxe <span class="text-danger">*</span>
                </label>
                <Field name="codeTaxe" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Ex: TVA"/>
                <ErrorMessage name="codeTaxe" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Libellé <span class="text-danger">*</span>
                </label>
                <Field name="libelleTaxe" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Ex: Taxe sur Valeur Ajoutée"/>
                <ErrorMessage name="libelleTaxe" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Appelation <span class="text-danger">*</span>
                </label>
                <Field name="appelation" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Ex: TVA"/>
                <ErrorMessage name="appelation" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Type de taux <span class="text-danger">*</span>
                </label>
                <Field  name="taux"  v-slot="{ field }">
                  <Multiselect
                    :options="typeTaxeOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le type de taux"
                  />
                </Field>  
                <ErrorMessage name="taux" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Valeur taxe <span class="text-danger">*</span>
                </label>
                <Field name="valeurTaxe" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Ex: 18"/>
                <ErrorMessage name="valeurTaxe" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Sens <span class="text-danger">*</span>
              </label>
              <Field  name="sens"  type="text"  v-slot="{ field }">
                <Multiselect
                  :searchable = "true"
                  :options = "['Déductible', 'Collecté']"
                  v-model = "field.value"
                  v-bind = "field"
                  placeholder="Sélectionner le sens"
                />
              </Field>
                <ErrorMessage name="sens" class="text-danger"/>
            </div>
          </div>
            <button
              class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
              type="submit"
            >
            {{ btntext }}
            </button>
      </div>
        </Form>
        </div>
        <button
          type="button"
          class="btn-close shadow-none"
          data-bs-dismiss="modal"
          aria-label="Close"
          @click="resetValue()"
        ></button>
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
import { Taxe } from '@/models/Taxe';
import { error , success } from '@/utils/utils';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "AddTaxeModal",
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
    const taxeSchema = Yup.object().shape({
      taux: Yup.string().notRequired(),
      valeurTaxe: Yup.number().typeError('Veuillez entrer des chiffres').required('La valeur taxe est obligatoire'),
       codeTaxe: Yup.string().required('Le code taxe est obligatoire'),
       libelle: Yup.string().required('L\'intitulé est obligatoire'),
       appellation: Yup.string().required('L\'appelation est obligatoire'),
       sens: Yup.string().required('Le sens est obligatoire'),

    });

    const taxeForm = ref<Taxe | null>(null);
    const addTaxeModalRef = ref<null | HTMLElement>(null);
    const router = useRouter();
    const typeTaxeOptions = ref([]);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter une taxe");
    const btntext = ref('Ajouter');

    watch(() => props.item, (newValue) => {
      getTaxe(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier la taxe";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter une taxe";
         btntext.value = "Ajouter";
      }
    }

    const getTaxe = async (id: number) => {
      return ApiService.get("/taxes/"+id)
      .then(({ data }) => {
        // map data in form
        const donnees = data.data;
        for (const key in donnees) {
          taxeForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addTaxeModalRef.value);

      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    const fetchTaxe = async () => {
      try {
        const response = await ApiService.get('/typeTaxes');
        const typeTaxeData = response.data.data.data;
        typeTaxeOptions.value = typeTaxeData.map((typeTaxe) => ({
          value: typeTaxe.id,
          label: `${typeTaxe.libelleType}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchTaxe();
    });

    const addTaxe = async (values: any, taxeForm) => {
      values = values as Taxe;
      if(isUPDATE.value){
        ApiService.put("/taxes/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              taxeForm.resetForm();
              hideModal(addTaxeModalRef.value);
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
        ApiService.post("/taxes",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              taxeForm.resetForm();
              hideModal(addTaxeModalRef.value);
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

    return { taxeSchema,
      addTaxeModalRef,
      addTaxe,
      taxeForm,
      title,btntext,resetValue,
      typeTaxeOptions,
    };
  },
});
</script>@/models/CategorieInfo