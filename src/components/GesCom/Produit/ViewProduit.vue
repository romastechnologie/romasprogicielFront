<template>
  <div class="row">
      <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
        <div class="card mb-25 border-0 rounded-0">
          <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
              <h4 class="position-relative text-black fw-bold mb-10">Informations générales</h4>
              <router-link to="/produits/liste-produits" 
              class=" btn btn-primary transition border-0 lh-1 fw-medium">
              <i class="flaticon-left-arrow  lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative"></span>Retour</router-link>
            </div>
            <table class="table">
              <tbody>
                <tr>
                  <td>Référence</td>
                  <td>{{ produit?.refProd }}</td>
                </tr>
                <tr>
                  <td>Mode Prix</td>
                  <td>{{ produit?.modeDefPrix}}</td>
                </tr>
                <tr>
                  <td>Famille</td>
                  <td>{{ produit?.famille.libelleFamille }}</td>
                </tr>
                <tr>
                  <td>Nom du Produit</td>
                  <td>{{ produit?.nomProd }}</td>
                </tr>
                <tr>
                  <td>Magasin par Defaut</td>
                  <td>{{ produit?.magasin }}</td>
                </tr>
                <tr>
                  <td>Méthode de Gestion</td>
                  <td>{{ produit?.methode }}</td>
                </tr>
                <tr>
                  <td>Prix de Vente</td>
                  <td>{{ produit?.prixVente }}</td>
                </tr>
                <tr>
                  <td>Seuil d'approvisionnement</td>
                  <td>{{ produit?.seuilAppro}}</td>
                </tr>
                <tr>
                  <td>Seuil alerte</td>
                  <td>{{ produit?.seuilAlerte }}</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>{{ produit?.descProd }}</td>
                </tr>
                
                <p>CONDITIONNEMENT DU PRODUIT</p>
                
                <tr>
                  <td>CONDITIONNEMENT</td>
                  <td>{{ conditionnement?.conditionnement }}</td>
                </tr>

                <tr>
                <td>Quantité</td>
                  <td>{{ conditionnement?.quantite }}</td>
                </tr>

                <tr>
                <td>Prix Min</td>
                  <td>{{ conditionnement?.prixMin }}</td>
                </tr>

                <tr>
                <td>Prix Vente</td>
                  <td>{{ conditionnement?.prixVente }}</td>
                </tr>

                <tr>
                <td>Prix Max</td>
                  <td>{{ conditionnement?.prixMax }}</td>
                </tr>

                
                <tr>
                <td>Image</td>
                  <td>{{ image?.urlImage}}</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import { Produit } from "@/models/Produit";
import { error, format_Date, showModal } from "@/utils/utils";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ViewProduit",
  setup: () => {
    const route = useRoute();
    const produit = ref<Produit | null>(null);

    function getProduit(id: string) {
      return ApiService.get("/produits", id)
        .then(({ data }) => {
          produit.value = data.data; 
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    } 
    onMounted(() => {
      const id = route.params.id as string;
      getProduit(id);
    });

    return { 
      produit,
      getProduit,
      format_Date,
     };
  },
});
</script>
