<template>
  <LogoView />
  <BreadCrumbs />
  <div class="header-wrapper col m-0">
    <div class="row">
      <SearchBar />
      <HeaderLogo />

      <SearchData :class="store.active ? 'open' : ''" />
      <div class="col">
        <!-- Bouton pour "Ma présence" -->
        <a
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
           data-bs-target="#AddPresenceModal"
          >Ma présence</a
        >

        <!-- <a
          v-if="etatPresepeutMarquerPresencence == true"
          class="btn btn-info"
          @click="commence"
          >Ma présence</a
        >-->

        <!-- Bouton pour "Je part maintenant" -->
        <a v-if="peutPartir == true" @click="depart" class="btn btn-warning"
          >Je pars maintenant</a
        >
      </div>
      <div
        class="nav-right col-xxl-8 col-xl-6 col-md-7 col-8 pull-right right-header p-0 ms-auto"
      >
        <ul class="nav-menus">
          <li>
            <SearchInput @click="store.openActives()" />
          </li>
          <li>
            <HeaderSearch />
          </li>
          <!--<li class="onhover-dropdown">
                        <NotificationBox />
                    </li>-->
          <!--<li class="">
                       <BookmarkSearch />
                        
                    </li>-->
          <!--<li>
                        <ModeView />
                    </li> -->
          <!-- <li class="language-nav">
                        <LanguageView />
                    </li> -->
          <!-- <li class="onhover-dropdown">
                        <MessageBox />
                    </li> -->
          <!-- <li class="cart-nav onhover-dropdown">
                        <CartBox />
                    </li> -->
          <li class="profile-nav onhover-dropdown px-0 py-0">
            <ProfileView />
          </li>
        </ul>
      </div>
    </div>
  </div>
  <PresenceModal></PresenceModal>
</template>
<script lang="ts" setup>
import {
  defineAsyncComponent,
  defineEmits,
  ref,
  onMounted,
  computed,
} from "vue";
import { useMenuStore } from "@/store/menu";
// const LogoView = defineAsyncComponent(() => import("@/components/common/block/header/LogoView.vue"))
const SearchBar = defineAsyncComponent(
  () => import("@/components/common/block/header/SearchBar.vue")
);
// const HeaderLogo = defineAsyncComponent(() => import("@/components/common/block/header/HeaderLogo.vue"))
const SearchInput = defineAsyncComponent(
  () => import("@/components/common/block/header/SearchInput.vue")
);
const HeaderSearch = defineAsyncComponent(
  () => import("@/components/common/block/header/HeaderSearch.vue")
);
const NotificationBox = defineAsyncComponent(
  () => import("@/components/common/block/header/NotificationBox.vue")
);
const BookmarkSearch = defineAsyncComponent(
  () => import("@/components/common/block/header/BookmarkSearch.vue")
);
const ModeView = defineAsyncComponent(
  () => import("@/components/common/block/header/ModeView.vue")
);
const MessageBox = defineAsyncComponent(
  () => import("@/components/common/block/header/MessageBox.vue")
);
const CartBox = defineAsyncComponent(
  () => import("@/components/common/block/header/CartBox.vue")
);
const ProfileView = defineAsyncComponent(
  () => import("@/components/common/block/header/ProfileView.vue")
);
const LanguageView = defineAsyncComponent(
  () => import("@/components/common/block/header/LanguageView.vue")
);
const SearchData = defineAsyncComponent(
  () => import("@/components/common/block/header/SearchData.vue")
);
const BreadCrumbs = defineAsyncComponent(
  () => import("@/layout/BreadCrumbs.vue")
);
let store = useMenuStore();
const emit = defineEmits(["click"]);
import axios from "axios";
import * as Yup from "yup";
import { cryptage, error, success } from "@/utils/utils";
import JwtService from "@/services/JwtService";
import PresenceModal from "@/components/common/block/header/PresenceModal.vue";
const commence = async () => {
  console.log("commence");
  try {
    const { data } = await axios.post("/maPresence", {
      donne: cryptage(JwtService.getUserPersonnel()),
    });
    console.log("data", data);
    if (data.code == 201) {
      console.log("commence", "Moi commence");
      success(data.message);
    } else {
      error(data.message);
    }
  } catch (er) {
    error(er.response.data.message);
    //console.log('commence', 'Erreur lors de la récupération de ma présence', error)
  }
};

const presenceSchema = Yup.object().shape({
  description: Yup.string().required("L'observation est obligatoire"),
});
const presenceForm = ref<any | null>(null);
const addPresenceModalRef = ref<null | HTMLElement>(null);

const addPresence = async (
  values: any,
  { resetForm }: { resetForm: () => void }
) => {
  //
};
const depart = async () => {
  console.log("Départ");
  try {
    const { data } = await axios.post("/monDepart", {
      donne: cryptage(JwtService.getUserPersonnel()),
    });
    console.log("data", data);
    if (data.code == 201) {
      console.log("commence", "Moi commence");
      success(data.message);
    } else {
      error(data.message);
    }
  } catch (er) {
    error(er.response.data.message);
  }
};

function removeElementsByClass(className: string): void {
  const elements = document.querySelectorAll(`.${className}`); // Sélectionne tous les éléments avec la classe
  elements.forEach((element) => {
    element.remove(); // Supprime chaque élément du DOM
  });
  console.log(
    `Tous les éléments avec la classe "${className}" ont été supprimés.`
  );
}

function removeElementById(elementId: string): void {
  const element = document.getElementById(elementId); // Sélectionne l'élément par son ID
  if (element) {
    element.remove(); // Supprime l'élément du DOM
    console.log(`Élément avec l'ID "${elementId}" supprimé.`);
  } else {
    console.warn(`Aucun élément trouvé avec l'ID "${elementId}".`);
  }
}

const retire = () => {
  // setTimeout(() => {
  removeElementsByClass("modal-backdrop");
  // }, 1000);
};
const etatPresence = ref("");
const etatPresepeutMarquerPresencence = ref(false);
const peutPartir = ref(false);
const checkPresence = async () => {
  console.log("Départ");
  try {
    const { data } = await axios.post("/checkPresence", {
      donne: cryptage(JwtService.getUserPersonnel()),
    });
    console.log("data", data);
    if (data.code == 201) {
      if (!data.data) {
        etatPresence.value = "Aucune Présence";
      }
      //success(data.message)
      if (
        data.data &&
        data.data.heureArrivee != "" &&
        data.data.heureDepart == ""
      ) {
        etatPresence.value = "Présent";
      }
      if (data.data && data.data.heureDepart != "") {
        etatPresence.value = "Fini";
      }
      console.log("Data data ", etatPresence.value);

      etatPresepeutMarquerPresencence.value =
        etatPresence.value == "Aucune Présence" ||
        (etatPresence.value != "Présent" && etatPresence.value != "Fini");
      peutPartir.value =
        etatPresence.value != "Fini" && etatPresence.value == "Présent";
    }
  } catch (er) {
    console.log("Erreur lors de la récupération de ma présence", er);
    error(er.message);
  }
};

onMounted(() => {
  checkPresence();
});
</script>