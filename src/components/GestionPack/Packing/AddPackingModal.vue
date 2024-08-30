<template>
  <div class="modal fade" id="AddPackingModal" tabindex="-1" role="dialog" ref="addPackingModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
          <Form ref="packingForm" @submit="addPacking" :validation-schema="packingSchema">
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
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom du packing"/>
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
import { Packing } from '@/models/Packing';
import { error , success } from '@/utils/utils';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: "AddPackingModal",
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
    const packingSchema = Yup.object().shape({
      libelle: Yup.string().required('Le libellé est obligatoire'),
      description: Yup.string().required('La description est obligatoire'),

    });
  
    const packingForm = ref<Packing | null>(null);
    const addPackingModalRef = ref<null | HTMLElement>(null);
    const router = useRouter();
    const packingOptions = ref([]);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un packing");
    const btntext = ref('Ajouter');

    watch(() => props.item, (newValue) => {
      getPacking(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier le packing";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter un packing";
         btntext.value = "Ajouter";
      }
    }

    const getPacking = async (id: number) => {
      return ApiService.get("/packings/"+id)
      .then(({ data }) => {
        // map data in form
        const donnees = data.data;
        for (const key in donnees) {
          packingForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addPackingModalRef.value);

      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    const fetchPacking = async () => {
      try {
        const response = await ApiService.get('/packings');
        const packingData = response.data.data.data;
        packingOptions.value = packingData.map((packing) => ({
          value: packing.id,
          label: `${packing.codePacking} - ${packing.libellePacking}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchPacking();
    });

    const addPacking = async (values: any, packingForm) => {
      values = values as Packing;
      if(isUPDATE.value){
        console.log('modification',values.id);
        ApiService.put("/packings/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              packingForm.resetForm();
              hideModal(addPackingModalRef.value);
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
        ApiService.post("/packings",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              packingForm.resetForm();
              hideModal(addPackingModalRef.value);
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

    return { packingSchema,
      addPackingModalRef,
      addPacking,
      packingForm,
      title,btntext,resetValue,
      packingOptions,
    };
  },
});
</script>@/models/CategorieInfo