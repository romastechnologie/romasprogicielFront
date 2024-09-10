<template>
  <div class="container-fluid">
        <div class="row">
            <div class="col-12">
            <div class="card">
                <div class="">
                    <div class="card-header"><h5 class="">Formulaire d'ajout de personnel</h5><!----><!----><!----></div>
                    <div class="card-body">
                        <div class="row g-xl-5 g-3">
                          <div class="col-xxl-3 col-xl-4 box-col-4e sidebar-left-wrapper">
                              <ul class="sidebar-left-icons nav nav-pills" ref="tabContainer" id="add-product-pills-tab" role="tablist">
                              </ul>
                          </div>
                            <div class="col-xxl-9 col-xl-8 box-col-8 position-relative">
                              <div class="tab-content" id="add-product-pills-tabContent">
                                <div v-if="currentStep === 1"  class="tab-pane fade show active" id="info-personnel" role="tabpanel" aria-labelledby="info-personnel-tab">
                                  <div class="sidebar-body">
                                    <div class="row g-2">
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Nom <span class="text-danger">*</span>
                                          </label>
                                          <Field name="nom" v-model="nom" type="text" class="form-control shadow-none fs-md-15 text-black"
                                            placeholder="Entrer le nom" />
                                          <ErrorMessage name="nom" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Prénom <span class="text-danger">*</span>
                                          </label>
                                          <Field name="prenom" v-model="prenom" type="text" class="form-control shadow-none fs-md-15 text-black"
                                            placeholder="Entrer le prenom" />
                                          <ErrorMessage name="prenom" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Sexe <span class="text-danger">*</span>
                                          </label>
                                          <Field name="sexe" v-model="sexe" type="text" v-slot="{ field }">
                                            <Multiselect :searchable="true" :options="['Masculin', 'Féminin']" v-model="field.value"
                                              v-bind="field" placeholder="Sélectionner le sexe" />
                                          </Field>
                                          <ErrorMessage name="sexe" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Situation matrimoniale <span class="text-danger">*</span>
                                          </label>
                                          <Field name="situationMatrimoniale" v-model="situation" type="text" v-slot="{ field }">
                                            <Multiselect :searchable="true" :options="['Célibataire', 'Mariée', 'Divorcée', 'Veuve']"
                                              v-model="field.value" v-bind="field" placeholder="Sélectionner la situation" />
                                          </Field>
                                          <ErrorMessage name="situationMatrimoniale" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Photo<span class="text-danger">*</span>
                                          </label>
                                          <Field name="urlImage" v-model="photo" type="file" accept="image/jpeg, image/png application/pdf" @change="onFileChange"
                                            class="form-control shadow-none fs-md-15 text-black" placeholder="Choisissez une image" />
                                          <ErrorMessage name="urlImage" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Civilite <span class="text-danger">*</span>
                                          </label>
                                          <Field name="civilite" v-model="civilite" type="text" v-slot="{ field }">
                                            <Multiselect :searchable="true" :options="['Mr', 'Mme']" v-model="field.value" v-bind="field"
                                              placeholder="Sélectionner la civilité" />
                                          </Field>
                                          <ErrorMessage name="civilite" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Date de naissance
                                          </label>
                                          <Field name="dateNais" v-model="dateNaissance" type="date" class="form-control shadow-none fs-md-15 text-black" />
                                        </div>
                                        <ErrorMessage name="dateNais" class="text-danger" />
                                      </div>
                                      <div class="col-md-4 mt-3">
                                        <label for="dateEmbauche" class="form-label"> Date d'embauche<span class="text-danger">*</span></label>
                                        <Field name="dateEmbauche" v-model="dateEmbauche" class="form-control" type="Date" />
                                        <ErrorMessage name="dateEmbauche" class="text-danger" />
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Numéro de Sécurité Sociale
                                          </label>
                                          <Field name="numeroSecuriteSociale" v-model="numSecSocial" type="text" class="form-control shadow-none fs-md-15 text-black"
                                            placeholder="Entrer le numéro" />
                                          <ErrorMessage name="numeroSecuriteSociale" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Nationalité<span class="text-danger">*</span>
                                          </label>
                                          <Field name="nationalite" v-model="nationalite" type="text" class="form-control shadow-none fs-md-15 text-black"
                                            placeholder="Entrer la nationnalité " />
                                          <ErrorMessage name="nationalite" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Religion <span class="text-danger">*</span>
                                          </label>
                                          <Field name="religion" v-model="religion" type="text" v-slot="{ field }">
                                            <Multiselect v-model="field.value" v-bind="field" :options="religionOptions" :preserve-search="true"
                                              :multiple="false" :searchable="true" placeholder="Sélectionner la religion" label="label"
                                              track-by="label" />
                                          </Field>
                                          <ErrorMessage name="religion" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Ethnie <span class="text-danger">*</span>
                                          </label>
                                          <Field name="ethnie" v-model="ethnie" type="text" v-slot="{ field }">
                                            <Multiselect v-model="field.value" v-bind="field" :options="ethnieOptions" :preserve-search="true"
                                              :multiple="false" :searchable="true" placeholder="Sélectionner l'ethnie" label="label"
                                              track-by="label" />
                                          </Field>
                                          <ErrorMessage name="ethnie" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Service <span class="text-danger">*</span>
                                          </label>
                                          <Field name="service" v-model="service" type="text" v-slot="{ field }">
                                            <Multiselect v-model="field.value" v-bind="field" :options="serviceOptions" :preserve-search="true"
                                              :multiple="false" :searchable="true" placeholder="Sélectionner le service" label="label"
                                              track-by="label" />
                                          </Field>
                                          <ErrorMessage name="service" class="text-danger" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div v-if="currentStep === 2"  class="tab-pane fade show active" id="adresse-contact" role="tabpanel" aria-labelledby="adresse-contact-tab">
                                  <div class="sidebar-body">
                                    <div class="row g-2">
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Boite Postale <span class="text-danger">*</span>
                                          </label>
                                          <Field name="boitePostale" v-model="boitePostale" type="text" class="form-control shadow-none fs-md-15 text-black"
                                            placeholder="Entrer votre adresse postale" />
                                          <ErrorMessage name="boitePostale" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Téléphone 1<span class="text-danger">*</span>
                                          </label>
                                          <Field name="telephone1" v-model="telephone1" type="text" class="form-control shadow-none fs-md-15 text-black"
                                            placeholder="Entrer le téléphone" />
                                          <ErrorMessage name="telephone1" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Téléphone 2
                                          </label>
                                          <Field name="telephone2" v-model="telephone2" type="text" class="form-control shadow-none fs-md-15 text-black"
                                            placeholder="Entrer le téléphone" />
                                          <ErrorMessage name="telephone2" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Email <span class="text-danger">*</span>
                                          </label>
                                          <Field name="email" v-model="email" type="text" class="form-control shadow-none fs-md-15 text-black"
                                            placeholder="Entrer l'email" />
                                          <ErrorMessage name="email" class="text-danger" />
                                        </div>
                                      
                                      </div>
                                      <div class="col-md-4">
                                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                            <label class="d-block text-black fw-semibold mb-10">
                                              Département <span class="text-danger">*</span>
                                            </label>
                                            <Field  name="departement"  v-slot="{ field }">
                                              <Multiselect
                                                :options="departementOptions"
                                                :searchable="true"
                                                track-by="label"
                                                label="label"
                                                v-model = "field.value"
                                                v-bind = "field"
                                                @change="departementChange($event)"
                                                placeholder="Sélectionner le departement"
                                              />
                                            </Field>  
                                          </div>
                                          <ErrorMessage name="departement" class="text-danger"/>
                                        </div>
                                        <div class="col-md-4">
                                          <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                            <label class="d-block text-black fw-semibold mb-10">
                                              Communes <span class="text-danger">*</span>
                                            </label>
                                            <Field  name="commune"  v-slot="{ field }">
                                              <Multiselect
                                                :options="communeOptions"
                                                :searchable="true"
                                                track-by="label"
                                                label="label"
                                                v-model="selectedCommune"
                                                v-bind = "field"
                                                @change="communeChange($event)"
                                                noOptionsText="Sélectionner d'abord un département"
                                                placeholder="Sélectionner la commune"
                                              />
                                            </Field>  
                                          </div>
                                          <ErrorMessage name="commune" class="text-danger"/>
                                        </div>
                                        <div class="col-md-4">
                                          <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                            <label class="d-block text-black fw-semibold mb-10">
                                              Arrondissement <span class="text-danger">*</span>
                                            </label>
                                            <Field  name="arrondissement"  v-slot="{ field }">
                                              <Multiselect
                                                :options="arrondissementOptions"
                                                :searchable="true"
                                                track-by="label"
                                                label="label"
                                                v-model = "selectedArrondissement"
                                                v-bind = "field"
                                                noOptionsText="Sélectionner d'abord une commune"
                                                @change="arrondissementChange($event)"
                                                placeholder="Sélectionner l' arrondissement"
                                              />
                                            </Field>  
                                          </div>
                                          <ErrorMessage name="arrondissement" class="text-danger"/>
                                        </div>
                                        <div class="col-md-4">
                                          <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                            <label class="d-block text-black fw-semibold mb-10">
                                              Quartier <span class="text-danger">*</span>
                                            </label>
                                            <Field  name="quartier"  v-slot="{ field }">
                                              <Multiselect
                                                :options="quartierOptions"
                                                :searchable="true"
                                                track-by="label"
                                                label="label"
                                                v-model = "selectedQuartier"
                                                v-bind = "field"
                                                noOptionsText="Sélectionner d'abord un arrondissement"
                                                placeholder="Sélectionner le quartier"
                                              />
                                            </Field>  
                                          </div>
                                          <ErrorMessage name="quartier" class="text-danger"/>
                                        </div>
                                    </div>
                                    <div class="col-md-12 mt-3">
                                    <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                      <label class="d-block text-black fw-semibold mb-10">
                                        Adresse <span class="text-danger">*</span>
                                      </label>
                                      <Field name="adresse" cols="20"
                                      rows="3" as="textarea" placeholder="Ex: M/ DOSSOU C/905" v-slot="{ field}" class="form-control shadow-none rounded-0 text-black">
                                        <textarea
                                          v-model="field.value"
                                          class="form-control shadow-none rounded-0 text-black"
                                        ></textarea>
                                      </Field>
                                      <ErrorMessage name="adresse" class="text-danger"/>
                                    </div>
                                  </div>
                                  </div>
                                </div>
                                <div v-if="currentStep === 3"  class="tab-pane fade show active" id="info-conjoint" role="tabpanel" aria-labelledby="info-conjoint-tab">
                                  <div class="sidebar-body">
                                    <div class="row g-2">
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Nom du Conjoint<span class="text-danger">*</span>
                                          </label>
                                          <Field name="nomCon" v-model="nomCon" type="text" class="form-control shadow-none fs-md-15 text-black"
                                            placeholder="Entrer le nom du conjoint " />
                                          <ErrorMessage name="nomCon" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Prenom du Conjoint<span class="text-danger">*</span>
                                          </label>
                                          <Field name="prenomCon" v-model="prenomCon" type="text" class="form-control shadow-none fs-md-15 text-black"
                                            placeholder="Entrer le prenom du conjoint " />
                                          <ErrorMessage name="prenomCon" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Date de Naissance du conjoint
                                          </label>
                                          <Field name="dateNaissanceCon" v-model="dateNaissanceCon" type="date" class="form-control shadow-none fs-md-15 text-black"
                                            placeholder="Entrer la date de naissance du conjoint " />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Nationalité du Conjoint<span class="text-danger">*</span>
                                          </label>
                                          <Field name="nationaliteCon" v-model="nationaliteCon" type="text" class="form-control shadow-none fs-md-15 text-black"
                                            placeholder="Entrer la nationalité du conjoint " />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Téléphone du Conjoint<span class="text-danger">*</span>
                                          </label>
                                          <Field name="telephoneCon" v-model="telephoneCon" type="string" class="form-control shadow-none fs-md-15 text-black"
                                            placeholder="Entrer le téléphone du conjoint " />
                                          <ErrorMessage name="telephoneCon" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Passport du Conjoint<span class="text-danger">*</span>
                                          </label>
                                          <Field name="passportCon" v-model="numPassportCon" type="text" class="form-control shadow-none fs-md-15 text-black"
                                            placeholder="Entrer la nationalité du conjoint " />
                                          <ErrorMessage name="passportCon" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Religion Du Conjoint<span class="text-danger">*</span>
                                          </label>
                                          <Field name="religionCon" v-model="religionCon" type="text" v-slot="{ field }">
                                            <Multiselect v-model="field.value" v-bind="field" :options="religionOptions" :preserve-search="true"
                                              :multiple="false" :searchable="true" placeholder="Sélectionner la religion du conjoint"
                                              label="label" track-by="label" />
                                          </Field>
                                          <ErrorMessage name="religionCon" class="text-danger" />              
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Ethnie Du Conjoint<span class="text-danger">*</span>
                                          </label>
                                          <Field name="ethnieCon" v-model="ethnieCon" type="text" v-slot="{ field }">
                                            <Multiselect v-model="field.value" v-bind="field" :options="ethnieOptions" :preserve-search="true"
                                              :multiple="false" :searchable="true" placeholder="Sélectionner l'ethnie du conjoint" label="label"
                                              track-by="label" />
                                          </Field>
                                          <ErrorMessage name="religionCon" class="text-danger" />              
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Nombre d'enfants<span class="text-danger">*</span>
                                          </label>
                                          <Field name="nombreEnfant" type="text" class="form-control shadow-none fs-md-15 text-black"
                                            placeholder="Entrer le nombre d'enfants" />
                                          <ErrorMessage name="nombreEnfant" class="text-danger" />
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-md-12 mb-md-25">
                                      <div class="tab-pane fade show active p-10" id="home-tab-pane" role="tabpanel" tabindex="0">
                                        <div class="row">
                                          <div class="border border-primary mb-10">
                                            <div class="row d-flex align-items-center justify-content-between fw-bold py-2"
                                              style="background-color: #0a59a4">
                                              <div class="col-md-7">
                                                <h3 class="fs-4 text-white">
                                                  Enfants
                                                </h3>
                                              </div>
                                              <div class="col-md-5">
                                                <div class="d-flex float-end">
                                                  <button
                                                    class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                                                    type="button" :class="{ 'cursor-not-allowed': isDisable }" :disabled="isDisable"
                                                    @click="addRowEnfant()">
                                                    <i class="fa fa-plus-circle position-relative ms-5 fs-12"></i>
                                                    Ajouter un enfant
                                                  </button>
                                                  <router-link to="/liste-mouvements"></router-link>
                                                </div>
                                              </div>
                                            </div>
                                            <div>
                                              <div class="row d-flex align-items-center justify-content-between mt-10">
                                                <div class="col-md-3">
                                                  <label class="d-block text-black fw-semibold">
                                                    Nom
                                                    <span class="text-danger">*</span>
                                                  </label>
                                                </div>
                                                <div class="col-md-3">
                                                  <label class="d-block text-black fw-semibold">
                                                    Prénom
                                                    <span class="text-danger">*</span>
                                                  </label>
                                                </div>
                                                <div class="col-md-2">
                                                  <label class="d-block text-black fw-semibold mb-10">
                                                    Date Naissance<span class="text-danger">*</span>
                                                  </label>
                                                </div>
                                                <div class="col-md-2">
                                                  <label class="d-block text-black fw-semibold mb-10">
                                                    Sexe <span class="text-danger">*</span>
                                                  </label>
                                                </div>
                                                <div class="col-md-2">
                                                  <label class="d-block text-black fw-semibold mb-10">
                                                    Actions <span class="text-danger">*</span>
                                                  </label>
                                                </div>
                                              </div>
                                              <hr class="mt-0" />
                                              <div class="row" v-for="(enfant, index) in enfants" :key="index">
                                                <div class="col-md-3 mb-2">
                                                  <div class="form-group ">
                                                    <input v-model="enfant.nom" type="text" class="form-control shadow-none fs-md-15 text-black"
                                                      placeholder="Saisir le nom" />
                                                    <div class="invalid-feedback" v-if="valideteRowEnfant(enfant.nom)">
                                                      Le nom est obligatoire.
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="col-md-3 mb-2">
                                                  <div class="form-group ">
                                                    <input v-model="enfant.prenom" type="text"
                                                      class="form-control shadow-none fs-md-15 text-black" placeholder="saisir le prénom" />
                                                    <div class="invalid-feedback" v-if="valideteRowEnfant(enfant.prenom)">
                                                      Le prénom est obligatoire.
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="col-md-2 mb-2">
                                                  <div class="form-group">
                                                    <input v-model="enfant.dateNaissance" type="date"
                                                      class="form-control shadow-none fs-md-15 text-black" placeholder="" />
                                                  </div>
                                                  <div class="invalid-feedback" v-if="valideteRowEnfant(enfant.dateNaissance)">
                                                    La date est obligatoire.
                                                  </div>
                                                </div>
                                                <div class="col-md-2 mb-2">
                                                  <div class="form-group ">
                                                    <Multiselect :searchable="true" :options="['Masculin', 'Féminin']" v-model="enfant.sexe"
                                                      placeholder="Sélectionner le sexe" />
                                                  </div>
                                                </div>
                                                <div class="col-md-2 mb-2">
                                                    <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8" type="button"
                                                    @click="removeRowEnfant(index)">
                                                   <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
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
                                <div v-if="currentStep === 4"  class="tab-pane fade show active" id="info-sante-personnel" role="tabpanel" aria-labelledby="info-sante-personnel-tab">
                                  <div class="sidebar-body">
                                    <div class="row g-2">
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Taille<span class="text-danger">*</span>
                                          </label>
                                          <Field name="taille" type="text" class="form-control shadow-none fs-md-15 text-black"
                                            placeholder="Taille(cm) " />
                                          <ErrorMessage name="taille" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Poids<span class="text-danger">*</span>
                                          </label>
                                          <Field name="poids" type="text" class="form-control shadow-none fs-md-15 text-black"
                                            placeholder="Poids(kg) " />
                                          <ErrorMessage name="poids" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Groupe Sanguin <span class="text-danger">*</span>
                                          </label>
                                          <Field name="groupeSanguin" type="text" v-slot="{ field }">
                                            <Multiselect :searchable="true" :options="['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-']"
                                              v-model="field.value" v-bind="field" placeholder="Sélectionner le Groupe Sanguin" />
                                          </Field>
                                          <ErrorMessage name="groupeSanguin" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Vision Gauche <span class="text-danger">*</span>
                                          </label>
                                          <Field name="visionGauche" type="text" v-slot="{ field }">
                                            <Multiselect :searchable="true"
                                              :options="['Normal', 'à vue réduite', 'Visé de loin', 'Astigmatique', 'à vue réduite & astigmatique', 'Visé de loin & astigmatique', 'partiellement handicapé', 'Aveugle']"
                                              v-model="field.value" v-bind="field" placeholder="Sélectionner la vision Gauche" />
                                          </Field>
                                          <ErrorMessage name="visionGauche" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Vision Droite <span class="text-danger">*</span>
                                          </label>
                                          <Field name="visionDroite" type="text" v-slot="{ field }">
                                            <Multiselect :searchable="true"
                                              :options="['Normal', 'à vue réduite', 'Visé de loin', 'Astigmatique', 'à vue réduite & astigmatique', 'Visé de loin & astigmatique', 'partiellement handicapé', 'Aveugle']"
                                              v-model="field.value" v-bind="field" placeholder="Sélectionner la vision Droite" />
                                          </Field>
                                          <ErrorMessage name="visionDroite" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Audience Gauche <span class="text-danger">*</span>
                                          </label>
                                          <Field name="audienceGauche" type="text" v-slot="{ field }">
                                            <Multiselect :searchable="true" :options="['Normal', 'partiellement handicapé', 'Sourd']"
                                              v-model="field.value" v-bind="field" placeholder="Sélectionner l'audience Gauche" />
                                          </Field>
                                          <ErrorMessage name="audienceGauche" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Audience Droite <span class="text-danger">*</span>
                                          </label>
                                          <Field name="audienceDroite" type="text" v-slot="{ field }">
                                            <Multiselect :searchable="true" :options="['Normal', 'partiellement handicapé', 'Sourd']"
                                              v-model="field.value" v-bind="field" placeholder="Sélectionner l'audience Droite" />
                                          </Field>
                                          <ErrorMessage name="audienceDroite" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Main Gauche <span class="text-danger">*</span>
                                          </label>
                                          <Field name="mainGauche" type="text" v-slot="{ field }">
                                            <Multiselect :searchable="true" :options="['Normal', 'partiellement handicapé', 'handicapé']"
                                              v-model="field.value" v-bind="field" placeholder="Sélectionner la main Gauche" />
                                          </Field>
                                          <ErrorMessage name="mainGauche" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Main Droite <span class="text-danger">*</span>
                                          </label>
                                          <Field name="mainDroite" type="text" v-slot="{ field }">
                                            <Multiselect :searchable="true" :options="['Normal', 'partiellement handicapé', 'handicapé']"
                                              v-model="field.value" v-bind="field" placeholder="Sélectionner la main Droite" />
                                          </Field>
                                          <ErrorMessage name="mainDroite" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Jambe Gauche <span class="text-danger">*</span>
                                          </label>
                                          <Field name="jambeGauche" type="text" v-slot="{ field }">
                                            <Multiselect :searchable="true" :options="['Normal', 'partiellement handicapé', 'handicapé']"
                                              v-model="field.value" v-bind="field" placeholder="Sélectionner la jambe Droite" />
                                          </Field>
                                          <ErrorMessage name="jambeGauche" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Jambe Droite <span class="text-danger">*</span>
                                          </label>
                                          <Field name="jambeDroite" type="text" v-slot="{ field }">
                                            <Multiselect :searchable="true" :options="['Normal', 'partiellement handicapé', 'handicapé']"
                                              v-model="field.value" v-bind="field" placeholder="Sélectionner la jambe Droite" />
                                          </Field>
                                          <ErrorMessage name="jambeDroite" class="text-danger" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div v-if="currentStep === 5" class="tab-pane fade show active" id="info-bancaire" role="tabpanel" aria-labelledby="info-bancaire-tab">
                                  <div class="sidebar-body">
                                    <div class="row g-2">
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Banque
                                            </label>
                                              <Multiselect
                                                :options="banqueOptions"
                                                :searchable="true"
                                                track-by="label"
                                                label="label"
                                                
                                                placeholder="Sélectionner la banque"
                                              />
                                            </div>
                                            </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Numéro de compte bancaire
                                          </label>
                                          <Field name="numeroCompte" type="text" class="form-control shadow-none fs-md-15 text-black"
                                            placeholder="Entrer le numéro de compte" />
                                          <ErrorMessage name="numeroCompte" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Code Iban
                                          </label>
                                          <Field name="codeIban" type="text" class="form-control shadow-none fs-md-15 text-black"
                                            placeholder="Entrer le code" />
                                          <ErrorMessage name="codeIban" class="text-danger" />
                                        </div>
                                      </div>
                                      <div class="col-md-4 mb-3">
                                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                          <label class="d-block text-black mb-10">
                                            Code Swift
                                          </label>
                                          <Field name="codeSwift" type="text" class="form-control shadow-none fs-md-15 text-black"
                                            placeholder="Entrer le code" />
                                          <ErrorMessage name="codeSwift" class="text-danger" />
                                        </div>
                                      </div>
                                          <div class="col-md-4 mt-3">
                                          <label for="releveIdentiteBancaire" class="form-label">Relevé d'identité bancaire<span class="text-danger">*</span></label>
                                          <Field name="releveIdentiteBancaire" class="form-control" type="file" placeholder="Joindre le RIB"/>
                                          <ErrorMessage name="releveIdentiteBancaire" class="text-danger" />
                                       </div>
                                      
                                        <h1>Informations sur la personne à contacter</h1>
                                      <div class="row g-2">
                                        <div class="col-md-4 mb-3">
                                          <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                            <label class="d-block text-black mb-10">
                                              Nom de la personne à contacter
                                            </label>
                                            <Field name="nomPersonneAContacter" type="text" class="form-control shadow-none fs-md-15 text-black"
                                              placeholder="Entrer le nom" />
                                            <ErrorMessage name="nomPersonneAContacter" class="text-danger" />
                                          </div>
                                        </div>
                                        <div class="col-md-4 mb-3">
                                          <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                            <label class="d-block text-black mb-10">
                                              Prénom personne à contacter
                                            </label>
                                            <Field name="prenomPersonneAContacter" type="text"
                                              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le prenom" />
                                            <ErrorMessage name="prenomPersonneAContacter" class="text-danger" />
                                          </div>
                                        </div>
                                        <div class="col-md-4 mb-3">
                                          <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                            <label class="d-block text-black mb-10">
                                              Téléphone personne à contacter
                                            </label>
                                            <Field name="telephonePersonneAContacter" type="text"
                                              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le téléphone" />
                                            <ErrorMessage name="telephonePersonneAContacter" class="text-danger" />
                                          </div>
                                        </div>
                                        <div class="col-md-4 mb-3">
                                          <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                            <label class="d-block text-black  mb-10">
                                              Relation
                                            </label>
                                            <Field name="relation" type="text" class="form-control shadow-none fs-md-15 text-black"
                                              placeholder="Indiquer la relation" />
                                            <ErrorMessage name="relation" class="text-danger" />
                                          </div>
                                        </div>
                                    </div>
                                  </div>
                                </div>
                            </div>
                            <div class="buttons mt-3">
                              <button type="button" class="btn btn-secondary me-3" @click="previousStep" :disabled="currentStep === 1">
                                Précédent
                              </button>
                              <button v-if="currentStep < tabs.length" type="button" class="btn btn-primary" @click="nextStep">
                                Suivant
                              </button>
                              <button v-if="currentStep === tabs.length" type="submit" class="btn btn-success">
                                Soumettre
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
  
</template>


<script lang="ts">

import { defineComponent, ref, watch, onMounted, reactive } from 'vue';
import { Form, Field, ErrorMessage, useFieldArray, useForm } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRouter,useRoute } from "vue-router";
import ApiService from '@/services/ApiService';
import { Personnel } from '@/models/Personnel';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'
import { Tab } from "bootstrap";


export default defineComponent({
  name: "EditPersonnel",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const personnelInfoSchema = Yup.object().shape({
      nom: Yup.string().required('Le nom du personnel est obligatoire'),
      prenom: Yup.string().required('Le prénom du personnel est obligatoire'),
      numeroCompte: Yup.string().notRequired(),
      dateNais: Yup.date().notRequired(),
      religion: Yup.string().required('Religion est obligatoire'),
      ethnie: Yup.string().required('Ethnie est obligatoire'),
      nationalite: Yup.string().required('Ethnie est obligatoire'),
      situationMatrimoniale: Yup.string().required('Ethnie est obligatoire'),
      sexe: Yup.string().required('Le sexe est obligatoire'),
      civilite: Yup.string().required('La civilité est obligatoire'),
      numeroSecuriteSociale: Yup.date().notRequired(),
      dateEmbauche: Yup.date().notRequired(),
      urlImage: Yup.date().notRequired()});

    const personnelContSchema = Yup.object().shape({
      adresse: Yup.string().required('L\' adresse du personnel est obligatoire'),
      email: Yup.string().email('Le format de l\'email est invalide').required('L\'email est obligatoire'),
      telephone1: Yup.number().typeError('Veuillez entrer des chiffres').required('Le telephone est obligatoire'),
      telephone2: Yup.number().notRequired(),
      boitePostale: Yup.string().notRequired(),
    });

    const personnelConSchema = Yup.object().shape({
      nomCon: Yup.string().required('Le nom du conjoint est obligatoire'),
      prenomCon: Yup.string().required('Le prenom du conjoint est obligatoire'),
      dateNaissanceCon: Yup.string().required('La date de naissance du conjoint est obligatoire'),
      nationaliteCon: Yup.string().required('La nationalité du conjoint est obligatoire'),
      passportCon: Yup.string().required('Le passport du conjoint est obligatoire'),
      religionCon: Yup.string().required('Religion est obligatoire'),
      ethnieCon: Yup.string().required('Ethnie est obligatoire'),
    });

    const personnelSanteSchema = Yup.object().shape({
      taille: Yup.string().required('La taille  est obligatoire'),
      poids: Yup.string().required('Le poids est obligatoire'),
      groupeSanguin: Yup.string().required('Le groupe sanguin est obligatoire'),
      visionGauche: Yup.string().required('La vision gauche est obligatoire'),
      visionDroite: Yup.string().required('La vision droite est obligatoire'),
      audienceGauche: Yup.string().required('Audience Gauche est obligatoire'),
      audienceDroite: Yup.string().required('Audience Droite obligatoire'),
      mainGauche: Yup.string().required('La main gauche est obligatoire'),
      mainDroite: Yup.string().required('La main Droite est obligatoire'),
      jambeGauche: Yup.string().required('La jambe gauche est obligatoire'),
      jambeDroite: Yup.string().required('La jambe droite est obligatoire'),
    });

    const personnelPersonneConSchema = Yup.object().shape({
      nomPersonneAContacter: Yup.string().notRequired(),
      prenomPersonneAContacter: Yup.string().notRequired(),
      telephonePersonneAContacter: Yup.number().notRequired(),
      relation: Yup.string().notRequired(),

      quartier: Yup.string().required('Le quartier est obligatoire'),
      arrondissement: Yup.string().required('L\'arrondissement  est obligatoire'),
      commune: Yup.string().required('La commune est obligatoire'),
      departement: Yup.string().required('Le département  est obligatoire'),

    });

    const personnelForm = ref<Personnel | null>(null);
    const router = useRouter();
    const religion = ref();
    const ethnie = ref();
    const service = ref();
    const nom = ref();
    const prenom = ref();
    const adresse = ref();
    const email = ref();
    const telephone1 = ref();
    const telephone2 = ref();
    const nomCon = ref();
    const dateNaissance = ref();
    const dateEmbauche = ref();
    const prenomCon = ref();
    const dateNaissanceCon = ref();
    const nationaliteCon = ref();
    const nationalite = ref();
    const numPassportCon = ref();
    const telephoneCon = ref();
    const taille = ref();
    const poids = ref();
    const sexe = ref();
    const civilite = ref();
    const groupeSanguin = ref();
    const visionGauche = ref();
    const visionDroite = ref();
    const audienceGauche = ref();
    const audienceDroite = ref();
    const mainGauche = ref();
    const mainDroite = ref();
    const jambeGauche = ref();
    const jambeDroite = ref();
    const boitePostale = ref();
    const nomPersonneAContacter = ref();
    const prenomPersonneAContacter = ref();
    const telephonePersonneAContacter = ref();
    const relation = ref();
    const personnels = ref<Personnel[]>([]);
    const numSecSocial = ref("");
    const banque = ref();
    const rib = ref();
    const iban = ref();
    const swift = ref();
    const religionCon = ref();
    const ethnieCon = ref();
    const nmbreEnfant = ref(0);
    const situation = ref();
    const photo = ref<File>(null)
    const departementOptions = ref([]);
    const communeOptions = ref([]);
    const arrondissementOptions = ref([]);
    const quartierOptions = ref([]);

    const isDisable = ref(true);
    const enfants = reactive([{
      nom: "",
      sexe: "",
      prenom: "",
      dateNaissance: ""
    }]);
    
    const laPhoto = ref<any>()

    const onFileChange = (file:File)=>{
      console.log("Le fichier ===> ",file);
      laPhoto.value = file["file"];
    }

    const addRowEnfant = () => {
      enfants.push({
        nom: "",
        sexe: "",
        prenom: "",
        dateNaissance: ""
      });
    };

    const removeRowEnfant = (index) => {
      if (enfants.length > 1) enfants.splice(index, 1);
      //totals();
    };

    watch(
      enfants,
      (newValue) => {
        isDisable.value =
        newValue.some(
          (enfant) =>
          valideteRowEnfant(enfant.nom) ||
          valideteRowEnfant(enfant.prenom) ||
          valideteRowEnfant(enfant.sexe) ||
          valideteRowEnfant(enfant.dateNaissance)
        );
      },
      { deep: true }
    );

    const valideteRowEnfant = (e) => {
      if (e == "" || e == 0 || e == "0" || e == null || e < 0) {
        console.log('erg')
        return true;
      } else {
        return false;
      }
    };

    const { remove, push, fields, update } = useFieldArray("enfants");

    const enfantOptions = ref([]);
    const valuess = ref();
    const religionOptions = ref([]);
    const ethnieOptions = ref([]);
    const serviceOptions = ref([]);


    const banqueOptions = ref([]);

    const addPersonnel = async (values, { resetForm }) => {
      values.enfants = enfants.map(enfant => ({
        nom: enfant.nom,
        sexe: enfant.sexe,
        prenom: enfant.prenom,
        dateNaissance: enfant.dateNaissance,
      }));

      values["photo"] = laPhoto.value;
      
      axios.post("/personnels", values, { headers: { 'Content-Type': 'multipart/form-data','Accept': '*/*' } })
        .then(({ data }) => {
          if (data.code == 201) {
            success(data.message);
            resetForm();
            router.push({ name: "ListePersonnelPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    const getAllReligions = async () => {
      try {
        const response = await ApiService.get('/all/religions');
        const religionsData = response.data.data.data;

        religionOptions.value = religionsData.map((religion) => ({
          value: religion.id,
          label: religion.libelle,
        }));
      }
      catch (error) {
        //error(response.data.message)
      }
    }

    const getAllEthnies = async () => {
      try {
        const response = await ApiService.get('/all/ethnies');
        const ethniesData = response.data.data.data;

        ethnieOptions.value = ethniesData.map((ethnie) => ({
          value: ethnie.id,
          label: ethnie.libelle,
        }));
      }
      catch (error) {
        //error(response.data.message)
      }
    }

    const activateTab = async (tabEl: HTMLElement | null) => {
      if (!tabEl) {
        return;
      }
      const tabInstance = Tab.getInstance(tabEl);
      const tabTrigger = document.getElementById(tabInstance);
      tabInstance.show();
    }

    const getAllServices = async () => {
      try {
        const response = await ApiService.get('/services');
        const servicesData = response.data.data;
        console.log("465484635418416541 ===> ", servicesData);

        serviceOptions.value = servicesData.data.map((service) => ({
          value: service.id,
          label: service.libelle,
        }));
      }
      catch (error) {
        //error(response.data.message)
      }
    }

    const fetchBanque = async () => {
      try {
        const response = await ApiService.get("/banques");
        const banqueData = response.data.data;
        banqueOptions.value = banqueData.map((banque) => ({
          value: banque.id,
          label: `${banque.denomination}`,
        }));
      } catch (error) {
        //
      }
    };


    const selectedCommune = ref([]);
    const selectedArrondissement = ref([]);
    const selectedQuartier = ref([]);

    function departementChange(value) {
      console.log('g,rl;m', value)
    if(value){
        communeOptions.value =[];
        selectedCommune.value = [];
        selectedArrondissement.value = [];
        selectedQuartier.value = [];
        ApiService.get('/departements/communes/'+value)
          .then(({ data }) => {
              const donnee = data.data;
              console.log('donnee',donnee)
              if(donnee.length > 0) {
                communeOptions.value = donnee.map((commune: any) => {
                  return {
                    label: commune.libelle,
                    value: commune.id,
                  };
                });
              }
          })
          .catch(({ response }) => {
            //error(response.data.message);
          });
      }else {
        communeOptions.value = [];
        selectedCommune.value = [];
        selectedArrondissement.value = [];
        selectedQuartier.value = [];
      }
    }

    function communeChange(value) {
    if(value){
        arrondissementOptions.value =[];
        selectedArrondissement.value = [];
        selectedQuartier.value = [];
        ApiService.get('/communes/arrondissements/'+value)
          .then(({ data }) => {
              const donnee = data.data;
              if(donnee.length > 0) {
                arrondissementOptions.value = donnee.map((arrondissement: any) => {
                  return {
                    label: arrondissement.libelle,
                    value: arrondissement.id,
                  };
                });
              }
          })
          .catch(({ response }) => {
            //error(response.data.message);
          });
      }else {
        arrondissementOptions.value = [];
        selectedArrondissement.value = [];
        selectedQuartier.value = [];
      }
    }

    function arrondissementChange(value) {
    if(value){
        quartierOptions.value =[];
        selectedQuartier.value = [];
        ApiService.get('/arrondissements/quartiers/'+value)
          .then(({ data }) => {
              const donnee = data.data;
              if(donnee.length > 0) {
                quartierOptions.value = donnee.map((quartier: any) => {
                  return {
                    label: quartier.libelle,
                    value: quartier.id,
                  };
                });
              }
          })
          .catch(({ response }) => {
            //error(response.data.message);
          });
      }else {
        quartierOptions.value = [];
        selectedQuartier.value = [];
      }
    }

    const fetchDepartements = async () => {
      ApiService.get("/departements")
      .then(({ data }) => {
        const donnees = data.data.data;
        departementOptions.value = donnees.map((departement) => {
          return {
            value: departement.id,
          label: `${departement.libelle}`,
          }
        });
      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    /*const fetchFonction = async () => {
      try {
        const response = await ApiService.get("/fonctions");
        const fonctionData = response.data.data.data;
        fonctionOptions.value = fonctionData.map((fonction) => ({
          value: fonction.id,
          label: `${fonction.libelle}`,
        }));
      } catch (error) {
        //
      }
    };*/


    const tabContainer = ref(null);
    const tabs  = [
        {
            id: "#info-personnel",
            icon: "product-detail",
            title: "Informations générales du personnel",
            desc: "Ajouter les informations du personnel"
        },
        {
            id: "#adresse-contact",
            icon: "product-gallery",
            title: "Adresse et contacts du personnel",
            desc: "Complèter les adresses et les contacts du personnel"
        },
        {
            id: "#info-conjoint",
            icon: "product-category",
            title: "Conjoint et enfants",
            desc: "Complèter les informations du conjoints et des enfants"
        },
        {
            id: "#info-sante-personnel",
            icon: "advance",
            title: "Santé et physique",
            desc: "Complèter les informations sur la santé du personnel"
        },
        {
            id: "#info-bancaire",
            icon: "pricing",
            title: "Informations bancaires",
            desc: "Ajouter les informations bancaires"
        },
        /*{
            id: "#personne-acontacter",
            icon: "advance",
            title: "Personne à contacter",
            desc: "Ajouter la personne à contacter"
        }*/
    ]

    onMounted(async () => {

      tabs.forEach((tab, index) => {
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.innerHTML = `
          <button class="nav-link" class="${currentStep.value > index ? 'active' : ''}" 
              id="${tab.id}" role="tab" aria-controls="detail-product" aria-selected="false">
              <div class="nav-rounded">
                  <div class="product-icons">
                      <svg class="stroke-icon">
                          <use href="${require('@/assets/svg/icon-sprite.svg')+'#'+ tab.icon}"></use>
                      </svg>
                  </div>
              </div>
              <div class="product-tab-content">
                  <h5>${ tab.title }</h5>
                  <p>${ tab.desc }</p>
              </div>
          </button>`;
        tabContainer.value.appendChild(li);
        const tabElements = tabContainer.value.querySelectorAll('.nav-link');
        tabElements.forEach((tab, index) => {
          const bsTab = new Tab(tab);
          tab.addEventListener('click', () => {
            currentStep.value = index + 1;
            bsTab.show();
          });
        });
        tabElements.forEach((tab, index) => {
          const bsTab = new Tab(tab);
          tab.addEventListener('click', () => {
            currentStep.value = index + 1;
            bsTab.show();
          });
        });
      });

      showTab(currentStep.value);
      await getAllReligions();
      await getAllEthnies();
      await getAllServices();
      await fetchBanque();
     await  fetchDepartements();
    })


    

    function getPersonnel(id:number) {
      ApiService.get("/personnels/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            personnelForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.data.message);
      });
    }

    const { handleSubmit, validate } = useForm({
      validationSchema: personnelConSchema,
      initialValues: {
        name: '',
        email: '',
        street: '',
        city: '',
      },
    });
    const currentStep = ref(1);

let activeclass = ref<string>('Informations générales du personnel')


    // Passer à l'étape suivante après validation
    const nextStep = async () => {
      const isValid = await validate();
      if (!isValid) return; // Ne pas avancer si le formulaire est invalide

      if (currentStep.value === 1) {
        useForm({ validationSchema: personnelContSchema });
      }

      if (currentStep.value === 2) {
        useForm({ validationSchema: personnelConSchema });
      }

      if (currentStep.value === 3) {
        useForm({ validationSchema: personnelSanteSchema });
      }

      if(currentStep.value === 4) {
        useForm({ validationSchema: personnelPersonneConSchema });
      }
      
      currentStep.value++;
      showTab(currentStep.value);
    };

    // Fonction pour afficher un onglet via Bootstrap Tab
    const showTab = (stepIndex) => {
      const tabElements = tabContainer.value.querySelectorAll('.nav-link');
      if (tabElements[stepIndex - 1]) {
        const tab = new Tab(tabElements[stepIndex - 1]);
        tab.show();
      }
    };

    // Revenir à l'étape précédente
    const previousStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--;
      }
    };

    // Soumettre le formulaire
    const handleSubmitForm = (values) => {
      if (currentStep.value === tabs.length) {
        alert('Formulaire soumis avec succès !');
        console.log(values); // Envoyer les données à une API si nécessaire
      }
    };

    const goToStep = (step) => {
      if (step <= currentStep.value) {
        currentStep.value = step;
      }
    };

    return {
      addPersonnel,
      personnelForm,
      removeRowEnfant,
      addRowEnfant,
      onFileChange,
      valideteRowEnfant,
      valuess,
      enfantOptions,
      isDisable,
      enfants,
      previousStep,
      nextStep,
      goToStep,
      tabContainer,
      currentStep,
      tabs,
      activeclass,
      religionOptions,
      ethnieOptions,
      serviceOptions,
      banqueOptions,
      prenomCon,
      situation,
      photo,
      religion, ethnie, service, nom, prenom, adresse, email, telephone1, telephone2, nomCon,
      nmbreEnfant, ethnieCon, religionCon, swift, iban, rib, banque, telephoneCon,
      numSecSocial, personnels, relation, telephonePersonneAContacter, prenomPersonneAContacter, nomPersonneAContacter,
      boitePostale, jambeDroite, jambeGauche, mainDroite, mainGauche, audienceDroite, audienceGauche, visionGauche, visionDroite,
      dateNaissance, dateNaissanceCon, dateEmbauche, nationalite, nationaliteCon, numPassportCon, taille, poids, sexe, civilite, groupeSanguin,
      quartierOptions, communeOptions,
         departementOptions ,arrondissementOptions,
         departementChange,communeChange,arrondissementChange,
         selectedCommune,selectedArrondissement,selectedQuartier,
      
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
</style>
