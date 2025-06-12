<template>
  <div class="modal fade" id="AddModeleContratModal" tabindex="-1" role="dialog" ref="addModeleContratModalRef"
    aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ title }}</h4>
          <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <Form ref="modeleContratForm" @submit="addModeleContrat" :validation-schema="modeleContratSchema">
            <div class="row">
              <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Description du Modèle <span class="text-danger">*</span>
                  </label>
                  <Editor
                    v-model="description"
                    :init="{
                      height: 300,
                      menubar: false,
                      plugins: 'lists link image table code',
                      toolbar: 'undo redo | bold italic underline | bullist numlist | link image | table | code',
                      content_style: 'body { font-family: Sans Serif; font-size: 14px; }'
                    }"
                    api-key="votre-api-key-ici"
                  />
                  <div v-if="descriptionError" class="text-danger">{{ descriptionError }}</div>
                </div>
              </div>

              <div class="col-md-6 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Duree Defaut <span class="text-danger">*</span>
                  </label>
                  <Field name="dureeDefaut" type="number" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer la durée defaut" />
                  <ErrorMessage name="dureeDefaut" class="text-danger" />
                </div>
              </div>

              <div class="col-md-6 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Salaire de Base par Defaut <span class="text-danger">*</span>
                  </label>
                  <Field name="salaireBaseDefaut" type="text" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le salaire de base defaut" />
                  <ErrorMessage name="salaireBaseDefaut" class="text-danger" />
                </div>
              </div>
              
              <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Conditions Spécifiques <span class="text-danger">*</span>
                  </label>
                  <Field name="conditionsSpecifiques" as="textarea" class="form-control shadow-none fs-md-15 text-black" 
                    placeholder="Entrer les conditions spécifiques" rows="4" />
                  <ErrorMessage name="conditionsSpecifiques" class="text-danger" />
                </div>
              </div>
              <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Type Contrat <span class="text-danger">*</span>
                  </label>
                  <Field name="typeContratId" v-slot="{ field }">
                    <Multiselect
                      v-model="field.value"
                      v-bind="field"
                      :options="typeContratOptions"
                      :preserve-search="true"
                      :multiple="false"
                      :searchable="true"
                      placeholder="Sélectionner le typeContrat"
                      label="label"
                      track-by="label"
                      :value="typeContrat"
                      @update:modelValue="typeContrat = $event"
                    />
                  </Field>
                  <ErrorMessage name="typeContratId" class="text-danger" />
                </div>
              </div>
             
              <button class="btn btn-primary" type="submit">
                {{ btntext }}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';
import { ModeleContrat } from '@/models/ModeleContrat';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';
import Editor from '@tinymce/tinymce-vue';

export default {
  name: "AddModeleContratModal",
  components: {
    Form,
    Field,
    Editor,
    ErrorMessage,
    Multiselect
    
  },
  props: {
    id: {
      type: Number,
      required: true,
      default: 0
    },
  },
  emits: ["refreshModeleContrats", 'openmodal'],

  setup: (props: any, { emit }: { emit: Function }) => {
    const loading = ref<boolean>(false);
    const description = ref('');
    const descriptionError = ref('');
    const typeContrat = ref(null);

    const modeleContratSchema = Yup.object().shape({
      dureeDefaut: Yup.number().required("la duree est obligatoire."),
      salaireBaseDefaut: Yup.number().required("le salaire de base est obligatoire."),
      conditionsSpecifiques: Yup.string().required("Les conditions specifiques sont obligatoires."),
      typeContratId: Yup.number().required("Le type de contrat est obligatoire."),
    });

    onMounted(() => {
      getAllTypeContrat();
    });

    const modeleContratnew = ref(props.id);
    const modeleContratForm = ref<InstanceType<typeof Form> | null>(null);
    const addModeleContratModalRef = ref<null | HTMLElement>(null);
    let modeleContrats = ref<Array<ModeleContrat>>([]);
    const title = ref('Ajouter un modele contrat');
    const typeContratOptions = ref([]);
    const btntext = ref('Ajouter');
    const isupdate = ref(false);
    const router = useRouter();

    watch(() => props.id, (newValue) => {
      if (newValue !== 0) {
        getModeleContrat(newValue);
        isupdate.value = true;
      }
      btnTitle();
    });

    const getModeleContrat = async (id: number) => {
      try {
        const { data } = await ApiService.get("/modeleContrats/" + id);
        if (modeleContratForm.value) {
          modeleContratForm.value.setFieldValue("id", data.data.id);
          modeleContratForm.value.setFieldValue("dureeDefaut", data.data.dureeDefaut);
          modeleContratForm.value.setFieldValue("salaireBaseDefaut", data.data.salaireBaseDefaut);
          modeleContratForm.value.setFieldValue("conditionsSpecifiques", data.data.conditionsSpecifiques);
          modeleContratForm.value.setFieldValue("typeContratId", data.data.typeContrat?.id || null);
          description.value = data.data.description || '';
          typeContrat.value = data.data.typeContrat?.id || null;
          emit('openmodal', addModeleContratModalRef.value);
        }
      } catch ({ response }) {
        error(response?.data?.message || 'Erreur lors de la récupération du modèle contrat');
      }
    };

    const getAllTypeContrat = async () => {
      try {
        const response = await ApiService.get('/all/typeContrats');
        const typeData: any[] = response.data.data.data;
        typeContratOptions.value = typeData.map((mode) => ({
          value: mode.id,
          label: mode.libelle,
        }));
      } catch (error) {
        console.error('Error fetching type contrat:', error);
      }
    };

    const btnTitle = () => {
      if (isupdate.value) {
        title.value = "Modifier le modele contrat";
        btntext.value = "Modifier";
      } else {
        title.value = "Ajouter un modele contrat";
        btntext.value = "Ajouter";
      }
    };

    const addModeleContrat = async (values: any, { resetForm }: { resetForm: () => void }) => {
      // Validation manuelle pour description
      if (!description.value) {
        descriptionError.value = "La description est obligatoire.";
        return;
      }
      descriptionError.value = '';

      const payload = {
        ...values,
        typeContratId: typeContrat.value, // Envoie uniquement l'ID
        description: description.value, // Ajoute la description
      };

      console.log("Valeurs envoyées à l'API :", payload); // Debug
      loading.value = true;

      try {
        if (isupdate.value) {
          const { data } = await ApiService.put(`/modeleContrats/${values.id}`, payload);
          if (data.code === 200) {
            success(data.message);
            resetForm();
            description.value = ''; // Réinitialise TinyMCE
            hideModal(addModeleContratModalRef.value);
            isupdate.value = false;
            btnTitle();
            emit("refreshModeleContrats");
            router.push({ name: "ListeRoleEtapPage" });
          }
        } else {
          const { data } = await ApiService.post("/modeleContrats", payload);
          if (data.code === 201) {
            success(data.message);
            resetForm();
            description.value = ''; // Réinitialise TinyMCE
            hideModal(addModeleContratModalRef.value);
            emit("refreshModeleContrats");
          }
        }
      } catch ({ response }) {
        error(response?.data?.message || 'Erreur lors de la soumission');
      } finally {
        loading.value = false;
      }
    };

    const resetValue = () => {
      if (modeleContratForm.value) {
        modeleContratForm.value.resetForm();
      }
      description.value = ''; // Réinitialise TinyMCE
      typeContrat.value = null; // Réinitialise Multiselect
      isupdate.value = false;
      btnTitle();
    };

    return {
      typeContrat, title, btntext, resetValue, modeleContratSchema, typeContratOptions, modeleContrats,
      addModeleContrat, modeleContratForm, addModeleContratModalRef, modeleContratnew,
      description, descriptionError,
    };
  },
};
</script>