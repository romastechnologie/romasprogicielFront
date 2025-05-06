<template>
  <div class="modal fade" id="AddMouvementModal" tabindex="-1" role="dialog" ref="addMouvementModalRef"
    aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ title }}</h4>
          <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <Form ref="mouvementForm" @submit="addMouvement" :validation-schema="mouvementSchema">
            <div class="row">
              <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Type Mouvement <span class="text-danger">*</span>
                  </label>
                  <Field name="typeMouvement" v-model="typeMouv" type="text" v-slot="{ field }">
                    <Multiselect v-model="field.value" :options="typeMouvement" v-bind="field" :preserve-search="true"
                      :multiple="false" :searchable="true" placeholder="Sélectionner un type de mouvement" label="label"
                      track-by="label" />
                  </Field>
                  <ErrorMessage name="typeMouvement" class="text-danger" />
                </div>
              </div>
            </div>
            <!--</fieldset>-->
            <fieldset class="border rounded-3 p-1">
              <legend class="float-none w-auto px-3">
                Source
              </legend>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                    <label class="d-block text-black mb-10">
                      Type Emplacement <span class="text-danger">*</span>
                    </label>
                    <Field name="typeEmplacementSource" v-model="type1" type="text" v-slot="{ field }">
                      <Multiselect v-model="field.value" v-bind="field" :options="typeEmplacementOptions" :preserve-search="true" :multiple="false"
                        :searchable="true" placeholder="Sélectionner un type emplacement source" label="label"
                        track-by="label" />
                    </Field>
                    <ErrorMessage name="typeEmplacementSource" class="text-danger" />
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                    <label class="d-block text-black mb-10">
                      Emplacement <span class="text-danger">*</span>
                    </label>
                    <Field name="emplacementInitial" type="text" v-slot="{ field }">
                      <Multiselect v-model="field.value" v-bind="field" :options="emplacementOptions1" :preserve-search="true" :multiple="false"
                        :searchable="true" placeholder="Sélectionner un emplacement" label="label" track-by="label" />
                    </Field>
                    <ErrorMessage name="emplacementInitial" class="text-danger" />
                  </div>
                </div>
              </div>
            </fieldset>
            <div class="row">
              <div class="col-md-6 mb-3">
                <fieldset class="border rounded-3 p-1">
                  <legend class="float-none w-auto px-3">
                    Document informations
                  </legend>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black mb-10">
                          Type archivage <span class="text-danger">*</span>
                        </label>
                        <Field name="typeDocument" v-model="type3" type="text" v-slot="{ field }">
                          <Multiselect v-model="field.value" v-bind="field" :options="typeDocumentOptions"
                            :preserve-search="true" :multiple="false" :searchable="true"
                            placeholder="Sélectionner un type document" label="label" track-by="label" />
                        </Field>
                        <ErrorMessage name="typeDocument" class="text-danger" />
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black mb-10">
                          Document <span class="text-danger">*</span>
                        </label>
                        <Field name="document" v-model="document1" type="text" v-slot="{ field }">
                          <Multiselect v-model="field.value" v-bind="field" label="label" track-by="label" :options="documentByTypeOptions" noOptionsText="Tapez au moins deux caractères" 
                          placeholder="Sélectionner un document" />
                        </Field>
                        <ErrorMessage name="document" class="text-danger" />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div class="col-md-6 mb-3" v-show="!etatAffiche">
                <fieldset class="border rounded-3 p-1" >
                  <legend class="float-none w-auto px-3">
                    {{ bloc2Title }}
                  </legend>
                  <div class="row">
                    <div class="col-md-12" v-show="typeMouv == 'Déplacement'">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black mb-10">
                          Type Emplacement <span class="text-danger">*</span>
                        </label>
                        <Field name="typeEmplacementDestinataire" v-model="type2" type="text" v-slot="{ field }">
                          <Multiselect v-model="field.value" v-bind="field" :options="typeEmplacementOptions" :preserve-search="true" :multiple="false"
                            :searchable="true" placeholder="Sélectionner un type emplacement" label="label"
                            track-by="label" />
                        </Field>
                        <ErrorMessage name="typeEmplacementDestinataire" class="text-danger" />
                      </div>
                    </div>
                    <div class="col-md-12" v-show="typeMouv === 'Sortie' || typeMouv === 'Destruction'">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black mb-10">
                          Personnel <span class="text-danger">*</span>
                        </label>
                        <Field name="personnel" type="text" v-slot="{ field }">
                          <Multiselect v-model="field.value" v-bind="field" :filter-results="false" :min-chars="2"
                            :resolve-on-load="false" :delay="0" :searchable="true" :options-limit="300" :options="async (query) => {
                              const results = await getPersonnelByKey2(query);
                              if (results && results.length > 0) {
                                return results;
                              } else if (query.length >= 3) {
                                return [{ value: '', label: 'Aucun enregistrement trouvé' }];
                              } else {
                                return [];
                              }
                            }" noOptionsText="Tapez au moins deux caractères" placeholder="Sélectionner un personnel" />
                        </Field>
                        <ErrorMessage name="personnel" class="text-danger" />
                      </div>
                    </div>

                    <div class="col-md-12" v-show="typeMouv == 'Sortie'">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black mb-10">
                          Personnel chargé du retrait <span class="text-danger">*</span>
                        </label>
                        <Field name="personnelR" type="text" v-slot="{ field }">
                          <Multiselect v-model="field.value" v-bind="field" :filter-results="false" :min-chars="2"
                            :resolve-on-load="false" :delay="0" :searchable="true" :options-limit="300" :options="async (query) => {
                              const results = await getPersonnelByKey(query);
                              if (results && results.length > 0) {
                                return results;
                              } else if (query.length >= 3) {
                                return [{ value: '', label: 'Aucun enregistrement trouvé' }];
                              } else {
                                return [];
                              }
                            }" noOptionsText="Tapez au moins deux caractères" placeholder="Sélectionner un personnel" />
                        </Field>
                        <ErrorMessage name="personnel" class="text-danger" />
                      </div>
                    </div>

                    <div class="col-md-12"  v-show="typeMouv == 'Déplacement'">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black mb-10">
                          Emplacement Destination <span class="text-danger">*</span>
                        </label>
                        <Field name="emplacementDestinataire" type="text" v-slot="{ field }">
                          <Multiselect v-model="field.value" :options="emplacementOptions2" v-bind="field" :preserve-search="true" :multiple="false"
                            :searchable="true" placeholder="Sélectionner un emplacement" label="label"
                            track-by="label" />
                        </Field>
                        <ErrorMessage name="emplacementDestinataire" class="text-danger" />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div class="col-md-6 mb-3" v-show="etatAffiche && leDocu && leDocu.nom">

                <div class="col-md-12">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black mb-10">
                          Agent déposant<span class="text-danger">*</span>
                        </label>
                        <Field name="personnel" type="text" v-slot="{ field }">
                          <Multiselect v-model="field.value" v-bind="field" :filter-results="false" :min-chars="2"
                            :resolve-on-load="false" :delay="0" :searchable="true" :options-limit="300" :options="async (query) => {
                              const results = await getPersonnelByKey(query);
                              if (results && results.length > 0) {
                                return results;
                              } else if (query.length >= 3) {
                                return [{ value: '', label: 'Aucun enregistrement trouvé' }];
                              } else {
                                return [];
                              }
                            }" noOptionsText="Tapez au moins deux caractères" placeholder="Sélectionner un personnel" />
                        </Field>
                        <ErrorMessage name="personnel" class="text-danger" />
                      </div>
                    </div>

                <fieldset class="border rounded-3 p-1">
                  <legend class="float-none w-auto px-3">
                    Informations
                  </legend>
                  <div class="row">
                    <div class="col-md-12">
                      <table>
                        <thead>
                          <tr>
                            <th class="shadow-none lh-1 fw-medium text-black">
                              Nom :
                            </th>
                            <td class="shadow-none lh-1 fw-medium text-black">
                              {{ leDocu?.nom }}
                            </td>
                          </tr>
                          <tr>
                            <th class="shadow-none lh-1 fw-medium text-black">
                              Description :
                            </th>
                            <td class="shadow-none lh-1 fw-medium text-black">
                              {{ leDocu?.description }}
                            </td>
                          </tr>
                          <tr>
                            <th class="shadow-none lh-1 fw-medium text-black">
                              Date :
                            </th>
                            <td class="shadow-none lh-1 fw-medium text-black">
                              {{ format_Date(leDocu?.createdAt) }}
                            </td>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>

            <button class="btn btn-primary" type="submit">
              {{ btntext }}
            </button>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, hideModal, success,format_Date } from '@/utils/utils';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';
import axios from 'axios';

export default {
  name: "AddMouvementModal",
  components: {
    Form,
    Field,
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
  emits: ["refreshMouvements", 'openmodal'],

  setup: (props: any, { emit }: { emit: Function }) => {
    const loading = ref<boolean>(false);
    const document1 = ref();
    const mouvementSchema = Yup.object().shape({
      emplacementInitial: Yup.string().notRequired(),
      emplacementDestinataire: Yup.string().notRequired(),
      typeEmplacementSource:Yup.string().notRequired(),
      typeEmplacementDestinataire: Yup.string().notRequired(),
      document: Yup.string().required('Le document est obligatoire'),
      typeMouvement: Yup.string().required('Le type de mouvement est obligatoire'),
      typeDocument: Yup.string().required('Le type de document est obligatoire'),
      personnel: Yup.string().notRequired(),
      personnelR: Yup.string().notRequired(),

    });
    const etatAffiche = ref(false);
    const mouvementnew = ref(props.id);
    const typeMouvement = ref([
      {
        value: "Retour", label: "Retour"
      },
      {
        value: "Sortie", label: "Sortie"
      },
      {
        value: "Destruction", label: "Destruction"
      },
      {
        value: "Déplacement", label: "Déplacement"
      },
    ])
    const typeMouv = ref("");
    const mouvementForm = ref<any | null>(null);
    const addMouvementModalRef = ref<null | HTMLElement>(null);
    let mouvements = ref<Array<any>>([]);
    const title = ref('Ajouter un mouvement');
    const btntext = ref('Ajouter');
    const isupdate = ref(false);
    const router = useRouter();
    const bloc2Title = ref("Document")
    const etatDocument = ref("Libre");
    const typeEmplacementOptions = ref<Array<any>>([]);
    const typeDocumentOptions = ref<Array<any>>([]);
    const type1 = ref()
    const type2 = ref()

    watch(() => props.id, (newValue) => {
      if (newValue != 0) {
        getMouvement(newValue);
        isupdate.value = true;
      }
      btnTitle();
    });    

    const leDocu = ref()
    const lesDocuments = ref([])
    
    watch(document1, (newValue, oldValue) => {
      if (newValue != oldValue && newValue) {
        leDocu.value = lesDocuments.value.find(objet => objet.id === newValue);
      }
    });

    const getMouvement = async (id: number) => {
      return ApiService.get("/mouvements/" + id)
        .then(({ data }) => {
          mouvementForm.value?.setFieldValue("id", data.data.id);
          mouvementForm.value?.setFieldValue("code", data.data.code);
          mouvementForm.value?.setFieldValue("libelle", data.data.libelle);
          emit('openmodal', addMouvementModalRef.value);
        })
        .catch(({ response }) => {
          error(response.data.message)
        });
    }

    const getTypeEmplacement = async () => {
      try {
        const response = await ApiService.get("/all/typeEmplacements");
        const typeEmplacementData = response.data.data.data;
        typeEmplacementOptions.value = typeEmplacementData.map(
          (typeEmplacement) => ({
            value: typeEmplacement.id,
            label: `${typeEmplacement.code} - ${typeEmplacement.libelle}`,
          })
        );
      } catch (error) {
        //
        console.log("Erreur ===> ",error)
      }
    }

    const getTypeDocument = async () => {
      try {
        const response = await ApiService.get("/tous/typedocuments");
        const typeDocumentData = response.data.data;
        typeDocumentOptions.value = typeDocumentData.map(
          (typeDoc) => ({
            value: typeDoc.id,
            label: `${typeDoc.code} - ${typeDoc.nom}`,
          })
        );
      } catch (error) {
        //
        console.log("Erreur ===> ",error)
      }
    }

     const documentByTypeOptions = ref([]);

     const getDocumentByType = async (type: any) => {
  try {
    if (!type) {
      console.error("Type de document invalide !");
      return;
    }

    const response = await axios.get(`documents/typeEmplacement/${type}/donnes`);
    
    if (response.status === 200) {
      const documentData = response.data.data;
      console.log("Documents récupérés :", documentData);

      lesDocuments.value = documentData;
      documentByTypeOptions.value = documentData.map((document) => ({
        value: document.id,
        label: `${document.nom} - ${document.refDoc}`,
      }));
    } else {
      console.error("Erreur de récupération :", response.status);
    }
  } catch (error) {
    console.error("Erreur ===> ", error);
  }
};

    const emplacementOptions1 = ref([])
    const getEmplacement1 = async (type: any) => {
      if (type && type != "") {
        try {
          const response = await ApiService.get(
            `/emplacement/by/${type}/typeemplacement`
          );
          const emplacementData = response.data.data;
          emplacementOptions1.value = emplacementData.map(
            (emplacement) => ({
              value: emplacement.id,
              label: `${emplacement.code}`,
            })
          );
        } catch (error) {
          //
          console.log("Erreur ===> ", error);
        }
      }else{
        emplacementOptions1.value = [];
      }
    };

    const emplacementOptions2 = ref([])
    const getEmplacement2 = async (type: any) => {
      if (type && type != "") {
        try {
          const response = await ApiService.get(
            `/emplacement/by/${type}/typeemplacement`
          );
          const emplacementData = response.data.data;
          emplacementOptions2.value = emplacementData.map(
            (emplacement) => ({
              value: emplacement.id,
              label: `${emplacement.code}`,
            })
          );
        } catch (error) {
          //
          console.log("Erreur ===> ", error);
        }
      }else{
        emplacementOptions2.value = [];
      }
    };

    const getDocumentByKey = async (valeur: any) => {
      try {
          const etat = etatDocument.value;
          const retourr = await axios.get(`get/documents/${valeur}/${etat}`);
          console.log("EEEEEEEE ===> ", retourr);
          const data = retourr.data.data.data;
          return data.map((da) => ({
          value: da.id,
          label: da.nom,
        }));
        } catch (error) {
          console.log("ERREREUR  ===> ", error)
        }
    }
    const getEmplacementByTypeEmplacementSource = async (valeur: any) => {
      try {
          const etat = etatDocument.value;
          const retourr = await axios.get(`empacement/documents/${valeur}/${etat}`);
          console.log("EEEEEEEE ===> ", retourr);
          const data = retourr.data.data.data;
          return data.map((da) => ({
          value: da.id,
          label: da.nom,
        }));
        } catch (error) {
          console.log("ERREREUR  ===> ", error)
        }
    }
    const getPersonnelByKey = async (valeur: any) => {
      try {
          const retourr = await axios.get(`/get/personnels/${valeur}`);
          const data = retourr.data.data;
          return data.map((da) => ({
            value: da.id,
            label: da.nom + " "+ da.prenom,
          }));
        } catch (error) {
          console.log("ERREREUR  ===> ", error)
        }
    }

    const getPersonnelByKey2 = async (valeur: any) => {
      try {
          const retourr = await axios.get(`/get/personnels/${valeur}`);
          const data = retourr.data.data;
          return data.map((da) => ({
            value: da.id,
            label: da.nom + " "+ da.prenom,
          }));
        } catch (error) {
          console.log("ERREREUR  ===> ", error)
        }
    }
    const btnTitle = async () => {
      if (isupdate.value) {
        title.value = "Modifier le Mouvement";
        btntext.value = "Modifier";
      } else {
        title.value = "Ajouter un Mouvement";
        btntext.value = "Ajouter";
      }
    }
    const type3 = ref();

    watch(type1, (newValue, oldValue) => {
      if (newValue != oldValue && newValue) {
       getEmplacement1(newValue)
      }
    });
    watch(type2, (newValue, oldValue) => {
      if (newValue != oldValue && newValue) {
       getEmplacement2(newValue)
      }
    });
    watch(type3, (newValue, oldValue) => {
      if (newValue != oldValue && newValue) {
        getDocumentByType(newValue)
      }
    });
    const btnTitle2 = async () => {
      if (typeMouv.value == "Retour") {
        title.value = "Ajouter un retour";
        btntext.value = "Ajouter";
        bloc2Title.value = "Infos Sortie"
        etatAffiche.value = true;
        etatDocument.value = "Sortie";
      } else if (typeMouv.value == "Sortie") {
        title.value = "Ajouter une sortie";
        btntext.value = "Sortir";
        bloc2Title.value = "Infos Document"
        etatAffiche.value = false;
        etatDocument.value = "Libre";
      } else if (typeMouv.value == "Destruction") {
        title.value = "Commencer une destruction";
        btntext.value = "Détruire";
        bloc2Title.value = "Info personne";
        etatAffiche.value = false;
        etatDocument.value = "Libre";
      } else if (typeMouv.value == "Déplacement") {
        title.value = "Déplacer un document";
        btntext.value = "Déplacer";
        bloc2Title.value = "Destination";
        etatAffiche.value = false;
        etatDocument.value = "Libre";
      } else {
      }
    }
    const addMouvement = async (values: any, { resetForm }: { resetForm: () => void }) => {
      console.log("valuesvaluesvaluesvalues ==> ",values)
      loading.value = false;
      if (isupdate.value) {
        await axios.put(`/mouvements/${values.id}`, values)
          .then(({ data }) => {
            if (data.code == 200) {
              success(data.message);
              resetForm();
              hideModal(addMouvementModalRef.value);
              isupdate.value = false;
              btnTitle();
              emit("refreshMouvements");
              router.push('/mouvements/liste-mouvement');
            }
          }).catch(({ response }) => {
            error(response.data.message);
          });
      } else {
        await axios.post("/mouvement/document", values)
          .then(({ data }) => {
            if (data.code == 201) {
              success(data.message)
              resetForm();
              hideModal(addMouvementModalRef.value);
              emit("refreshMouvements");
            }
          }).catch(({ response }) => {
            error(response.data.message);
          });
      }
    };
    watch(() => typeMouv.value, async (newValue, oldValue) => {
      if (newValue && oldValue != newValue) {
        typeMouv.value = newValue.toString();
        await btnTitle2()
      }
    })
    const resetValue = () => {
      const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
      isupdate.value = false;
      formFields.forEach(field => {
        field.value = '';
      });
      btnTitle()
    };
    onMounted(async () => {
      await getTypeDocument();
      await getTypeEmplacement()
    });
    return {
      mouvements, title,type1,type2,document1,leDocu,lesDocuments, btntext,getEmplacement1,type3, emplacementOptions1,getDocumentByType,typeDocumentOptions, getEmplacement2,emplacementOptions2, resetValue,getPersonnelByKey,getPersonnelByKey2,  mouvementSchema, bloc2Title, getDocumentByKey,documentByTypeOptions,
      addMouvement, typeMouvement,format_Date, typeMouv, mouvementForm, addMouvementModalRef, mouvementnew, etatAffiche,typeEmplacementOptions
      //refreshMouvements
    };
  },
};
</script>@/models/Mouvement