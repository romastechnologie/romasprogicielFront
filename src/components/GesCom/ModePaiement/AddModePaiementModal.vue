<template>
  <div class="modal fade" id="AddModePaiementModal" tabindex="-1" role="dialog" ref="addModePaiementModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">{{ title }}</h4>
                <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
          <Form ref="modePaiementForm" @submit="addModePaiement" :validation-schema="modePaiementSchema">
            <div class="row">
              <div class="col-md-12 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Code <span class="text-danger">*</span>
                </label>
                <Field name="code" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code"/>
                <ErrorMessage name="code" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-12 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Libelle <span class="text-danger">*</span>
                </label>
                <Field name="libelle" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libelle"/>
                <ErrorMessage name="libelle" class="text-danger"/>
              </div>
            </div>
            <button
              class="btn btn-primary"
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
import { ModePaiement } from '@/models/ModePaiement';
import { error , success } from '@/utils/utils';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "AddModePaiementModal",
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
    const modePaiementSchema = Yup.object().shape({
      code: Yup.string().required('Le code est obligatoire'),
      libelle: Yup.string().required('Le libelle est obligatoire'),
    });

    const modePaiementForm = ref<ModePaiement | null>(null);
    const addModePaiementModalRef = ref<null | HTMLElement>(null);
    const router = useRouter();
    const modePaiementOptions = ref([]);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un mode de paiement");
    const btntext = ref('Ajouter');
    const clientOptions = ref([]);

    watch(() => props.item, (newValue) => {
      getModePaiement(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier le mode de paiement";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter un mode de paiement";
         btntext.value = "Ajouter"
      }
    }

    const getModePaiement = async (id: number) => {
      return ApiService.get("/modepaiements/"+id)
      .then(({ data }) => {
        // map data in form
        const donnees = data.data;
        for (const key in donnees) {
          modePaiementForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addModePaiementModalRef.value);

      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    // const fetchModePaiement = async () => {
    //   try {
    //     const response = await ApiService.get('/adresselivraisons');
    //     const modePaiementData = response.data.data.data;
    //     modePaiementOptions.value = modePaiementData.map((modePaiement) => ({
    //       value: modePaiement.id,
    //       label: `${modePaiement.codeModePaiement} - ${modePaiement.libelleModePaiement}`,
    //     }));
    //   } catch (error) {
    //     //
    //   }
    // };

    const addModePaiement = async (values: any, modePaiementForm) => {
      values = values as ModePaiement;
      if(isUPDATE.value){
        ApiService.put("/modepaiements/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              modePaiementForm.resetForm();
              hideModal(addModePaiementModalRef.value);
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
        ApiService.post("/modepaiements",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              modePaiementForm.resetForm();
              hideModal(addModePaiementModalRef.value);
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

    return { modePaiementSchema,
      addModePaiementModalRef,
      addModePaiement,
      modePaiementForm,
      title,btntext,resetValue,
      modePaiementOptions,clientOptions
    };
  },
});
</script>@/models/CategorieInfo