<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form
        @submit="addVente"
        :validation-schema="venteSchema"
        :keep-values="valuess"
      >
        <div class="row">
          <div class="col-md-3">
            <div class="form-group mb-5 mb-sm-5 mb-md-5">
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
          <div class="col-md-3">
            <div class="form-group mb-5 mb-sm-5 mb-md-5">
              <label class="d-block text-black fw-semibold">
                Montant HT
              </label>
              <Field
                name="montantHT"
                :readonly="true"
                type="text"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder=""
              />
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group mb-5 mb-sm-5 mb-md-5">
              <label class="d-block text-black fw-semibold">
                Montant HT RSE
              </label>
              <Field
                name="montantHTRSE"
                :readonly="true"
                type="text"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder=""
              />
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group mb-5 mb-sm-5 mb-md-5">
              <label class="d-block text-black fw-semibold">
                Montant TVA
              </label>
              <Field
                name="montantTVA"
                :readonly="true"
                type="text"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder=""
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group mb-5 mb-sm-5 mb-md-5">
              <label class="d-block text-black fw-semibold">
                Montant AIB
              </label>
              <Field
                name="montantAIB"
                :readonly="true"
                type="text"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder=""
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group mb-5 mb-sm-5 mb-md-5">
              <label class="d-block text-black fw-semibold">
                Montant Taxe S.
              </label>
              <Field
                name="montanTS"
                :readonly="true"
                type="text"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder=""
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group mb-5 mb-sm-5 mb-md-5">
              <label class="d-block text-black fw-semibold">
                Montant TTC
              </label>
              <Field
                name="montantTTC"
                :readonly="true"
                type="text"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder=""
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group mb-5 mb-sm-5 mb-md-5">
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
          <div class="col-md-4">
            <div class="form-group mb-5 mb-sm-5 mb-md-5">
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
                  placeholder="Sélectionner le mode de prix"
                />
              </Field>
            </div>
            <ErrorMessage name="modePrix" class="text-danger" />
          </div>
          <div class="col-md-4">
            <div class="form-group mb-5 mb-sm-5 mb-md-5">
              <label class="d-block text-black fw-semibold">
                Client <span class="text-danger">*</span>
                <a
                  style="float: right"
                  v-if="!selectedClient"
                  class="btn btn-success me-3"
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
                  class="btn btn-success me-3"
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
          <div class="col-md-4">
            <div class="form-group mb-5 mb-sm-5 mb-md-5">
              <label class="d-block text-black fw-semibold">
                TAUX AIB <span class="text-danger">*</span>
              </label>
              <Field name="tauxAIB" v-slot="{ field }">
                <Multiselect
                  :options="['1%', '5%']"
                  :searchable="true"
                  track-by="label"
                  label="label"
                  v-model="field.value"
                  v-bind="field"
                  placeholder="Sélectionner le taux"
                />
              </Field>
            </div>
            <ErrorMessage name="tauxAIB" class="text-danger" />
          </div>
          <div class="col-md-4" v-if="showC">
            <div class="form-group mb-5 mb-sm-5 mb-md-5">
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
          <div class="col-md-4" v-if="showC">
            <div class="form-group mb-5 mb-sm-5 mb-md-5">
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

          <div class="col-md-12 mb-md-25 mt-15">
            <div class="accordion" id="basicAccordion">
              <div class="accordion-item mb-0 bord1">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#basicCollapseOne"
                    aria-expanded="false"
                    aria-controls="basicCollapseOne"
                  >
                    Ajouter les produits demandés par le client avec la quantité
                  </button>
                </h2>
                <div
                  id="basicCollapseOne"
                  class="accordion-collapse collapse"
                  data-bs-parent="#basicAccordion"
                >
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
                        tabindex="0"
                      >
                        <div class="row">
                          <div class="border border-primary mb-5">
                            <div
                              class="row d-flex align-items-center justify-content-between fw-bold py-2"
                              style="background-color: #0a59a4"
                            >
                              <div class="col-md-7">
                                <h3 class="fs-4 text-white">
                                  Ajouter le produit
                                </h3>
                              </div>
                              <div class="col-md-5">
                                <div class="d-flex float-end">
                                  <button
                                    class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                                    type="button"
                                    :class="{ 'cursor-not-allowed': isDisable }"
                                    :disabled="isDisable"
                                    @click="addRowProduit()"
                                  >
                                  <i class="fa fa-plus-circle"></i>
                                    Ajouter un produit
                                  </button>
                                  <!-- <router-link
                                      to="/liste-mouvements"
                                    ></router-link> -->
                                </div>
                              </div>
                            </div>
                            <div>
                              <div class="card-body p-15 p-sm-20 p-md-25">
                                <div class="table-responsive">
                                  <table
                                    class="table table-fixed text-nowrap align-middle mb-0"
                                  >
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
                                        <th
                                          scope="col"
                                          class=""
                                        >
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
                                        <th scope="col" class="stock">
                                          Stock
                                        </th>
                                        <th scope="col" class="actions pe-0">
                                          ACTIONS
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr v-for="(produit, index) in produits" :key="index">
                                        <td class="produit-col">
                                          <Multiselect
                                            :options="produitOptions"
                                            :searchable="true"
                                            track-by="label"
                                            label="label"
                                            v-model="produit.produit"
                                            placeholder=""
                                            @select="
                                            selectProd(produit.produit, produit)
                                          "
                                          />
                                          <span class="invalid-feedback" v-if="validateRowProduit(produit.produit)">
                                            Le produit est obligatoire.
                                          </span>
                                        </td>
                                        <td class="quantite-col">
                                          <input
                                            type="text"
                                            v-model="produit.qtite"
                                            :class="validateRowProduit(produit.qtite) ? 'form-control is-invalid' : 'form-control'"
                                            placeholder="Entrer la quantité"
                                          />
                                          <span class="invalid-feedback" v-if="validateRowProduit(produit.qtite)">
                                            La quantité est obligatoire.
                                          </span>
                                        </td>
                                        <td class="prix-unitaire-col">
                                          <input
                                            type="text"
                                            v-model="produit.prixUnitaire"
                                            :class="validateRowProduit(produit.prixUnitaire) ? 'form-control is-invalid' : 'form-control'"
                                            placeholder="Entrer le prix"
                                          />
                                          <span class="invalid-feedback" v-if="validateRowProduit(produit.prixUnitaire)">
                                            Le prix est obligatoire.
                                          </span>
                                        </td>
                                        <td class="taxe-col">
                                          <input
                                            type="text"
                                            v-model="produit.prixHT"
                                            :readonly="true"
                                            class="form-control"
                                            placeholder=""
                                          />
                                          <span class="invalid-feedback"></span>
                                        </td>
                                        <td class="taxe-col">
                                          <input
                                            type="text"
                                            v-model="produit.montantHT"
                                            :readonly="true"
                                            class="form-control"
                                            placeholder=""
                                          />
                                          <span class="invalid-feedback"></span>
                                        </td>
                                        <td class="taxe-col">
                                          <input
                                            type="text"
                                            v-model="produit.taxe"
                                            class="form-control"
                                            placeholder=""
                                          />
                                          <span class="invalid-feedback"></span>
                                        </td>
                                        <td class="type-rse-col">
                                          <Multiselect
                                            :options="['%', 'MT']"
                                            :searchable="true"
                                            track-by="label"
                                            label="label"
                                            v-model="produit.typeRSE"
                                            placeholder=""
                                          />
                                          <span class="invalid-feedback" v-if="validateRowProduit(produit.typeRSE)">
                                            Le type est obligatoire.
                                          </span>
                                        </td>
                                        <td class="vente-rse-col">
                                          <input
                                            type="text"
                                            v-model="produit.venteRSE"
                                            :class="validateRowProduit(produit.venteRSE) ? 'form-control is-invalid' : 'form-control'"
                                            placeholder=""
                                          />
                                          <span class="invalid-feedback" v-if="validateRowProduit(produit.venteRSE)">
                                            La vente est obligatoire.
                                          </span>
                                        </td>
                                        <td class="taxe-col">
                                          <input
                                            type="text"
                                            v-model="produit.remise"
                                            :readonly="true"
                                            class="form-control"
                                            placeholder=""
                                          />
                                          <span class="invalid-feedback"></span>
                                        </td>
                                        <td class="taxe-col">
                                          <input
                                            type="text"
                                            v-model="produit.montantHTRemise"
                                            :readonly="true"
                                            class="form-control"
                                            placeholder=""
                                          />
                                          <span class="invalid-feedback"></span>
                                        </td>
                                        <td class="taxe-col">
                                          <input
                                            type="text"
                                            v-model="produit.montantTVA"
                                            :readonly="true"
                                            class="form-control"
                                            placeholder=""
                                          />
                                          <span class="invalid-feedback"></span>
                                        </td>
                                        <td class="taxe-col">
                                          <input
                                            type="text"
                                            v-model="produit.montantTTC"
                                            :readonly="true"
                                            class="form-control"
                                            placeholder=""
                                          />
                                          <span class="invalid-feedback"></span>
                                        </td>
                                        <td class="magasin-col">
                                          <Multiselect
                                            :options="magasin1Options"
                                            :searchable="true"
                                            track-by="label"
                                            label="label"
                                            v-model="produit.magasin"
                                            placeholder=""
                                          />
                                          <span class="invalid-feedback" v-if="validateRowProduit(produit.magasin)">
                                            Le magasin est obligatoire.
                                          </span>
                                        </td>
                                        <td class="stock-col">
                                          <p>0</p>
                                        </td>
                                        
                                        <td class="actions-col pe-0">
                                          <div class="button-container" style="white-space: nowrap">
                                            <!-- <a
                                              @click="showDetail(produit.produit)"
                                              class="btn btn-icon"
                                              href="#"
                                              data-bs-toggle="modal"
                                              data-bs-target="#ViewProduitModal"
                                            >
                                              <i class="text-primary flaticon-eye position-relative"></i>
                                            </a> -->
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
                                class="row d-flex align-items-center justify-content-between mt-10"
                              >
                                <div class="col-md-3">
                                  <label class="d-block text-black fw-semibold">
                                    Titre <span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-3">
                                  <label class="d-block text-black fw-semibold"
                                    >Description</label
                                  >
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
              </div>
            </div>
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
            <!-- <div class="d-flex align-items-center">
              <button
                class="btn btn-success me-3"
                type="submit"
                :disabled="isDisable"
                :class="{ 'cursor-not-allowed': isDisable || isDisableElement }"
              >
                Ajouter une vente
              </button>
              <router-link
                to="/liste-ventes"
                class="btn btn-danger"
                ><i
                  class="fa fa-trash-o lh-1 me-1 position-relative top-2"
                ></i>
                <span class="position-relative"></span>Annuler</router-link
              >
            </div> -->
          </div>
          </div>
        </div>
      </Form>
    </div>
  </div>

  <!-- <div
    class="modal fade createNewModal"
    id="ViewProduitModal"
    tabindex="-1"
    ref="addViewProduitModalRef"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 v-if="produitShow" class="modal-title fw-bold text-black">
            Informations supplémentaires sur: {{ produitShow.split("|")[1] }}
          </h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <div class="card-body p-15 p-sm-20 p-md-25">
            <div class="table-responsive">
              <table class="table text-nowrap align-middle mb-0">
                <thead>
                  <tr>
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
                    <th
                      scope="col"
                      class=""
                    >
                      Remise
                    </th>
                    <th
                      scope="col"
                      class=""
                    >
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
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="produitShow">
                    <td class="col-md-6">aa</td>

                    <td class="col-md-6">aa</td>

                    <td class="col-md-6">aa</td>

                    <td class="col-md-6">aa</td>

                    <td class="col-md-6">aa</td>
                    <td class="col-md-6">aa</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button
          type="button"
          class="btn-close shadow-none"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div> -->

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
      typeCommande: Yup.string().required(
        "Le type de commande est obligatoire"
      ),
      typeFacture: Yup.string().required("Le type de facture est obligatoire"),
      tauxAIB: Yup.string().required("Le taux est obligatoire"),
      montantRecu: Yup.string().when([], (value, schema) => {
        return showC.value
          ? schema.required("Le montant est obligatoire")
          : schema.notRequired();
      }),
      //   produits: Yup.array().of(
      //     Yup.object().shape({
      //         produit: Yup.string().required('Le produit est obligatoire'),
      //         qtite: Yup.number().required('La quantité est obligatoire').min(1, 'La quantité doit être supérieure à 0'),
      //         prixUnitaire: Yup.number().required('Le prix unitaire est obligatoire'),
      //         taxe: Yup.number().required('La taxe est obligatoire'),
      //         typeRSE: Yup.string().required('Le type RSE est obligatoire'),
      //         venteRSE: Yup.string().required('Le type RSE est obligatoire'),
      //         magasin: Yup.string().required('Le magasin est obligatoire')
      //     })
      // )
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
        const response = await axios.get("/produits");
        const produitsData = response.data.data.data;
        produitsss.value = produitsData;
        produitOptions.value = produitsData.map((produit) => ({
          value: produit.id + "|" + produit.nomProd + "|" + produit.prixVente,
          label: `${produit.refProd} - ${produit.nomProd}`,
        }));
      } catch (error) {
        //
      }
    };

    const selectProd = (selectedProduit, produit) => {
      produit.qtite = 1;
      produit.prixUnitaire = selectedProduit.split("|")[2];
      // produit.prixUnitaire = selectedProduit.split("|")[3];
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
      values.produits = produits.map((produit) => ({
        produit: produit.produit.split("|")[0],
        prixUnitaire: produit.prixUnitaire,
        qtite: produit.qtite,
        taxe: produit.taxe,
        typeRSE: produit.typeRSE,
        venteRSE: produit.venteRSE,
        magasin: produit.magasin,
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

    const produits = reactive([
      {
        produit: "",
        qtite: 0,
        prixUnitaire: 0,
        taxe: 0,
        typeRSE: "",
        venteRSE: "",
        montantTVA: 0,
        montantTTC: 0,
        stock: 0,
        montantHT: "",
        prixHT: "",
        magasin: "",
        remise: "",
        montantHTRemise: "",
      },
    ]);

    const addRowProduit = () => {
      produits.push({
        produit: "",
        qtite: 0,
        prixUnitaire: 0,
        taxe: 0,
        typeRSE: "",
        venteRSE: "",
        montantTVA: 0,
        montantTTC: 0,
        magasin: "",
        stock: 0, 
        montantHT: "",
        prixHT: "",
        remise: "",
        montantHTRemise: "",
      });
    };

    const removeRowProduit = (index) => {
      if (produits.length > 1) produits.splice(index, 1);
    };

    const validateRowProduit = (value) => {
      return !value || value <= 0;
    };

    watch(
      produits,
      (newValue) => {
        isDisable.value = newValue.some(
          (produit) =>
            validateRowProduit(produit.produit) ||
            validateRowProduit(produit.qtite) ||
            validateRowProduit(produit.prixUnitaire) ||
            validateRowProduit(produit.venteRSE) ||
            validateRowProduit(produit.magasin)
        );
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

    return {
      venteSchema,
      addVente,
      venteForm,
      magasin1Options,
      produits,
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

/* 
.table-fixed {
  width: 100%;
  table-layout: fixed;
}

.table-fixed th,
.table-fixed td {
  vertical-align: middle;
  padding: 12px 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.table-fixed th {
  background-color: #f8f9fa;
  text-transform: uppercase;
  font-weight: 500;
  color: #495057;
  border-bottom: 1px solid #e9ecef;
}

.table-fixed td {
  background-color: #fff;
  border-bottom: 1px solid #e9ecef;
}

.table-fixed .form-control {
  border-radius: 0;
  box-shadow: none;
  border-color: #ced4da;
}

.table-fixed th.produit,
.table-fixed td.produit,
.table-fixed th.quantite,
.table-fixed td.quantite,
.table-fixed th.prix-unitaire,
.table-fixed td.prix-unitaire,
.table-fixed th.taxe,
.table-fixed td.taxe,
.table-fixed th.type-rse,
.table-fixed td.type-rse,
.table-fixed th.vente-rse,
.table-fixed td.vente-rse,
.table-fixed th.montant-tva,
.table-fixed td.montant-tva,
.table-fixed th.montant-ttc,
.table-fixed td.montant-ttc,
.table-fixed th.magasin,
.table-fixed td.magasin 
.table-fixed th.stock,

.table-fixed th.actions,
.table-fixed td.actions {
  width: 100px;
}

.table-fixed .Multiselect {
  width: 100%;
}

.table-fixed .form-control {
  width: 100%;
}

.table-fixed .form-control.is-invalid {
  border-color: #e3342f;
}

.table-fixed .invalid-feedback {
  display: block;
  color: #e3342f;
}

.table-hover tbody tr:hover td {
  background-color: #f1f1f1;
}

.btn {
  transition: background-color 0.3s, color 0.3s;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}

.button-container {
  display: flex;
  align-items: center;
}

.btn-icon {
  padding: 0.5rem 0.8rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.btn-icon:hover {
  background-color: #f0f0f0;
}

.flaticon {
  font-size: 1.2rem;
} */
</style>
