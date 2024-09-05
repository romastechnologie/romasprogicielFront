<template>
  <div class="col-xxl-9 col-xl-8 box-col-8 position-relative">

    <div class="tab-content" id="add-product-pills-tabContent">

      <div class="tab-pane fade show active" id="info-personnel" role="tabpanel" aria-labelledby="info-personnel-tab">
        <div class="sidebar-body">
          <div class="row g-2">
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Nom <span class="text-danger">*</span>
                </label>
                <Field name="nom" type="text" class="form-control shadow-none fs-md-15 text-black"
                  placeholder="Entrer le nom" />
                <ErrorMessage name="nom" class="text-danger" />
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Prénom <span class="text-danger">*</span>
                </label>
                <Field name="prenom" type="text" class="form-control shadow-none fs-md-15 text-black"
                  placeholder="Entrer le prenom" />
                <ErrorMessage name="prenom" class="text-danger" />
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Sexe <span class="text-danger">*</span>
                </label>
                <Field name="sexe" type="text" v-slot="{ field }">
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
                <Field name="situationMatrimoniale" type="text" v-slot="{ field }">
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
                <Field name="urlImage" type="file" accept="image/jpeg, image/png application/pdf" @change="onFileChange"
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Choisissez une image" />
                <ErrorMessage name="urlImage" class="text-danger" />
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Civilite <span class="text-danger">*</span>
                </label>
                <Field name="civilite" type="text" v-slot="{ field }">
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
                <Field name="dateNais" type="date" class="form-control shadow-none fs-md-15 text-black" />
              </div>
              <ErrorMessage name="dateNais" class="text-danger" />
            </div>
            <div class="col-md-4 mt-3">
              <label for="dateEmbauche" class="form-label"> Date d'embauche<span class="text-danger">*</span></label>
              <Field name="dateEmbauche" class="form-control" type="Date" />
              <ErrorMessage name="dateEmbauche" class="text-danger" />
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Numéro de Sécurité Sociale
                </label>
                <Field name="numeroSecuriteSociale" type="text" class="form-control shadow-none fs-md-15 text-black"
                  placeholder="Entrer le numéro" />
                <ErrorMessage name="numeroSecuriteSociale" class="text-danger" />
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Nationalité<span class="text-danger">*</span>
                </label>
                <Field name="nationalite" type="text" class="form-control shadow-none fs-md-15 text-black"
                  placeholder="Entrer la nationnalité " />
                <ErrorMessage name="nationalite" class="text-danger" />
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Religion <span class="text-danger">*</span>
                </label>
                <Field name="religions" v-model="religions" type="text" v-slot="{ field }">
                  <Multiselect v-model="field.value" v-bind="field" :options="religionOptions" :preserve-search="true"
                    :multiple="false" :searchable="true" placeholder="Sélectionner la religion" label="label"
                    track-by="label" />
                </Field>
                <span class="text-danger" v-if="showMErr">La religion est obligatoire</span>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Ethnie <span class="text-danger">*</span>
                </label>
                <Field name="ethnies" v-model="ethnies" type="text" v-slot="{ field }">
                  <Multiselect v-model="field.value" v-bind="field" :options="ethnieOptions" :preserve-search="true"
                    :multiple="false" :searchable="true" placeholder="Sélectionner l'ethnie" label="label"
                    track-by="label" />
                </Field>
                <span class="text-danger" v-if="showMErr">L'ethnie est obligatoire</span>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Service <span class="text-danger">*</span>
                </label>
                <Field name="services" v-model="services" type="text" v-slot="{ field }">
                  <Multiselect v-model="field.value" v-bind="field" :options="serviceOptions" :preserve-search="true"
                    :multiple="false" :searchable="true" placeholder="Sélectionner le service" label="label"
                    track-by="label" />
                </Field>
                <span class="text-danger" v-if="showMErr">Le service est obligatoire</span>
              </div>
            </div>
           
            <div class="product-buttons">
                    <button class="btn">
                        <div class="d-flex align-items-center gap-sm-2 gap-1">Next
                            <svg>
                                <use href="@/assets/svg/icon-sprite.svg#front-arrow"></use>
                            </svg>
                        </div>
                    </button>
                </div>

          </div>

        </div>
      </div>

      <div class="tab-pane fade" id="adresse-contact" role="tabpanel" aria-labelledby="adresse-contact-tab">
        <div class="sidebar-body">
          <div class="row g-2">
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Adresse <span class="text-danger">*</span>
                </label>
                <Field name="adresse" type="text" class="form-control shadow-none fs-md-15 text-black"
                  placeholder="Entrer l'adresse" />
                <ErrorMessage name="adresse" class="text-danger" />
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Boite Postale <span class="text-danger">*</span>
                </label>
                <Field name="boitePostale" type="text" class="form-control shadow-none fs-md-15 text-black"
                  placeholder="Entrer votre adresse postale" />
                <ErrorMessage name="boitePostale" class="text-danger" />
              </div>
            </div>
  
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Téléphone 1<span class="text-danger">*</span>
                </label>
                <Field name="telephone1" type="text" class="form-control shadow-none fs-md-15 text-black"
                  placeholder="Entrer le téléphone" />
                <ErrorMessage name="telephone1" class="text-danger" />
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Téléphone 2
                </label>
                <Field name="telephone2" type="text" class="form-control shadow-none fs-md-15 text-black"
                  placeholder="Entrer le téléphone" />
                <ErrorMessage name="telephone2" class="text-danger" />
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Email <span class="text-danger">*</span>
                </label>
                <Field name="email" type="text" class="form-control shadow-none fs-md-15 text-black"
                  placeholder="Entrer l'email" />
                <ErrorMessage name="email" class="text-danger" />
              </div>
            </div>
          </div>
          <div class="product-buttons">
                    <button class="btn me-1">
                        <div class="d-flex align-items-center gap-sm-2 gap-1">
                            <svg>
                                <use href="@/assets/svg/icon-sprite.svg#back-arrow"></use>
                            </svg>Previous
                        </div>
                    </button>
                    <button class="btn">
                        <div class="d-flex align-items-center gap-sm-2 gap-1">Next
                            <svg>
                                <use href="@/assets/svg/icon-sprite.svg#front-arrow"></use>
                            </svg>
                        </div>
                    </button>
                </div>

        </div>
      </div>
  
  
      <div class="tab-pane fade" id="info-conjoint" role="tabpanel" aria-labelledby="info-conjoint-tab">
        <div class="sidebar-body">
          <div class="row g-2">
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Nom du Conjoint<span class="text-danger">*</span>
                </label>
                <Field name="nomCon" type="text" class="form-control shadow-none fs-md-15 text-black"
                  placeholder="Entrer le nom du conjoint " />
                <ErrorMessage name="nomCon" class="text-danger" />
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Prenom du Conjoint<span class="text-danger">*</span>
                </label>
                <Field name="prenomCon" type="text" class="form-control shadow-none fs-md-15 text-black"
                  placeholder="Entrer le prenom du conjoint " />
                <ErrorMessage name="prenomCon" class="text-danger" />
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Date de Naissance du conjoint
                </label>
                <Field name="dateNaissanceCon" type="date" class="form-control shadow-none fs-md-15 text-black"
                  placeholder="Entrer la date de naissance du conjoint " />
                <ErrorMessage name="dateNaissanceCon" class="text-danger" />
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Nationalité du Conjoint<span class="text-danger">*</span>
                </label>
                <Field name="nationaliteCon" type="text" class="form-control shadow-none fs-md-15 text-black"
                  placeholder="Entrer la nationalité du conjoint " />
                <ErrorMessage name="nationaliteCon" class="text-danger" />
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Téléphone du Conjoint<span class="text-danger">*</span>
                </label>
                <Field name="telephoneCon" type="string" class="form-control shadow-none fs-md-15 text-black"
                  placeholder="Entrer le téléphone du conjoint " />
                <ErrorMessage name="telephoneCon" class="text-danger" />
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Passport du Conjoint<span class="text-danger">*</span>
                </label>
                <Field name="passportCon" type="text" class="form-control shadow-none fs-md-15 text-black"
                  placeholder="Entrer la nationalité du conjoint " />
                <ErrorMessage name="passportCon" class="text-danger" />
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Religion Du Conjoint<span class="text-danger">*</span>
                </label>
                <Field name="religionCon" v-model="religions" type="text" v-slot="{ field }">
                  <Multiselect v-model="field.value" v-bind="field" :options="religionOptions" :preserve-search="true"
                    :multiple="false" :searchable="true" placeholder="Sélectionner la religion du conjoint" label="label"
                    track-by="label" />
                </Field>
                <span class="text-danger" v-if="showMErr">La religion est obligatoire</span>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Ethnie Du Conjoint<span class="text-danger">*</span>
                </label>
                <Field name="ethnieCon" v-model="ethnies" type="text" v-slot="{ field }">
                  <Multiselect v-model="field.value" v-bind="field" :options="ethnieOptions" :preserve-search="true"
                    :multiple="false" :searchable="true" placeholder="Sélectionner l'ethnie du conjoint" label="label"
                    track-by="label" />
                </Field>
                <span class="text-danger" v-if="showMErr">L'ethnie est obligatoire</span>
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
                                  <div class="col-md-2">
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
                                  
                                </div>
                                <hr class="mt-0" />
                                <div class="row" v-for="(enfant, index) in enfants" :key="index">
                                  <div class="col-md-3 mb-3">
                                    <div class="form-group mb-5 mb-sm-5 mb-md-5">
                                      <input v-model="enfant.nom" type="text"
                                        class="form-control shadow-none fs-md-15 text-black" placeholder="Saisir le nom" />
                                      <div class="invalid-feedback" v-if="valideteRowEnfant(enfant.nom)">
                                        Le nom est obligatoire.
                                      </div>
                                      </div>
                                  </div>
                               
                                  <div class="col-md-3 mb-3">
                                    <div class="form-group mb-5 mb-sm-5 mb-md-5">
                                      <input v-model="enfant.prenom" type="text"
                                        class="form-control shadow-none fs-md-15 text-black" placeholder="saisir le prénom" />
                                      <div class="invalid-feedback" v-if="valideteRowEnfant(enfant.prenom)">
                                        Le prénom est obligatoire.
                                      </div>
                                    </div>

                                  </div>
                                  <div class="col-md-3 mb-3">
                                    <div class="form-group mb-5 mb-sm-5 mb-md-5">
                                      <input v-model="enfant.dateNaissance" type="date"
                                        class="form-control shadow-none fs-md-15 text-black" placeholder="" />
                                    </div>
                                    <div class="invalid-feedback" v-if="valideteRowEnfant(enfant.dateNaissance)">
                                      La date est obligatoire.
                                    </div>
                                  </div>

                                  <div class="col-md-3 mb-3">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  
                                          <Multiselect
                                          :searchable = "true"
                                          :options = "['Masculin', 'Féminin']"
                                          v-model = "enfant.sexe"
                                          v-bind = "field"
                                          placeholder="Sélectionner le sexe"
                                          />
                                      </div>
                                    </div>
                                  
                                </div>
                               
            
                              </div>
                            </div>
                          </div>
                        </div>
              
            </div>

          <div class="product-buttons">
                    <button class="btn me-1">
                        <div class="d-flex align-items-center gap-sm-2 gap-1">
                            <svg>
                                <use href="@/assets/svg/icon-sprite.svg#back-arrow"></use>
                            </svg>Previous
                        </div>
                    </button>
                    <button class="btn">
                        <div class="d-flex align-items-center gap-sm-2 gap-1">Next
                            <svg>
                                <use href="@/assets/svg/icon-sprite.svg#front-arrow"></use>
                            </svg>
                        </div>
                    </button>
                </div>

        </div>
      </div>
  
      <div class="tab-pane fade" id="info-sante-personnel" role="tabpanel" aria-labelledby="info-sante-personnel-tab">
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
          <div class="product-buttons">
                    <button class="btn me-1">
                        <div class="d-flex align-items-center gap-sm-2 gap-1">
                            <svg>
                                <use href="@/assets/svg/icon-sprite.svg#back-arrow"></use>
                            </svg>Previous
                        </div>
                    </button>
                    <button class="btn">
                        <div class="d-flex align-items-center gap-sm-2 gap-1">Next
                            <svg>
                                <use href="@/assets/svg/icon-sprite.svg#front-arrow"></use>
                            </svg>
                        </div>
                    </button>
                </div>

        </div>
      </div>
      
      <div class="tab-pane fade" id="info-bancaire" role="tabpanel" aria-labelledby="info-bancaire-tab">
          <div class="sidebar-body">
            <div class="row g-2">
              <div class="col-md-4 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Relevé d'identité bancaire
                  </label>
                  <Field name="releveIdentiteBancaire" type="text" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le relevé" />
                  <ErrorMessage name="releveIdentiteBancaire" class="text-danger" />
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
                  <Field name="prenomPersonneAContacter" type="text" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le prenom" />
                  <ErrorMessage name="prenomPersonneAContacter" class="text-danger" />
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Téléphone personne à contacter
                  </label>
                  <Field name="telephonePersonneAContacter" type="text" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le téléphone" />
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
            <div class="product-buttons">
                    <button class="btn me-1">
                        <div class="d-flex align-items-center gap-sm-2 gap-1">
                            <svg>
                                <use href="@/assets/svg/icon-sprite.svg#back-arrow"></use>
                            </svg>Previous
                        </div>
                    </button>
                    <button class="btn">
                        <div class="d-flex align-items-center gap-sm-2 gap-1">Next
                            <svg>
                                <use href="@/assets/svg/icon-sprite.svg#front-arrow"></use>
                            </svg>
                        </div>
                    </button>
                </div>

          </div>
        </div>
        
        
    </div>

    


  </div>




</template>


<script lang="ts">

import { defineComponent, ref, watch, onMounted, reactive } from 'vue';
import { Form, Field, ErrorMessage, useFieldArray } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRouter } from "vue-router";
import ApiService from '@/services/ApiService';
import { Personnel } from '@/models/Personnel';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
  name: "AddPersonnelContent",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const personnelSchema = Yup.object().shape({
      nom: Yup.string().required('Le nom du personnel est obligatoire'),
      prenom: Yup.string().required('Le prénom du personnel est obligatoire'),
      adresse: Yup.string().required('L\' adresse du personnel est obligatoire'),
      email: Yup.string().email('Le format de l\'email est invalide').required('L\'email est obligatoire'),
      telephone1: Yup.number().typeError('Veuillez entrer des chiffres').required('Le telephone est obligatoire'),
      telephone2: Yup.number().notRequired(),
      //telephonePersonneAContacter:Yup.number().typeError('Veuillez entrer des chiffres').required('Le telephone est obligatoire'),
      dateNais: Yup.date().notRequired(),
      nomCon: Yup.string().required('Le nom du conjoint est obligatoire'),
      prenomCon: Yup.string().required('Le prenom du conjoint est obligatoire'),
      dateNaissanceCon: Yup.string().required('La date de naissance du conjoint est obligatoire'),
      nationaliteCon: Yup.string().required('La nationalité du conjoint est obligatoire'),
      passportCon: Yup.string().required('Le passport du conjoint est obligatoire'),
      taille: Yup.string().required('La taille  est obligatoire'),
      poids: Yup.string().required('Le poids est obligatoire'),

      //nomUtilisateur: Yup.string().required('Le nom est obligatoire'),
      sexe: Yup.string().required('Le sexe est obligatoire'),
      civilite: Yup.string().required('La civilité est obligatoire'),
      groupeSanguin: Yup.string().required('Le groupe sanguin est obligatoire'),
      visionGauche: Yup.string().required('La vision gauche est obligatoire'),
      visionDroite: Yup.string().required('La vision droite est obligatoire'),
      audienceGauche: Yup.string().required('Audience Gauche est obligatoire'),
      audienceDroite: Yup.string().required('Audience Droite obligatoire'),
      mainGauche: Yup.string().required('La main gauche est obligatoire'),
      mainDroite: Yup.string().required('La main Droite est obligatoire'),
      jambeGauche: Yup.string().required('La jambe gauche est obligatoire'),
      jambeDroite: Yup.string().required('La jambe droite est obligatoire'),
      boitePostale: Yup.string().notRequired(),

      nomPersonneAContacter: Yup.string().notRequired(),
      prenomPersonneAContacter: Yup.string().notRequired(),
      telephonePersonneAContacter: Yup.number().notRequired(),
      relation: Yup.string().notRequired(),
    });

    const personnelForm = ref<Personnel | null>(null);
    const router = useRouter();
    const religions = ref();
    const ethnies = ref();
    const services = ref();

    // const nom= ref(true)

    // watch(nom, () => {
    //   console.log('estservice', nom.value)
    // })

    // formulaire dynamique start enfant

    const isDisable = ref(true);
    const enfants = reactive([
      {
        nom: "",
        sexe: "",
        prenom: "",
        dateNaissance: ""
      },
    ]);

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

    const valideteRowEnfant = (e) => {
      if (e == "" || e == 0 || e == "0" || e == null || e < 0) {
        console.log('erg')
        return true;
      } else {
        return false;
      }
    };


    watch(enfants, (newValue, oldValue) => {
      Object.keys(newValue).forEach(function (key) {
        if (
          newValue[key].nom == "" ||
          newValue[key].sexe == "" ||
          newValue[key].prenom == "" ||
          newValue[key].dateNaissance == ""
        ) {
          isDisable.value = true;
        } else {
          isDisable.value = false;
        }
      });
    });

    const { remove, push, fields, update } = useFieldArray("enfants");

    const enfantOptions = ref([]);
    const produitsss: any = ref(null);
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
      ApiService.post("/personnels", values)
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

    const fetchEnfant = async () => {
      try {
        const response = await ApiService.get("/enfants");
        const enfantData = response.data.data.data;
        enfantOptions.value = enfantData.map((enfant) => ({
          value: enfant.id,
          label: `${enfant.nom + " " + enfant.prenom}`,
        }));
      } catch (error) {
        //
      }
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
        const banqueData = response.data.data.data;
        banqueOptions.value = banqueData.map((banque) => ({
          value: banque.id,
          label: `${banque.denomination}`,
        }));
      } catch (error) {
        //
      }
    };



    onMounted(async () => {
      await fetchEnfant();
      await getAllReligions();
      await getAllEthnies();
      await getAllServices();
      await fetchBanque();
    })

    return {
      personnelSchema,
      addPersonnel,
      personnelForm,
      removeRowEnfant,
      addRowEnfant,
      valideteRowEnfant,
      valuess,
      enfantOptions,
      isDisable,
      enfants,
      religionOptions,
      ethnieOptions,
      serviceOptions,
      banqueOptions,
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
