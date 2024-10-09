<template>
  <div>
    <h2>Horaires de la semaine</h2>
    <form @submit.prevent="submitForm">
      <div v-for="(item, index) in weekDays" :key="index">
        <h3>{{ item.day }}</h3>

        <label :for="'openTime' + index">Heure d'ouverture :</label>
        <input
          type="time"
          v-model="item.openTime"
          :id="'openTime' + index"
        />

        <label :for="'closeTime' + index">Heure de fermeture :</label>
        <input
          type="time"
          v-model="item.closeTime"
          :id="'closeTime' + index"
        />

        <label :for="'pauseStart' + index">Heure début de pause :</label>
        <input
          type="time"
          v-model="item.pauseStart"
          :id="'pauseStart' + index"
        />

        <label :for="'pauseEnd' + index">Heure fin de pause :</label>
        <input
          type="time"
          v-model="item.pauseEnd"
          :id="'pauseEnd' + index"
        />

        <hr />
      </div>

      <button type="submit">Soumettre</button>
    </form>

    <div v-if="submitted">
      <h3>Horaires soumis :</h3>
      <ul>
        <li v-for="(item, index) in weekDays" :key="index">
          {{ item.day }} : Ouvert de {{ item.openTime }} à {{ item.closeTime }}. Pause de {{ item.pauseStart }} à {{ item.pauseEnd }}.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weekDays: [
        { day: "Lundi", openTime: "", closeTime: "", pauseStart: "", pauseEnd: "" },
        { day: "Mardi", openTime: "", closeTime: "", pauseStart: "", pauseEnd: "" },
        { day: "Mercredi", openTime: "", closeTime: "", pauseStart: "", pauseEnd: "" },
        { day: "Jeudi", openTime: "", closeTime: "", pauseStart: "", pauseEnd: "" },
        { day: "Vendredi", openTime: "", closeTime: "", pauseStart: "", pauseEnd: "" },
        { day: "Samedi", openTime: "", closeTime: "", pauseStart: "", pauseEnd: "" },
        { day: "Dimanche", openTime: "", closeTime: "", pauseStart: "", pauseEnd: "" },
      ],
      submitted: false,
    };
  },
  methods: {
    submitForm() {
      this.submitted = true;
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  margin-right: 10px;
}

input {
  margin-bottom: 10px;
}

button {
  margin-top: 20px;
}

hr {
  margin-top: 20px;
}
</style>
