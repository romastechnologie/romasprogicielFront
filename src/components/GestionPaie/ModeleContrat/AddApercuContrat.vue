<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
        <Form ref="apercucontratForm" @submit="addAperçuContrat" :validation-schema="apercucontratSchema">
          <div class="row">
      
       <div class="card mt-4">
  <div class="card-header d-flex justify-content-between align-items-center">
    <strong>Aperçu du contrat généré</strong>
   <button class="btn btn-outline-primary btn-sm" @click="imprimerApercu">
  <i class="fa fa-print me-1"></i> Imprimer
</button>
  </div>
  <div class="card-body" ref="apercuContent" v-html="apercuHtml"></div>
</div>

            <div class="col-md-12 mt-3">
              <div class="d-flex align-items-center ">
                <button class="btn btn-success me-3" type="submit">
                  Aperçu de contrat
                </button>
                <router-link to="/apercucontrats/liste-apercucontrat" class=" btn btn-danger "><i
                    class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                  <span class="position-relative"></span>Annuler</router-link>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </template>
  <script lang="ts">
import { defineComponent, onMounted, ref, reactive, nextTick,watch, computed } from "vue";
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';
//import { ApercuContrat } from '@/models/ApercuContrat';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';
import Editor from '@tinymce/tinymce-vue';
import { useRoute } from 'vue-router';

interface ContratOption {
  value: number;
  label: string;
}
interface Contrat {
  id: number;
  reference?: string;
  personnel?: {
    nom: string;
    prenom?: string;
    birthdate?: string;
    sexe?: string;
    nationalite?: string;
    adresse?: string;
    situationMatrimoniale?: string;
    qualification?: string;
    cnss?: string;
  };
  typeContrat?: {
    id: number;
    libelle: string;
    description?: string;
  };
  datePriseFonction?: string;
  dateFin?: string;
  salaireBase?: number;
  dureeContrat?: number;
  poste?: { libelle: string };
  lieu?: string;
}


interface TypeContrat {
  id: number;
  libelle?: string;
  description?: string;
  modeleContrats?: ModeleContrat[];
}
interface ModeleContrat {
  id: number;
  description: string;
  date?: string;
  lieu?: string;
  salaireBaseDefaut?: number;
  conditionsSpecifiques?: string | null;
}

  export default defineComponent({
    name: "AddApercuContrat",
    components: {
    Form,
    Field,
    Editor,
    ErrorMessage,
    Multiselect
    },
    setup: () => {
    const loading = ref<boolean>(false);
    const description = ref('');
    const descriptionError = ref('');
    const isEditorReady = ref(false);
    const tinymceApiKey = ref('uz847a8s67ivk7r2bgs2dctztrtids7i68lucoaoja3btzk6'); 
    const typeContratOptions = ref([]);
    const newContrat = ref<number | null>(null);
    const typeContrat = ref<number | null>(null);
    const contratOptions = ref<ContratOption[]>([]);
    const lesContrats = ref<any>([]);
     const salaireDeBase = ref<number>(0);
    const cnss = ref('');
 const route = useRoute();
const contratIdFromUrl = Number(route.params.id);
    const modeleHtml = ref<string>('');  // HTML brut original
const apercuHtml = ref<string>('');  // HTML avec les données injectées
const apercuContent = ref<HTMLElement | null>(null);
const societe = ref<any>(null);


    const apercucontratSchema = Yup.object().shape({
    contrat: Yup.string().required("la date est obligatoire."),
    typeContrat: Yup.string().required("Le type de contrat est obligatoire."),
      });
     onMounted(async () => {
  try {
    await getSociete(SOCIETE_ID);

    if (contratIdFromUrl) {
      await getContrat(contratIdFromUrl); // va aussi charger le type de contrat
    }
    initializeEditor();
  } catch (e) {
    console.error(e);
  }
});
      watch(typeContrat, (newVal) => {
  if (newVal) {
    console.log('Type contrat sélectionné :', newVal);
    getTypeContrat(newVal);
  }
});
   const getSociete = async (id: number) => {
  try {
    const response = await ApiService.get(`/societes/${id}`);
    societe.value = response.data.data;
    console.log("Société récupérée :", societe.value);
    if (newContrat.value) {
      apercuHtml.value = injectDonneesDansModele(modeleHtml.value, newContrat.value, societe.value);
    }
  } catch (err) {
    console.error("Erreur récupération société :", err);
  }
};

 const imprimerApercu = () => {
  if (!apercuContent.value) return;

  const printWindow = window.open('', '', 'width=800,height=600');
  if (!printWindow) return;

  const content = apercuContent.value.innerHTML;

  printWindow.document.write(`
    <html>
      <head>
        <title>Impression du contrat</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 30px;
            line-height: 1.6;
          }
          h1, h2, h3 {
            color: #333;
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};

 const getContrat = async (id: number) => {
  try {
    const response = await ApiService.get(`/contrat/${id}`);
    const contratData: Contrat = response.data.data;

    salaireDeBase.value = contratData.salaireBase || 0;
    cnss.value = (contratData.personnel as any)?.cnss || '';
    newContrat.value = contratData.id; // Pour formulaire (facultatif)

    // Déterminer et charger le type de contrat
    if (contratData.typeContrat?.id) {
      typeContrat.value = contratData.typeContrat.id;
      await getTypeContrat(contratData.typeContrat.id);
    }

    apercuHtml.value = injectDonneesDansModele(modeleHtml.value, contratData, societe.value);


  } catch (error) {
    console.error('Erreur récupération contrat:', error);
  }
};
const SOCIETE_ID = 1;
const injectDonneesDansModele = (template: string, contrat: any, societe?: any): string => {
  const variables: Record<string, string | number | undefined> = {
    employeur_raison_sociale: societe?.raisonSocial || 'RAISON SOCIALE',
    employeur_adresse: societe?.siegeSocial || 'ADRESSE NON DISPONIBLE',
    employeur_telephone: societe?.telephone || '---',
    employeur_representant: societe?.nomRep ? `${societe.nomRep} ${societe.prenomRep || ''}` : '---',

    employe_nom: `${contrat?.personnel?.nom || ''} ${contrat?.personnel?.prenom || ''}`,
    employe_naissance: contrat?.personnel?.birthdate || '',
    employe_sexe: contrat?.personnel?.sexe || '',
    employe_nationalite: contrat?.personnel?.nationalite || '',
    employe_adresse: contrat?.personnel?.adresse || '',
    employe_situation: contrat?.personnel?.situationMatrimoniale || '',
    employe_qualification: contrat?.personnel?.qualification || '',

    contrat_duree: contrat?.dureeContrat || '',
    contrat_date_debut: contrat?.datePriseFonction?.slice(0, 10) || '',
    contrat_date_fin: contrat?.dateFin?.slice(0, 10) || '',
    poste: contrat?.poste?.libelle || '',
    lieu_travail: contrat?.lieu || 'Cotonou',
    salaire_base: contrat?.salaireBase || '',
    ville_signature: 'Cotonou',
    date_signature: new Date().toLocaleDateString(),
  };

  return template.replace(/{{(.*?)}}/g, (_, key) => {
    return variables[key.trim()]?.toString() || '';
  });
};


    watch(newContrat, (newVal) => {
  if (newVal) {
    console.log('Contrat sélectionné :', newVal);
    getContrat(newVal);
  }
});
    const getTypeContrat = async (id: number) => {
  try {
    const response = await ApiService.get(`/typeContrats/${id}`);
    const typecontratData: TypeContrat = response.data.data;

    // Prendre le 1er modèle disponible
    if (typecontratData.modeleContrats && typecontratData.modeleContrats.length > 0) {
      modeleHtml.value = typecontratData.modeleContrats[0].description || '';
    }

    console.log("Modèle de contrat chargé :", modeleHtml.value);
  } catch (error) {
    console.error('Erreur récupération type contrat:', error);
  }
};

   const initializeEditor = async () => {
      await nextTick(); 
      isEditorReady.value = true; 
      console.log('TinyMCE Editor initialization triggered');
    };
    const handleEditorInit = (evt: any, editor: any) => {
      console.log('TinyMCE Editor initialized:', editor);
      setTimeout(() => editor.focus(), 100); 
    };
      const modelcontratForm = ref(null);
      const router = useRouter(); 
      const addApercuContrat = async (values, {resetForm}) => {
          values.description = description.value;
          console.log("valeur contrat", values);
        ApiService.post("/apercuContrats",values)
          .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              resetForm();
              router.push({ name: "ListeApercuContratPage" });
            }
          }).catch(({ response }) => {
            error(response.data.message);
          });
      };
      return {imprimerApercu,modeleHtml,apercuHtml,newContrat,typeContrat,contratOptions,typeContratOptions,apercucontratSchema,addApercuContrat,modelcontratForm, descriptionError, isEditorReady,description, tinymceApiKey,handleEditorInit,  getTypeContrat,apercuContent,
       };
    },
  });
  </script>
  <style scoped>
.tinymce-wrapper {
  position: relative;
  width: 100%;
  min-height: 300px; /* Hauteur minimale pour éviter un affichage réduit */
}
.tinymce-wrapper .tox-tinymce {
  border: 1px solid #ced4da !important; /* Style cohérent avec Bootstrap */
  z-index: 1050; /* Au-dessus de la modale Bootstrap */
}
</style>