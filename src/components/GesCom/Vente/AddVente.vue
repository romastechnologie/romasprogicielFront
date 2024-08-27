<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form
        @submit="addVente"
        :validation-schema="venteSchema"
        :keep-values="valuess">
        <div class="row gx-1">
          <div class="col">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold">
                Date commande
              </label>
              <Field
                name="refProd"
                :readonly="true"
                :value="getCurrentDate()"
                type="date"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder=""
              />
            </div>
          </div>
          <div class="col">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold">
                Montant HT
              </label>
              <Field
                v-model="totalsomme"
                name="montantHT"
                :readonly="true"
                type="text"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder=""
              />
            </div>
          </div>
          <div class="col">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold">
                Montant HT RSE
              </label>
              <Field
                v-model="totalsommeremise"
                name="montantHTRSE"
                :readonly="true"
                type="text"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder=""
              />
            </div>
          </div>
          <div class="col">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold">
                Montant TVA
              </label>
              <Field
                v-model="totaltva"
                name="montantTVA"
                :readonly="true"
                type="text"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder=""
              />
            </div>
          </div>
          <div class="col">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold">
                Montant AIB
              </label>
              <Field
                v-model="totalaib"
                name="montantAIB"
                :readonly="true"
                type="text"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder=""
              />
            </div>
          </div>
          <div class="col">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold">
                Montant Taxe S.
              </label>
              <Field
                v-model="totalts"
                name="montanTS"
                :readonly="true"
                type="text"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder=""
              />
            </div>
          </div>
          <div class="col">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold">
                Montant TTC
              </label>
              <Field
                v-model="totalttc"
                name="montantTTC"
                :readonly="true"
                type="text"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder=""
              />
            </div>
          </div>
        </div>
        <div class="row gx-1">
          <div class="col-md-2">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold">
                Type Commande <span class="text-danger">*</span>
              </label>
              <Field name="typeCommande" v-model="typeC" v-slot="{ field }">
                <Multiselect
                  :options="['Au comptoir', 'Sur commande']"
                  :searchable="true"
                  track-by="label"
                  label="label"
                  v-model="field.value"
                  v-bind="field"
                  placeholder="Sélectionner le groupe de taxe"
                  @select="showHide(field.value)"
                />
              </Field>
            </div>
            <ErrorMessage name="groupeTaxe" class="text-danger" />
          </div>
          <div class="col-md-2">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold">
                Type Facture <span class="text-danger">*</span>
              </label>
              <Field name="typeFacture" v-slot="{ field }">
                <Multiselect
                  :options="[
                    'Facture de vente',
                    'Facture de vente à l\'exportation',
                    'Facture proforma',
                  ]"
                  :searchable="true"
                  track-by="label"
                  label="label"
                  v-model="field.value"
                  v-bind="field"
                  placeholder="Sélectionner"
                />
              </Field>
            </div>
            <ErrorMessage name="modePrix" class="text-danger" />
          </div>
          <div class="col-md-3">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold">
                Client <span class="text-danger">*</span>
                <a
                  style="float: right"
                  v-if="!selectedClient"
                  class="btn btn-success me-3 btn-xs b-r-6"
                  data-bs-toggle="modal"
                  data-bs-target="#AddClientModal"
                  @click="toggleAbonne"
                >
                  <i class="fa fa-plus-circle"></i>
                  Ajouter un client
                </a>
                <button
                  style="float: right"
                  v-if="selectedClient"
                  class="btn btn-success me-3 btn-xs"
                  @click="toggleAbonne"
                >
                  <i class="fa fa-plus-circle"></i>
                  Rechercher un client
                </button>
              </label>
              <Field
                name="client"
                v-slot="{ field }"
                v-if="!selectedClient"
                v-model="clientCharger"
              >
                <Multiselect
                  :options="clientOptions"
                  :searchable="true"
                  track-by="label"
                  label="label"
                  v-model="field.value"
                  v-bind="field"
                  placeholder="Sélectionner le client"
                />
              </Field>
              <Field
                name="client"
                v-model="selectedClientId"
                v-slot="{ field }"
                v-else
              >
                <Multiselect
                  v-model="field.value"
                  :options="clientsOps"
                  placeholder="Sélectionner un client"
                />
              </Field>
            </div>
            <ErrorMessage name="client" class="text-danger" />
          </div>
          <div class="col-md-1">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold">
                TAUX AIB <span class="text-danger">*</span>
              </label>
              <Field name="tauxAIB" v-model="valeurAib" v-slot="{ field }">
                <Multiselect
                  :options="['1%','3%','5%']"
                  :searchable="true"
                  track-by="label"
                  label="label"
                  v-model="field.value"
                  v-bind="field"
                  placeholder="Choisir"
                />
              </Field>
            </div>
            <ErrorMessage name="tauxAIB" class="text-danger" />
          </div>
          <div class="col-md-2" v-if="showC">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold">
                Montant Reçu <span class="text-danger">*</span>
              </label>
              <Field
                name="montantRecu"
                type="text"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer le montant"
              />
              <ErrorMessage name="montantRecu" class="text-danger" />
            </div>
          </div>
          <div class="col-md-2" v-if="showC">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold">
                Reliquat <span class="text-danger">*</span>
              </label>
              <Field
                name="reliquat"
                type="text"
                :readonly="true"
                class="form-control shadow-none fs-md-15 text-black"
              />
              <ErrorMessage name="reliquat" class="text-danger" />
            </div>
          </div>

        
          <div class="col-md-12 mb-md-25">
                  <div class="accordion-body">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link active"
                          id="home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#home-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="home-tab-pane"
                          aria-selected="true"
                        >
                          Produit
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
                          id="home2-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#home2-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="home2-tab-pane"
                          aria-selected="false"
                        >
                          Elément
                        </button>
                      </li>
                    </ul>

                    <div class="tab-content" id="myTabContent">
                      <div
                        class="tab-pane fade show active p-10"
                        id="home-tab-pane"
                        role="tabpanel"
                        tabindex="0">
                        <div class="row gx-2">
                          <div class="border border-primary mb-5">
                            <div class="row gx-2 d-flex align-items-center justify-content-between fw-bold py-2 bg-primary">
                              <div class="col-md-7">
                                <h4 class="fs-6 text-white">
                                  Ajouter le produit
                                </h4>
                              </div>
                              <div class="col-md-5">
                                <div class="d-flex float-end">
                                  <button
                                    class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                                    type="button"
                                    :class="{ 'cursor-not-allowed': isDisable }"
                                    :disabled="isDisable"
                                    @click="addRowProduit()">
                                  <i class="fa fa-plus-circle"></i>
                                    Ajouter un produit
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div class="card-body p-1">
                                <div>
                                  <div class="row gx-1">
                                  <div class="col-4">
                                    <label class="d-block text-black fw-semibold">
                                      Produit
                                    </label>
                                    <Multiselect
                                      :options="produitOptions"
                                      :searchable="true"
                                      track-by="label"
                                      label="label"
                                      v-model="produit.produit"
                                      placeholder="Selectionnez le produit"
                                      @select="selectProd(produit.produit, produit)"
                                    />
                                    <span class="invalid-feedback" v-if="validateRowProduit(produit.produit)">
                                      Champ obligatoire
                                    </span>
                                  </div>
                                  <div class="col">
                                    <label class="d-block text-black fw-semibold"  >
                                      Quantité
                                    </label>
                                    <input
                                      type="text"
                                      v-model="produit.qtite"
                                      :class="validateRowProduit(produit.qtite) ? 'form-control is-invalid' : 'form-control'"
                                      placeholder="Entrer la quantité"
                                      @keyup="eventProduit"/>
                                    <span class="invalid-feedback" v-if="validateRowProduit(produit.qtite)">
                                      Champ obligatoire
                                    </span>
                                  </div>
                                  <div class="col">
                                    <label class="d-block text-black fw-semibold" >
                                      Prix unitaire
                                    </label>
                                    <input
                                      type="text"
                                      v-model="produit.prixTtc"
                                      :class="validateRowProduit(produit.prixTtc) ? 'form-control is-invalid' : 'form-control'"
                                      placeholder="Entrer le prix"
                                      @keyup="eventProduit"/>
                                    <span class="invalid-feedback" v-if="validateRowProduit(produit.prixTtc)">
                                      Champ obligatoire
                                    </span>
                                  </div>
                                  <div class="col">
                                    <label class="d-block text-black fw-semibold">
                                      Prix HT
                                    </label>
                                    <input
                                      type="text"
                                      v-model="produit.prixHt"
                                      :readonly="true"
                                      class="form-control"
                                      placeholder=""
                                    />
                                    <span class="invalid-feedback"></span>
                                  </div>
                                  <div class="col">
                                    <label class="d-block text-black fw-semibold">
                                      Montant HT
                                    </label>
                                    <input
                                      type="text"
                                      v-model="produit.montantHt"
                                      :readonly="true"
                                      class="form-control"
                                      placeholder=""
                                    />
                                    <span class="invalid-feedback"></span>
                                  </div>
                                  <div class="col">
                                    <label class="d-block text-black fw-semibold">
                                      Taxe S.
                                    </label>
                                    <input
                                      type="text"
                                      v-model="produit.taxeSpecifique"
                                      class="form-control"
                                      placeholder=""
                                      @keyup="eventProduit"
                                    />
                                    <span class="invalid-feedback"></span>
                                  </div>
                                  
                                </div>
                                <div class="row gx-1">
                                  <div class="col-1">
                                    <label class="d-block text-black fw-semibold">
                                      Type RSE
                                    </label>
                                    <Multiselect
                                      :options="['%', 'MT']"
                                      :searchable="true"
                                      track-by="label"
                                      label="label"
                                      v-model="produit.typeRemise"
                                      placeholder="..."
                                      @select="eventProduit"
                                    />
                                  </div>
                                  <div class="col">
                                    <label class="d-block text-black fw-semibold">
                                      Valeur remise
                                    </label>
                                    <input
                                      type="text"
                                      v-model="produit.valeurRemise"
                                      class="form-control"
                                      placeholder=""
                                      @keyup="eventProduit"
                                    />
                                  </div>
                                  <div class="col">
                                    <label class="d-block text-black fw-semibold">
                                      MT Remise
                                    </label>
                                    <input
                                      type="text"
                                      v-model="produit.remise"
                                      :readonly="true"
                                      class="form-control"
                                      placeholder=""
                                    />
                                    <span class="invalid-feedback"></span>
                                  </div>
                                  <div class="col">
                                    <label class="d-block text-black fw-semibold">
                                      MT. HT Ap Rse
                                    </label>
                                    <input
                                      type="text"
                                      v-model="produit.montantHtApresRemise"
                                      :readonly="true"
                                      class="form-control"
                                      placeholder=""
                                    />
                                    <span class="invalid-feedback"></span>
                                  </div>
                                  <div class="col">
                                    <label class="d-block text-black fw-semibold">
                                      MT. TVA
                                    </label>
                                    <input
                                      type="text"
                                      v-model="produit.montantTva"
                                      :readonly="true"
                                      class="form-control"
                                      placeholder=""
                                    />
                                    <span class="invalid-feedback"></span>
                                  </div>
                                  <div class="col">
                                    <label class="d-block text-black fw-semibold">
                                      MT. TTC
                                    </label>
                                    <input
                                      type="text"
                                      v-model="produit.montantTtc"
                                      :readonly="true"
                                      class="form-control"
                                      placeholder=""
                                    />
                                    <span class="invalid-feedback"></span>
                                  </div>
                                  <div class="col">
                                    <label class="d-block text-black fw-semibold">
                                      Magasin
                                    </label>
                                    <Multiselect
                                      :options="magasin1Options"
                                      :searchable="true"
                                      track-by="label"
                                      label="label"
                                      v-model="produit.magasin"
                                      placeholder=""
                                    />
                                    <span class="invalid-feedback" v-if="validateRowProduit(produit.magasin)">
                                      Champ obligatoire
                                    </span>
                                  </div>
                                  
                                  <div class="col">
                                    <label class="d-block text-black fw-semibold">
                                      Stock
                                    </label>
                                    <p class="mb-1">Logigique: 0</p>
                                    <p class="pt-0">Physique: 0</p>
                                  </div>
                                  <!-- <div class="col pe-0">
                                    <label class="d-block text-black fw-semibold">
                                      ACTIONS
                                    </label>
                                    <div class="button-container" style="white-space: nowrap">
                                      <button
                                        type="button"
                                        class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                        @click="removeRowProduit(index)"
                                      >
                                      <i class="icofont icofont-ui-delete"></i>
                                      </button>
                                    </div>
                                  </div> -->
                                </div>
                              </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade p-10"
                        id="home2-tab-pane"
                        role="tabpanel"
                        tabindex="0"
                      >
                        <div class="row">
                          <div class="border border-primary mb-5">
                            <div
                              class="row d-flex align-items-center justify-content-between fw-bold py-2"
                              style="background-color: #0a59a4 !important"
                            >
                              <div class="col-md-7">
                                <h3 class="fs-4 text-white">
                                  Entête de la facture
                                </h3>
                              </div>
                              <div class="col-md-5">
                                <div class="d-flex float-end">
                                  <button
                                    class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                                    type="button"
                                    :class="{
                                      'cursor-not-allowed': isDisableElement,
                                    }"
                                    :disabled="isDisableElement"
                                    @click="addRowElement"
                                  >
                                    <i
                                      class="fa fa-plus-circle position-relative ms-5 fs-12"
                                    ></i>
                                    Ajouter une entête
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div
                                class="row d-flex align-items-center justify-content-between mt-10">
                                <div class="col-md-3">
                                  <label class="d-block text-black fw-semibold">
                                    Titre <span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-3">
                                  <label class="d-block text-black fw-semibold"
                                    >Description</label>
                                </div>
                                <div class="col-md-2">
                                  <label class="d-block text-black fw-semibold">
                                    Taille police
                                    <span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-3">
                                  <label class="d-block text-black fw-semibold">
                                    Alignement
                                    <span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-1">
                                  <label class="d-block text-black fw-semibold">
                                    Action
                                  </label>
                                </div>
                              </div>
                              <hr class="mt-0" />
                              <div
                                class="row mb-5"
                                v-for="(element, index) in elements"
                                :key="index"
                              >
                                <div class="col-md-3 mb-5">
                                  <Field
                                    name="titre"
                                    type="text"
                                    v-model="element.titre"
                                    class="form-control shadow-none fs-md-15 text-black"
                                    placeholder="Entrer le titre"
                                  />
                                  <div
                                    class="invalid-feedback"
                                    v-if="validateRowElement(element.titre)"
                                  >
                                    Le titre est obligatoire.
                                  </div>
                                </div>
                                <div class="col-md-3 mb-5">
                                  <Field
                                    name="description"
                                    type="text"
                                    v-model="element.description"
                                    class="form-control shadow-none fs-md-15 text-black"
                                    placeholder=""
                                  />
                                </div>
                                <div class="col-md-2 mb-5">
                                  <Field
                                    name="taillePolice"
                                    type="number"
                                    v-model="element.taillePolice"
                                    class="form-control shadow-none fs-md-15 text-black"
                                    placeholder=""
                                  />
                                </div>
                                <div class="col-md-2 mb-5">
                                  <Multiselect
                                    :options="['Centre', 'Gauche', 'Droite']"
                                    :searchable="true"
                                    track-by="label"
                                    label="label"
                                    v-model="element.alignement"
                                    placeholder=""
                                  />
                                </div>
                                <div class="col-md-1 mb-5">
                                  <button
                                    class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                    type="button"
                                    @click="removeRowElement(index)"
                                  >
                                  <i class="icofont icofont-ui-delete"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
          <div class="table-responsive">
            <table class="table table-fixed text-nowrap align-middle mb-0 table-bordered">
              <thead>
                <tr>
                  <th scope="col" class="produit">
                    Produit
                  </th>
                  <th scope="col" class="quantite">
                    Quantité
                  </th>
                  <th scope="col" class="prix-unitaire">
                    Prix unitaire
                  </th>
                  <th
                    scope="col"
                    class=""
                  >
                    Prix HT
                  </th>
                  <th
                    scope="col"
                    class=""
                  >
                    Montant HT
                  </th>
                  <th scope="col" class="taxe">
                    Taxe S.
                  </th>
                  <th scope="col" class="type-rse">
                    Type RSE
                  </th>
                  <th scope="col" class="vente-rse">
                    Vente / RSE
                  </th>
                  <th
                    scope="col"
                    class=""
                  >
                    MT Remise
                  </th>
                  <th scope="col">
                    MT. HT Ap Rse
                  </th>
                  <th
                    scope="col"
                    class=""
                  >
                    MT. TVA
                  </th>
                  <th
                    scope="col"
                    class=" text pe-0"
                  >
                    MT. TTC
                  </th>
                  <th scope="col" class="magasin">
                    Magasin
                  </th>
                  <th scope="col" class="actions pe-0">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(produit, index) in produits" :key="index">
                  <td class="produit-col">
                    {{ produit.libelleProduit }}
                  </td>
                  <td class="quantite-col">
                    {{ produit.qtite }}
                  </td>
                  <td class="prix-unitaire-col">
                    {{ produit.prixTtc }}
                  </td>
                  <td class="taxe-col">
                    {{ produit.prixHt }}
                  </td>
                  <td class="taxe-col">
                    {{produit.montantHt}}
                  </td>
                  <td class="taxe-col">
                    {{produit.taxeSpecifique}}
                  </td>
                  <td class="type-rse-col">
                    {{produit.typeRemise}}
                  </td>
                  <td class="vente-rse-col">
                    {{produit.valeurRemise}}
                  </td>
                  <td class="taxe-col">
                    {{produit.remise}}
                  </td>
                  <td class="taxe-col">
                    {{produit.montantHtApresRemise}}
                  </td>
                  <td class="taxe-col">
                    {{produit.montantTva}}
                  </td>
                  <td class="taxe-col">
                    {{produit.montantTtc}}
                  </td>
                  <td class="magasin-col">

                  </td>
                  <td class="actions-col pe-0">
                    <div class="button-container" style="white-space: nowrap">
                      <button
                        type="button"
                        class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                        @click="removeRowProduit(index)"
                      >
                      <i class="icofont icofont-ui-delete"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>   

          <div class="col-md-12 mt-5">
            
            <div class="row">
            <div class="col-md-2">
              <button
                class="btn btn-success me-3"
                type="submit"
                :disabled="isDisable"
                :class="{ 'cursor-not-allowed': isDisable || isDisableElement }"
              >
                Enregistrer
              </button>
            </div>

            <div class="col-md-3">
              <button
                class="btn btn-success me-3"
                type="button"
                :disabled="isDisable"
                :class="{ 'cursor-not-allowed': isDisable || isDisableElement }"
              >
                Enregistrer et imprimer
              </button>
            </div>

            <div class="col-md-2">
              <router-link
                to="/ventes/liste-ventes"
                class="btn btn-danger"
                ><i
                  class="fa fa-trash-o lh-1 me-1 position-relative top-2"
                ></i>
                <span class="position-relative"></span>Annuler</router-link
              >
            </div>
            
            <div class="col-md-3">
                <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Format impression
                </button>
                <ul class="dropdown-menu dropdown-block">
                <li><a class="dropdown-item" href="#">Format</a></li>
                </ul>
            </div>

              <div class="col-md-2">
                <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Modèle
                </button>
                <ul class="dropdown-menu dropdown-block">
                <li><a class="dropdown-item" href="#">Modèle 2</a></li>
                </ul>
            </div>
          </div>
          </div>
        </div>
      </Form>
    </div>
  </div>

  <AddClientModal @getclient="getClient" />
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, reactive } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useRouter } from "vue-router";
import ApiService from "@/services/ApiService";
import { Vente } from "@/models/Vente";
import * as Yup from "yup";
import axios from "axios";
import Multiselect from "@vueform/multiselect";
import AddClientModal from "./AddClientModal.vue";
import { ProduitSelect } from "@/models/Produit";

export default defineComponent({
  name: "AddVente",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
    AddClientModal,
  },
  setup: () => {
    const venteSchema = Yup.object().shape({
      typeCommande: Yup.string().required("Le type de commande est obligatoire"),
      typeFacture: Yup.string().required("Le type de facture est obligatoire"),
      tauxAIB: Yup.string().required("Le taux est obligatoire"),
      montantRecu: Yup.string().when([], (value, schema) => {
        return showC.value
          ? schema.required("Le montant est obligatoire")
          : schema.notRequired();
      }),
    });

    const venteForm = ref<Vente | null>(null);
    const router = useRouter();
    const magasin1Options = ref([]);
    const produitOptions = ref([]);
    const clientOptions = ref([]);
    const produitShow = ref(null);
    const selectedClient = ref(false);
    const toggleAbonne = () => {
      selectedClient.value = !selectedClient.value;
    };
    const selectedClientId = ref(0);
    const clientsOps = ref<Array<{ value: any; label: string }>>([]);
    const clientCharger = ref(null);

    const totalsomme = ref(0.0);
    const totalsommeremise = ref(0.0);
    const totaltva = ref(0.0);
    const totalts = ref(0.0);
    const totalttc = ref(0.0);
    const totalaib = ref(0.0);
    const valeurAib = ref(0);


    const produits = ref<Array<ProduitSelect>>([]);

    const getClient = async (values: {
      id: any;
      nomClient: string;
      prenomClient: string;
      raisonSociale: string;
    }) => {
      try {
        selectedClientId.value = values.id;
        const data = {
          value: values.id,
          label: values?.nomClient
            ? values?.nomClient + "" + values?.prenomClient
            : "" + values?.raisonSociale,
        };
        clientsOps.value = [...clientsOps.value, data];
        clientCharger.value = values.id;
        return clientsOps.value;
      } catch (error) {
        // Gérer l'erreur ici
      }
    };

    const fetchMagasin1 = async () => {
      try {
        const response = await ApiService.get("/magasins");
        const magasin1sData = response.data.data.data;
        magasin1Options.value = magasin1sData.map((magasin) => ({
          value: magasin.id,
          label: `${magasin.nomMagasin}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchProduits = async () => {
      try {
        const response = await axios.get("/produitconditionnements");
        const produitsData = response.data.data;
        produitsss.value = produitsData;
        produitOptions.value = produitsData.map((produitconditionnements) => ({
          value: produitconditionnements.id+"|"+ `${produitconditionnements.produit.nomProd} [ ${produitconditionnements.conditionnement.libelle} ]` + "|" + produitconditionnements.prixVenteHt +"|"+ produitconditionnements.prixVenteTtc,
          label: `${produitconditionnements.produit.nomProd} [ ${produitconditionnements.conditionnement.libelle} ]`,
        }));
      } catch (error) {
        //
      }
    };

    const selectProd = (selectedProduit, produit) => {
      console.log(selectedProduit,"selectedProduit");
      produit.qtite = 1;
      produit.prixTtc = selectedProduit.split("|")[3];
      produit.prixHt = selectedProduit.split("|")[2];
      produit.libelleProduit = selectedProduit.split("|")[1];
      produit.montantHt = produit.prixHt;
      produit.montantTva = produit.prixTtc - produit.prixHt;
      produit.montantTtc = produit.prixTtc;
      produit.montantTs = 0.0;
      produit.montantHtApresRemise = produit.prixHt;
    };

    const fetchClient = async () => {
      try {
        const response = await ApiService.get(
          `/clients/${selectedClientId.value}`
        );
        const clientData = response.data.data.data;
        console.log("clientData", clientData);
        clientsOps.value = clientData.map((client) => ({
          value: client.id,
          label: `${
            client?.nomClient
              ? client?.nomClient + "" + client?.prenomClient
              : client?.raisonSociale
          }`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchClients = async () => {
      try {
        const response = await ApiService.get(`/clients`);
        const clientData = response.data.data.data;
        console.log("clientData", clientData);
        clientOptions.value = clientData.map((client) => ({
          value: client.id,
          label: `${
            client?.nomClient
              ? client?.nomClient + "" + client?.prenomClient
              : client?.raisonSociale
          }`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchMagasin1();
      fetchProduits();
      // fetchClient();
      fetchClients();
    });

    const addVente = async (values, { resetForm }) => {
      values.produits = produits.value.map((produit) => ({
        produit: produit.produit.split("|")[0],
        typeRemise: produit.typeRemise,
        nomProd: produit.produit.split("|")[2],
      }));
      values.elements = elements.map((element) => ({
        titre: element.titre,
        description: element.description,
        taillePolice: element.taillePolice,
        alignement: element.alignement,
      }));
      console.log("Données envoyées", values);
      // ApiService.post("/ventes",values)
      //   .then(({ data }) => {
      //     if(data.code == 201) {
      //       success(data.message);
      //       resetForm();
      //       router.push({ name: "ListeVentePage" });
      //     }
      //   }).catch(({ response }) => {
      //     error(response.data.message);
      //   });
    };
    // formulaire dynamique start

    const showDetail = (prod) => {
      produitShow.value = prod;
    };

    const showC = ref(true);
    const typeC = ref("Au comptoir");

    function showHide(test) {
      console.log("test", test);
      if (test == "Sur commande") {
        showC.value = false;
        console.log("ff", showC.value);
      } else {
        showC.value = true;
        console.log("el", showC.value);
      }
    }

    const isDisable = ref(true);

    const produit = reactive(
      {
        commande_clit_id:"",
        magasin:"",
        produit: "",
        qtite: 0.0,
        prixTtc: 0.0,
        prixHt: 0.0,
        taxeSpecifique: 0.0,
        typeRemise: '',
        valeurRemise: 0.0,
        montantHt: 0.0,
        montantTva: 0.0,
        montantTtc: 0.0,
        montantTs:0.0,
        montantHtApresRemise: 0.0,
        libelleProduit:"",
        groupeTaxeProduit:"",
        carton: 0.0,
        piece: 0.0,
        stock: 0.0,
        remise: 0.0,
        restAliv: 0.0,
        taxe:1
      },
    );

    async function addRowProduit() {
      const tproduit = {...produit};
      produit.commande_clit_id="",
      produit.magasin="",
      produit.produit="",
      produit.qtite=0.0,
      produit.prixTtc=0.0,
      produit.prixHt=0.0,
      produit.taxeSpecifique=0.0,
      produit.typeRemise='',
      produit.valeurRemise=0.0,
      produit.montantHt=0.0,
      produit.montantTva=0.0,
      produit.montantTtc=0.0,
      produit.montantTs=0.0,
      produit.montantHtApresRemise=0.0,
      produit.libelleProduit="",
      produit.groupeTaxeProduit="",
      produit.carton=0.0,
      produit.piece=0.0,
      produit.stock=0.0,
      produit.remise=0.0,
      produit.restAliv=0.0;
      produit.taxe = 1;

      produits.value.push(tproduit);
      calculeDestotaux();
    }

    const removeRowProduit = (index) => {
      if (produits.value.length > 1) produits.value.splice(index, 1);
    };

    const validateRowProduit = (value) => {
      return !value || value <= 0;
    };

    watch(
      produit,
      (newValue) => {
        isDisable.value = validateRowProduit(newValue.produit) || validateRowProduit(newValue.qtite) || validateRowProduit(newValue.prixTtc);
        // newValue.some(
        //   (produit) =>
        //     validateRowProduit(newValue.produit) ||
        //     validateRowProduit(newValue.qtite) ||
        //     validateRowProduit(newValue.prixTtc)
        // );
      },
      { deep: true }
    );

    //Elements
    const isDisableElement = ref(true);

    const elements = reactive([
      {
        titre: "",
        description: "",
        taillePolice: 0,
        alignement: "",
      },
    ]);

    const addRowElement = () => {
      elements.push({
        titre: "",
        description: "",
        taillePolice: 0,
        alignement: "",
      });
    };

    const removeRowElement = (index) => {
      if (elements.length > 1) elements.splice(index, 1);
    };

    const validateRowElement = (value) => {
      return !value || value <= 0;
    };

    watch(
      elements,
      (newValue) => {
        isDisableElement.value = newValue.some(
          (element) =>
            validateRowElement(element.titre) ||
            validateRowElement(element.taillePolice) ||
            validateRowElement(element.alignement)
        );
      },
      { deep: true }
    );

    const produitsss = ref(null);
    const valuess = ref();

    const getCurrentDate = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      return `${year}-${month}-${day}`;
    };

    //calcule des totaux
    var calculeDestotaux = () => {
         totalsomme.value = 0.0;
         totalsommeremise.value = 0.0;
         totaltva.value = 0.0;
         totalts.value = 0.0;
         totalttc.value = 0.0;
         produits.value.forEach(produi => {
            if(produi.montantHt > 0){
                totalsomme.value += produit.montantHt;
            }
            if(produi.montantHtApresRemise > 0){
                totalsommeremise.value += produi.montantHtApresRemise;
            }
            if(produi.prixHt > 0){
                if(produi.taxe == 0) {
                    totaltva.value += 0;
                } else {
                    totaltva.value += (produi.prixTtc/1.18 )* 0.18 * produi.qtite;
                }
            }
            if(produi.montantTtc > 0){
                totalttc.value += produi.montantTtc;
            }
            if(produi.montantTs > 0){
                if(produi.taxe == 1){
                    totalts.value += produi.montantTs / 1.18;
                    totaltva.value += produi.montantTs / 1.18 * 0.18; 
                }else {
                    totalts.value += produi.montantTs;
                    totaltva.value += 0;
                }
            }
          });
        if(valeurAib.value  != 0) {
            totalaib.value = (totalsommeremise.value * valeurAib.value)/100
            totalttc.value += totalaib.value;
        }
    }

    const eventProduit =()=>{
        if(produit.prixTtc && produit.qtite) {
            let prixremise = produit.prixHt;
            if(produit.valeurRemise) {
              if(produit.typeRemise =='%' && produit.valeurRemise != 0) {
                produit.remise = (produit.prixHt*produit.valeurRemise)/100;
                prixremise = produit.prixHt- produit.remise;
              }else if(produit.typeRemise =='MT' && produit.valeurRemise !=0){
                produit.remise = produit.valeurRemise;
                prixremise = produit.prixHt-produit.remise; 
              }
            }
            let ts =  produit.taxeSpecifique;
            let ts_ht = 0;
            ts = isNaN(ts) ? 0 : ts;
            if(!isNaN(ts)){
                 ts_ht = ts /1.18;
                (produit.taxe != 0)  ? (ts_ht = (ts /1.18)) : (ts_ht = ts);
            }
            produit.montantHt = produit.prixHt*produit.qtite;
            produit.remise = produit.remise*produit.qtite;
            if(produit.taxe != 0) {
                produit.montantHtApresRemise = parseInt((((produit.prixHt / 1.18 )- produit.valeurRemise)*produit.qtite + ts_ht).toFixed(0));
                produit.montantTtc = parseInt(((((produit.prixTtc / 1.18) - produit.valeurRemise)*produit.qtite)*1.18).toFixed(0));
                produit.montantTva = parseInt((produit.montantTtc - (produit.prixTtc*produit.qtite/1.18) - produit.remise).toFixed(0));
            } else {
                produit.montantHtApresRemise= parseInt((((produit.prixTtc / 1.18)- produit.valeurRemise)*produit.qtite + ts_ht).toFixed(0));
                produit.montantTva = 0;
                produit.montantTtc = parseInt(((produit.prixTtc - produit.valeurRemise)*produit.qtite).toFixed(0));
            }
            produit.montantTtc = parseInt((produit.montantTtc + ts).toFixed(0));
        } 
    }

    return {
      totalsomme,
      totalsommeremise,
      totaltva,
      totalts,
      totalttc,
      totalaib ,
      valeurAib,
      venteSchema,
      addVente,
      venteForm,
      magasin1Options,
      produits,
      produit,
      eventProduit,
      removeRowProduit,
      removeRowElement,
      addRowProduit,
      addRowElement,
      validateRowProduit,
      validateRowElement,
      valuess,
      isDisable,
      isDisableElement,
      getCurrentDate,
      produitOptions,
      showDetail,
      produitsss,
      elements,
      showHide,
      showC,
      typeC,
      produitShow,
      clientOptions,
      toggleAbonne,
      clientsOps,
      clientCharger,
      selectedClientId,
      selectedClient,
      getClient,
      fetchClient,
      selectProd,
    };
  },
});
</script>

<style scoped>
.cursor-not-allowed {
  cursor: not-allowed;
}
.cursor-not-allowed {
  cursor: not-allowed;
}
.marge-droite {
  margin-left: 15px;
}
.hr-longeur {
  width: 80%;
}
.bord1 {
  border: 1px solid #07a;
}
.fond {
  background-color: rgb(94, 191, 233);
}
input[readonly] {
  background-color: #f0f0f0;
}


.table-responsive {
  overflow-x: auto;
}

.table thead th, .table tbody td {
  white-space: nowrap;
}

.produit-col,
.quantite-col,
.prix-unitaire-col,
.taxe-col,
.type-rse-col,
.vente-rse-col,
.magasin-col {
  min-width: 150px;
}

.actions-col {
  width: 120px;
}

.form-control {
  width: 100%;
}

label {
    margin-bottom: 0.2rem;
}
</style>
