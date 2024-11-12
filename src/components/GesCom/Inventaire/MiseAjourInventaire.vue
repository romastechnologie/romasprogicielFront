Ici c'est Bénin
<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="fournisseurForm" @submit="editFournisseur" :validation-schema="fournisseurSchema" :initial-values="fournisseurForm">
            <div class="row">
              
              <div class="col-md-4">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Nom <span class="text-danger">*</span>
                  </label>
                  <Field name="nomFournisseur" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                  <ErrorMessage name="nomFournisseur" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Prénom <span class="text-danger">*</span>
                  </label>
                  <Field name="prenomFournisseur" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le prenom"/>
                  <ErrorMessage name="prenomFournisseur" class="text-danger"/>
                </div>
              </div> 
        </div>
      </Form>
    </div>
  </div>
  </template>
  
  <script lang="ts">
  
  </script>