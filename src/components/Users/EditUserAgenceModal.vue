<template>
  <div
    class="modal fade createNewModal"
    id="EditUserAgenceModal"
    tabindex="-1"
    ref="addEditUserAgenceModalRef"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">
        </h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <h5>Vous êtes sur le point d'affecter une nouvelle agence à: {{ selectedUser?.nomComplet }}</h5>
        <Form ref="agenceForm" @submit="addAgence" :validation-schema="agenceSchema">
          <div class="row">
            <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Commune
              </label>
              <Field name="commune" v-slot="{ field }">
                <Multiselect 
                    v-model = "field.value"
                    v-bind = "field"
                    :options="communesOptions"
                    :searchable="true"
                    @change="communeChange($event)"
                    placeholder="Rechercher une commune"
                    noResultText= "Aucun enregistrement trouvé"
                    noOptionsText="Tapez au moins deux caractères"/>
              </Field>
              <ErrorMessage name="commune" class="text-danger"/>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
               Nouvelle Agence
              </label>
              <Field  name="nouvelleAgence" v-slot="{ field }" v-model="agence">
                <Multiselect 
                    v-model = "field.value"
                    v-bind = "field"
                    :options="bureauxOptions"
                    @select="getBureau(field.value)"
                    placeholder="Selectionner une agence"
                 />
              </Field>
              <ErrorMessage name="nouvelleAgence" class="text-danger"/>
            </div>
          </div>
            <button
              class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
              type="submit"
            >
              Envoyer
            </button>
          </div>
        </Form>
        </div>
        <button
          type="button"
          class="btn-close shadow-none"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch} from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';
import { useRouter, useRoute } from 'vue-router';
import Multiselect from '@vueform/multiselect'
import { User } from '@/models/users';
import { Agent } from 'http';

export default {
  name: "EditUserAgenceModal",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  props: {
    selectedUser: Object as () => User | undefined,
  },
  setup: (props, { emit }) => {

    const agenceSchema = Yup.object().shape({
      nouvelleAgence: Yup.number().typeError('Veuillez entrer un nombre').required('L\'agence est obligatoire'),
    });

    const agenceForm =  ref<User | null>(null);
    const addEditUserAgenceModalRef = ref<null | HTMLElement>(null);
    const bureauxOptions = ref([]);
    const communesOptions = ref([]);
    const bureauselect = ref();
    //const router = useRouter();
    const userForm = ref<User>();
    const route = useRoute();
    const  agence = ref();

      const fetchCommune = async () => {
          ApiService.get('/communes')
            .then(({ data }) => {
                const donneee = data.data.data;
                communesOptions.value = donneee.map((commune: any) => {
                  return {
                    label: commune.libelle,
                    value: commune.id,
                  };
                });
            })
            .catch(({ response }) => {
          //error(response.data.message);
        });
        }

        const getBureau= (val) => {
        bureauselect.value=val;
      }

      function communeChange(value) {
        if(value){
        bureauxOptions.value =[];
        ApiService.get('/bureaux/commune/'+value)
          .then(({ data }) => {
              const donnee = data.data;
              if(donnee.length > 0) {
                bureauxOptions.value = donnee.map((bureau: any) => {
                  return {
                    label: bureau.nom,
                    value: bureau.id,
                  };
                });
              }
          })
          .catch(({ response }) => {
            //error(response.data.message);
          });
      }
    }

    function getUser(id: number) {
    ApiService.get("/users/" + id.toString())
      .then(({ data }) => {
        selectedUser.value = data.data;
        const agence = data.data.agence;
        agenceForm.value?.setFieldValue('agence', agence);

      })
      .catch(({ response }) => {
        error(response.message);
      });
  }

  const agent = ref();
    const selectedUser = ref<User | undefined>(undefined);

    watch(() => props.selectedUser, (newValue) => {
      selectedUser.value = newValue;
      agent.value = newValue?.id;
    });
    const nouvelleAgence = ref(0) ;
    watch(agence, (newValue, oldValue) => {
      nouvelleAgence.value = newValue;
    });


    const addAgence = async (values, { resetForm }) => {
      const dataToSend = {
        agent: agent.value,
        nouvelleAgence: nouvelleAgence.value,
      };
      ApiService.post("/affectations", dataToSend)
        .then(({ data }) => {
          if (data.code == 201) {
            success(data.message);
            resetForm();
            hideModal(addEditUserAgenceModalRef.value);
            emit('close');
            emit('getuser', data.data);
          }
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    }

    onMounted( async () => {
     fetchCommune();
      if(route.params.id) {
        getUser(parseInt(route.params.id as string));
      }
    });

    return {agenceSchema,
       addAgence,
       agence,
       agenceForm,
       addEditUserAgenceModalRef,
       bureauxOptions,
       communesOptions,
       bureauselect,
       getBureau,
       communeChange,
        getUser,
       };
  },
};
</script>