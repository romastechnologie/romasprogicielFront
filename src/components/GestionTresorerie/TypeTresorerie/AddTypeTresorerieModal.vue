<template>
  <div class="modal fade" id="AddTypeTresorerieModal" tabindex="-1" role="dialog" ref="addTypeTresorerieModalRef"
    aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ title }}</h4>
          <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <Form ref="typeTresorerieForm" @submit="addTypeTresorerie" :validation-schema="typeTresorerieSchema">
            <div class="row">
              <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Code <span class="text-danger">*</span>
                  </label>
                  <Field name="code" type="text" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Code" />
                  <ErrorMessage name="code" class="text-danger" />
                </div>
              </div>
              <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Libelle <span class="text-danger">*</span>
                  </label>
                  <Field name="libelle" type="text" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le libelle" />
                  <ErrorMessage name="libelle" class="text-danger" />
                </div>
              </div>
              <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Catégorie
                  </label>
                  <Field name="typeTresorerieParent" type="text" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le libelle" as="select">
                    <option :value="typeTresorerie.id" v-for="typeTresorerie in typeTresoreries" 
                      :key="typeTresorerie.id">
                        {{ typeTresorerie.libelle }}
                    </option>
                  </Field>
                  
                </div>
              </div>
              <button class="btn btn-primary" type="submit">
                {{ btntext }}
              </button>
            </div>
          </Form>
        </div>
        <!-- <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Close</button>
                        <button class="btn btn-primary" type="button">Save changes</button>
              </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';
import { useRouter } from 'vue-router';
import { TypeTresorerie } from '@/models/TypeTresorerie';




export default {
  name: "AddTypeTresorerieModal",
  components: {
    Form,
    Field,
    ErrorMessage
  },
  props: {
    id: {
      type: Number,
      required: true,
      default: 0
    },
  },
  emits: ["refreshTypeTresoreries", 'openmodal'],

  setup: (props: any, { emit }: { emit: Function }) => {

    onMounted(() => {
        loading.value = false;
        getAllTypeTresoreries();
    });

    const loading = ref<boolean>(false);

    const typeTresorerieSchema = Yup.object().shape({
      code: Yup.string().required('Le code est obliatoire'),
      libelle: Yup.string().required('Le libellé est obligatoire'),
      typeTresorerieParent:Yup.string().notRequired()
    });


    const typeTresorerienew = ref(props.id);
    const typeTresorerieForm = ref<TypeTresorerie | null>(null);
    const addTypeTresorerieModalRef = ref<null | HTMLElement>(null);
    let typeTresoreries = ref<Array<TypeTresorerie>>([]);
    const title = ref('Ajouter un type de trésorerie');
    const btntext = ref('Ajouter');
    const isupdate = ref(false);
    const router = useRouter();

    watch(() => props.id, (newValue) => {
      if (newValue != 0) {
        getTypeTresorerie(newValue);
        isupdate.value = true;
      }
      btnTitle();
    });

    function getAllTypeTresoreries() {
            return ApiService.get('/typeTresoreries').then((res) => {
                typeTresoreries.value = res.data;
                console.log(typeTresoreries.value,"ffffffff")
            })
              .catch(({ response }) => {
                  error(response.data.message)
              });
        }

    const getTypeTresorerie = async (id: number) => {
      return ApiService.get("/typeTresoreries/" + id)
        .then((res) => {
          typeTresorerieForm.value?.setFieldValue("id", res.data.id);
          typeTresorerieForm.value?.setFieldValue("code", res.data.code);
          typeTresorerieForm.value?.setFieldValue("libelle", res.data.libelle);
          emit('openmodal', addTypeTresorerieModalRef.value);
        })
        .catch(({ response }) => {
          error(response.data.message)
        });
    }

    const btnTitle = async () => {
      if (isupdate.value) {
        title.value = "Modifier le type de trésorerie";
        btntext.value = "Modifier";
      } else {
        title.value = "Ajouter un type de trésorerie";
        btntext.value = "Ajouter";
      }
    }

    const addTypeTresorerie = async (values: any, { resetForm }: { resetForm: () => void }) => {
      values = values as TypeTresorerie;
      loading.value = false;
      if (isupdate.value) {
        console.log(values,"values")
        ApiService.put(`/typeTresoreries/${values.id}`, values)
          .then((res) => {
            if (res.data.code == 200) {
              success(res.data.message);
              resetForm();
              hideModal(addTypeTresorerieModalRef.value);
              isupdate.value = false;
              btnTitle();
              emit("refreshTypeTresoreries");
              //router.push('/typeTresoreries/liste-typeTresorerie');
            }
          }).catch(({ response }) => {
            error(response.message);
          });
      } else {
        ApiService.post("/typeTresoreries", values)
          .then((res) => {
            if (res.data.code == 201) {
              success(res.data.message)
              resetForm();
              hideModal(addTypeTresorerieModalRef.value);
              emit("refreshTypeTresoreries");
            }
          }).catch(({ response }) => {
            console.log(response)
            error(response.message);
          });
      }
    };

    const resetValue = () => {
      const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
      isupdate.value = false;
      formFields.forEach(field => {
        field.value = '';
      });
      btnTitle()
    };
    return {
      typeTresoreries, title, btntext, resetValue, typeTresorerieSchema,
      addTypeTresorerie, typeTresorerieForm, addTypeTresorerieModalRef, typeTresorerienew,
      //refreshMonnaies
    };
  },
};

</script>