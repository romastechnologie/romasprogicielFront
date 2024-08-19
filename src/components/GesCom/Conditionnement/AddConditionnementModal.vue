<template>
  <div class="modal fade" id="AddConditionnementModal" tabindex="-1" role="dialog" ref="addConditionnementModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
          <Form ref="conditionnementForm" @submit="addConditionnement" :validation-schema="conditionnementSchema">
            <div class="row">
              <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Code <span class="text-danger">*</span>
                </label>
                <Field name="code" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code"/>
                <ErrorMessage name="code" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Libellé <span class="text-danger">*</span>
                </label>
                <Field name="libelle" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libelle"/>
                <ErrorMessage name="libelle" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Valeur 
                </label>
                <Field name="valeur" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la valeur"/>
                <ErrorMessage name="valeur" class="text-danger"/>
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
import { Conditionnement } from '@/models/Conditionnement';
import { error , success } from '@/utils/utils';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: "AddConditionnementModal",
    components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    item: {
      type: Number,
      default: 0,
    }
  },
  setup(props, { emit }){
    const conditionnementSchema = Yup.object().shape({
      code: Yup.string().required('Le code est obligatoire'),
      libelle: Yup.string().required('Le libelle est obligatoire'),
      valeur: Yup.number().typeError('Veuillez entrer des nombres').notRequired(),
    });

    const conditionnementForm = ref<Conditionnement | null>(null);
    const addConditionnementModalRef = ref<null | HTMLElement>(null);
    const router = useRouter();
    const conditionnementOptions = ref([]);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un conditionnement");
    const btntext = ref('Ajouter');

    watch(() => props.item, (newValue) => {
      getConditionnement(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier le conditionnement";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter un conditionnement";
         btntext.value = "Ajouter"
      }
    }

    const getConditionnement = async (id: number) => {
      return ApiService.get("/conditionnements/"+id)
      .then(({ data }) => {
        // map data in form
        const donnees = data.data;
        for (const key in donnees) {
          conditionnementForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addConditionnementModalRef.value);

      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    const fetchConditionnement = async () => {
      try {
        const response = await ApiService.get('/conditionnements');
        const conditionnementData = response.data.data.data;
        conditionnementOptions.value = conditionnementData.map((conditionnement) => ({
          value: conditionnement.id,
          label: `${conditionnement.codeConditionnement} - ${conditionnement.libelleConditionnement}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchConditionnement();
    });

    const addConditionnement = async (values: any, conditionnementForm) => {
      values = values as Conditionnement;
      if(isUPDATE.value){
        ApiService.put("/conditionnements/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              conditionnementForm.resetForm();
              hideModal(addConditionnementModalRef.value);
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
        ApiService.post("/conditionnements",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              conditionnementForm.resetForm();
              hideModal(addConditionnementModalRef.value);
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

    return { conditionnementSchema,
      addConditionnementModalRef,
      addConditionnement,
      conditionnementForm,
      title,btntext,resetValue,
      conditionnementOptions,
    };
  },
});
</script>@/models/CategorieInfo