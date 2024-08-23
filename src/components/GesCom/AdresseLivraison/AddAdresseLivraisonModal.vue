<template>
  <div class="modal fade" id="AddAdresseLivraisonModal" tabindex="-1" role="dialog" ref="addAdresseLivraisonModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">{{ title }}</h4>
                <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
          <Form ref="adresseLivraisonForm" @submit="addAdresseLivraison" :validation-schema="adresseLivraisonSchema">
            <div class="row">
            <div class="col-md-6 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Libelle <span class="text-danger">*</span>
                </label>
                <Field name="libelleAdresse" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libelle"/>
                <ErrorMessage name="libelleAdresse" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  CLient <span class="text-danger">*</span>
                </label>
                <Field  name="client"  v-slot="{ field }">
                  <Multiselect
                    :options="clientOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le client"
                  />
                </Field>  
                <ErrorMessage name="client" class="text-danger"/>
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
import { AdresseLivraison } from '@/models/AdresseLivraison';
import { error , success } from '@/utils/utils';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "AddAdresseLivraisonModal",
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
    const adresseLivraisonSchema = Yup.object().shape({
      libelleAdresse: Yup.string().required('Le libelle est obligatoire'),
    });

    const adresseLivraisonForm = ref<AdresseLivraison | null>(null);
    const addAdresseLivraisonModalRef = ref<null | HTMLElement>(null);
    const router = useRouter();
    const adresseLivraisonOptions = ref([]);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un adresseLivraison");
    const btntext = ref('Ajouter');
    const clientOptions = ref([]);

    watch(() => props.item, (newValue) => {
      getAdresseLivraison(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier la adresseLivraison";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter une adresseLivraison";
         btntext.value = "Ajouter"
      }
    }

    const fetchClient = async () => {
      try {
        const response = await ApiService.get('/clients');
        const clientData = response.data.data.data;
        clientOptions.value = clientData.map((client) => ({
          value: client.id,
          label: `${client.nomClient ? client.nomClient : ''} ${client.prenomClient ? client.prenomClient : ''} ${client.raisonSociale ? client.raisonSociale : ''}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchClient();
    });

    const getAdresseLivraison = async (id: number) => {
      return ApiService.get("/adresselivraisons/"+id)
      .then(({ data }) => {
        // map data in form
        const donnees = data.data;
        for (const key in donnees) {
          adresseLivraisonForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addAdresseLivraisonModalRef.value);

      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    const fetchAdresseLivraison = async () => {
      try {
        const response = await ApiService.get('/adresselivraisons');
        const adresseLivraisonData = response.data.data.data;
        adresseLivraisonOptions.value = adresseLivraisonData.map((adresseLivraison) => ({
          value: adresseLivraison.id,
          label: `${adresseLivraison.codeAdresseLivraison} - ${adresseLivraison.libelleAdresseLivraison}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchAdresseLivraison();
    });

    const addAdresseLivraison = async (values: any, adresseLivraisonForm) => {
      values = values as AdresseLivraison;
      if(isUPDATE.value){
        ApiService.put("/adresselivraisons/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              adresseLivraisonForm.resetForm();
              hideModal(addAdresseLivraisonModalRef.value);
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
        ApiService.post("/adresselivraisons",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              adresseLivraisonForm.resetForm();
              hideModal(addAdresseLivraisonModalRef.value);
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

    return { adresseLivraisonSchema,
      addAdresseLivraisonModalRef,
      addAdresseLivraison,
      adresseLivraisonForm,
      title,btntext,resetValue,
      adresseLivraisonOptions,clientOptions
    };
  },
});
</script>@/models/CategorieInfo