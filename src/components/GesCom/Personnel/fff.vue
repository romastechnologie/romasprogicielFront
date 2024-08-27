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
        <Field name="religions" v-model="religions" type="text" v-slot="{ field }">
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
        <Field name="ethnies" v-model="ethnies" type="text" v-slot="{ field }">
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