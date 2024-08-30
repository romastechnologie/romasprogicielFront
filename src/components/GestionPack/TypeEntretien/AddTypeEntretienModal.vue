<template>
  <div class="modal fade" id="AddTypeEntretienModal" tabindex="-1" role="dialog" ref="addTypeEntretienModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
          <Form ref="typeEntretienForm" @submit="addTypeEntretien" :validation-schema="typeEntretienSchema">
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
                  Description <span class="text-danger">*</span>
                </label>
                <Field name="description" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le valeur typeEntretien"/>
                <ErrorMessage name="description" class="text-danger"/>
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
import { TypeEntretien } from '@/models/TypeEntretien';
import { error , success } from '@/utils/utils';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: "AddTypeEntretienModal",
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
    const typeEntretienSchema = Yup.object().shape({
      libelle: Yup.string().required('Le libellé est obligatoire'),
      description: Yup.string().required('La description est obligatoire'),

    });

    const typeEntretienForm = ref<TypeEntretien | null>(null);
    const addTypeEntretienModalRef = ref<null | HTMLElement>(null);
    const router = useRouter();
    const typeEntretienOptions = ref([]);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un typeEntretien");
    const btntext = ref('Ajouter');

    watch(() => props.item, (newValue) => {
      getTypeEntretien(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier le typeEntretien";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter un typeEntretien";
         btntext.value = "Ajouter";
      }
    }

    const getTypeEntretien = async (id: number) => {
      return ApiService.get("/typeEntretiens/"+id)
      .then(({ data }) => {
        // map data in form
        const donnees = data.data;
        for (const key in donnees) {
          typeEntretienForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addTypeEntretienModalRef.value);

      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    const fetchTypeEntretien = async () => {
      try {
        const response = await ApiService.get('/typeEntretiens');
        const typeEntretienData = response.data.data.data;
        typeEntretienOptions.value = typeEntretienData.map((typeEntretien) => ({
          value: typeEntretien.id,
          label: `${typeEntretien.codeTypeEntretien} - ${typeEntretien.libelleTypeEntretien}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchTypeEntretien();
    });

    const addTypeEntretien = async (values: any, typeEntretienForm) => {
      values = values as TypeEntretien;
      if(isUPDATE.value){
        ApiService.put("/typeEntretiens/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              typeEntretienForm.resetForm();
              hideModal(addTypeEntretienModalRef.value);
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
        ApiService.post("/typeEntretiens",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              typeEntretienForm.resetForm();
              hideModal(addTypeEntretienModalRef.value);
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

    return { typeEntretienSchema,
      addTypeEntretienModalRef,
      addTypeEntretien,
      typeEntretienForm,
      title,btntext,resetValue,
      typeEntretienOptions,
    };
  },
});
</script>@/models/CategorieInfo