<template>
  <div
    class="modal fade createNewModal"
    id="AddMonnaieModal"
    tabindex="-1"
    ref="addMonnaieModalRef"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">{{ title }}</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <Form ref="monnaieForm" @submit="addMonnaie" :validation-schema="monnaieSchema">
            <div class="row">
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Libellé <span class="text-danger">*</span>
                </label>
                <Field name="libelle" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libelle"/>
                <ErrorMessage name="libelle" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Valeur monnaie <span class="text-danger">*</span>
                </label>
                <Field name="valeurMonnaie" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le valeur monnaie"/>
                <ErrorMessage name="valeurMonnaie" class="text-danger"/>
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
import { Monnaie } from '@/models/Monnaie';
import { error , success } from '@/utils/utils';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: "AddMonnaieModal",
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
    const monnaieSchema = Yup.object().shape({
      valeurMonnaie: Yup.number().typeError('Vueillez entrer des chiffres').required("La valeur monnaie est obligatoire"),
      libelle: Yup.string().required('Le libellé monnaie est obligatoire'),
    });

    const monnaieForm = ref<Monnaie | null>(null);
    const addMonnaieModalRef = ref<null | HTMLElement>(null);
    const router = useRouter();
    const monnaieOptions = ref([]);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter une monnaie");
    const btntext = ref('Ajouter');

    watch(() => props.item, (newValue) => {
      getMonnaie(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier la monnaie";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter une monnaie";
         btntext.value = "Ajouter";
      }
    }

    const getMonnaie = async (id: number) => {
      return ApiService.get("/monnaies/"+id)
      .then(({ data }) => {
        // map data in form
        const donnees = data.data;
        for (const key in donnees) {
          monnaieForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addMonnaieModalRef.value);

      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    const fetchMonnaie = async () => {
      try {
        const response = await ApiService.get('/monnaies');
        const monnaieData = response.data.data.data;
        monnaieOptions.value = monnaieData.map((monnaie) => ({
          value: monnaie.id,
          label: `${monnaie.codeMonnaie} - ${monnaie.libelleMonnaie}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchMonnaie();
    });

    const addMonnaie = async (values: any, monnaieForm) => {
      values = values as Monnaie;
      if(isUPDATE.value){
        ApiService.put("/monnaies/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              monnaieForm.resetForm();
              hideModal(addMonnaieModalRef.value);
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
        ApiService.post("/monnaies",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              monnaieForm.resetForm();
              hideModal(addMonnaieModalRef.value);
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

    return { monnaieSchema,
      addMonnaieModalRef,
      addMonnaie,
      monnaieForm,
      title,btntext,resetValue,
      monnaieOptions,
    };
  },
});
</script>@/models/CategorieInfo