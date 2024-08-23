<template>
  <div
    class="modal fade createNewModal"
    id="AddGroupeTaxeModal"
    tabindex="-1"
    ref="addGroupeTaxeModalRef"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">{{ title }}</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <Form ref="groupeTaxeForm" @submit="addGroupeTaxe" :validation-schema="groupeTaxeSchema">
            <div class="row">
              <div class="col-md-12">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Code <span class="text-danger">*</span>
                </label>
                <Field name="code" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code"/>
                <ErrorMessage name="code" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Libelle <span class="text-danger">*</span>
                </label>
                <Field name="libelle" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libelle"/>
                <ErrorMessage name="libelle" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Taux <span class="text-danger">*</span>
              </label>
              <Field name="taux" v-model="taux" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="taxeOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner le taxe"
                label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">Le taxe est obligatoire</span>
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
import { GroupeTaxe } from '@/models/GroupeTaxe';
import { error , success } from '@/utils/utils';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect'


export default defineComponent({
    name: "AddGroupeTaxeModal",
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
    const groupeTaxeSchema = Yup.object().shape({
      code: Yup.string().required('Le code est obligatoire'),
      libelle: Yup.string().required('Le libelle est obligatoire'),
      taux: Yup.number().required('Le taxe est obligatoire'),

    });

    const groupeTaxeForm = ref<GroupeTaxe | null>(null);
    const addGroupeTaxeModalRef = ref<null | HTMLElement>(null);
    const router = useRouter();
    const groupeTaxeOptions = ref([]);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un groupe de taxe");
    const btntext = ref('Ajouter');
    const taxeOptions = ref([]);

    watch(() => props.item, (newValue) => {
      getGroupeTaxe(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier le groupe de taxe";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter un groupe de taxe";
         btntext.value = "Ajouter"
      }
    }

    const getGroupeTaxe = async (id: number) => {
      return ApiService.get("/groupeTaxes/"+id)
      .then(({ data }) => {
        // map data in form
        const donnees = data.data;
        for (const key in donnees) {
          groupeTaxeForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addGroupeTaxeModalRef.value);

      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }


    const getAllTaxes = async () => {
        try{
        const response = await ApiService.get('/all/taxes');
        const taxesData = response.data.data;

        taxeOptions.value = taxesData.map((taxe) => ({
          value: taxe.id,
          label: taxe.libelle,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 

    const fetchGroupeTaxe = async () => {
      try {
        const response = await ApiService.get('/groupeTaxes');
        const groupeTaxeData = response.data.data.data;
        groupeTaxeOptions.value = groupeTaxeData.map((groupeTaxe) => ({
          value: groupeTaxe.id,
          label: `${groupeTaxe.code} - ${groupeTaxe.libelle}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchGroupeTaxe();
      getAllTaxes();
    });

    const addGroupeTaxe = async (values: any, groupeTaxeForm) => {
      values = values as GroupeTaxe;
      if(isUPDATE.value){
        ApiService.put("/groupeTaxes/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              groupeTaxeForm.resetForm();
              hideModal(addGroupeTaxeModalRef.value);
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
        ApiService.post("/groupeTaxes",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              groupeTaxeForm.resetForm();
              hideModal(addGroupeTaxeModalRef.value);
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

    return { groupeTaxeSchema,
      addGroupeTaxeModalRef,
      addGroupeTaxe,
      groupeTaxeForm,
      title,btntext,resetValue,
      groupeTaxeOptions,
      taxeOptions,
    };
  },
});
</script>@/models/CategorieInfo