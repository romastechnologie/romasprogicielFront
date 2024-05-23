<template>
    <div class="p-5 ">
      <h4 class="text-center"> Modifier le justificatif </h4>
        <div class="card p-2 col-lg-6 col-md-7 mx-auto">
          <Form @submit="updateJustificatif" :validation-schema="schemaJustificatif()">
            <p class="my-0"> Date de debut </p>
            <Field type="date" name="dateDebutJustificatif" id="dateDebutJustificatif" class="form-control mb-1 " />
            <ErrorMessage name="dateDebutJustificatif" class="text-danger text-start mb-2" />
            <p class="my-0"> Date de Fin </p>
            <Field type="date" name="dateFinJustificatif" id="dateFinJustificatif" class="form-control mb-1" />
            <ErrorMessage name="dateFinJustificatif" class="text-danger text-start mb-2" />
            <p class="my-0"> Preuve </p>
            <Field type="file" name="fileJustificatif" id="fileJustificatif" class="form-control mb-1" />
            <ErrorMessage name="fileJustificatif" class="text-danger text-start mb-2" />
            <div>
              <button type="submit" class="btn btn-primary"> Modifier </button>
            </div>
          </Form>
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup';
  import { configure } from 'vee-validate'
  import { useRouter, useRoute } from 'vue-router';
  import Swal from 'sweetalert2';
  import axios from 'axios';
import ApiService from '@/services/ApiService';
  
  const router = useRouter()
  const route = useRoute()
  
  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: false,
  });
  
  // ------------------------------------------------ SCHEMA -------------------------------------------------
  
  function schemaJustificatif() {
    return yup.object().shape({
      dateDebutJustificatif: yup.date().required("La date de début est requise."),
      dateFinJustificatif: yup.date().required("La date de fin est requise."),
      fileJustificatif: yup.string().required("La preuve est requise."),
    })
  }
  
  // ------------------------------------------------ UPDATE -------------------------------------------------
  
  async function updateJustificatif() {
  
    const formData = new FormData();
  
    const target = document.getElementById("fileJustificatif") as HTMLInputElement;
    const dateDebutJustificatif = document.getElementById("dateDebutJustificatif") as HTMLInputElement;
    const dateFinJustificatif = document.getElementById("dateFinJustificatif") as HTMLInputElement;
  
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      if (file && file.size > 1048576) {
        Swal.fire({
          title: "Oops...!",
          text: "La taille du fichier dépasse 1 Mo!",
          icon: "error"
        });
      } else {
  
        formData.append("dateDebut", (dateDebutJustificatif.value as string).toString().slice(0, 10))
        formData.append("dateFin", (dateFinJustificatif.value as string).toString().slice(0, 10))
        formData.append('fichier', target.files[0])
  
        try {
          const response = await ApiService.put(`/justificatifs/${route.params.id}`, formData);
          Swal.fire({
            timer: 1500,
            position: "top-end",
            text: "Le justificatif a été modifié avec succès!",
            icon: "success"
          });
          router.push("/justificatifs/liste-justificatif")
        } catch (error) {
          console.error('Erreur lors de l\'envoie du justificatif:', error);
          throw error;
        }
      }
    }
  }
  
  </script>
  
  <style></style>