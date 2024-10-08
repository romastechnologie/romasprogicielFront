<template>
  <div class="modal fade" id="AddMonnaieModal" tabindex="-1" role="dialog" ref="addMonnaieModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
          <Form ref="monnaieForm" @submit="addMonnaie" :validation-schema="monnaieSchema">
            <div class="row">
            <div class="col-md-6 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Libellé <span class="text-danger">*</span>
                </label>
                <Field name="libelle" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libelle"/>
                <ErrorMessage name="libelle" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Valeur monnaie <span class="text-danger">*</span>
                </label>
                <Field name="valeur" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le valeur monnaie"/>
                <ErrorMessage name="valeur" class="text-danger"/>
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
      valeur: Yup.number().typeError('Vueillez entrer des chiffres').required("La valeur monnaie est obligatoire"),
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