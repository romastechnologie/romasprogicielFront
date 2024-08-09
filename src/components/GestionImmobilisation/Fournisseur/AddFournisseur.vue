<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="fournisseurForm" @submit="addFournisseur" :validation-schema="fournisseurSchema">
              <div class="row">
              <div class="col-md-6 mt-3">
                    <label for="nom" class="form-label">Nom Fournisseur<span class="text-danger">*</span></label>
                    <Field name="nom" class="form-control" type="text"/>
                    <ErrorMessage name="nom" class="text-danger" />
            </div>
            <div class="col-md-6 mt-3">
                    <label for="telephone" class="form-label">Téléphone<span class="text-danger">*</span></label>
                    <Field name="telephone" class="form-control" type="text"/>
                    <ErrorMessage name="telephone" class="text-danger" />
            </div>
            <div class="col-md-6 mt-3">
                    <label for="adresse" class="form-label">Adresse</label>
                    <Field name="adresse" class="form-control" type="text"/>
                    <ErrorMessage name="adresse" class="text-danger" />
            </div>
           
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                  Créer un fournisseur
              </button>
              <router-link to="/fournisseurs/liste-fournisseurs" 
                  class=" btn btn-danger "><i class="flaticon-delete lh-1 me-1 position-relative top-2"></i>
                  <span class="position-relative"></span>Annuler</router-link>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>
  </template>
  
  <script lang="ts">
  
  import { defineComponent, onMounted, ref} from 'vue';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as Yup from 'yup';
  import ApiService from '@/services/ApiService';
  import { Fournisseur } from '@/models/Fournisseur';
  import { error, success } from '@/utils/utils';
  import { useRouter } from 'vue-router';
  
  
  export default defineComponent({
      name: "AddFournisseur",
      components: {
      Form,
      Field,
      ErrorMessage,
      //Multiselect
    },
  
    setup: () => {
      const fournisseurSchema = Yup.object().shape({
            nom: Yup.string().required("Le nom est obligatoire."),
            telephone: Yup.string().required("Le téléphone est obligatoire."),
            adresse: Yup.string().notRequired(),
      });
  
      onMounted(() => {
        getAllTypeFournisseur()
      });
  
      const fournisseurForm =  ref(null);
      //const permissions = ref(null);
      const typeOptions = ref([]);
      const router = useRouter();
     // const permissions= ref<Array<Permission>>([]);
      const addFournisseur = async (values,{ resetForm }) => {
        values = values as Fournisseur;
        console.log('je recupère', values)
        ApiService.post("/fournisseurs",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message)
            resetForm();
            router.push({ name: "ListeFournisseurPage" });
          }
        }).catch(({ response }) => {
          error(response.message);
        });
      }
  
      const getAllTypeFournisseur = async () => {
        try{
        const response = await ApiService.get('/all/types');
        const typesData = response.data.data;

        typeOptions.value = typesData.map((type) => ({
          value: type.id,
          label: type.libelle,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 
  
      return { fournisseurSchema, addFournisseur, fournisseurForm,typeOptions};
    },
  });
  </script>