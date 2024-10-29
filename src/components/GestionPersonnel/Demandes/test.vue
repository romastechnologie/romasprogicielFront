<template>
    <div>
        <h2>Formulaire de calcul du total</h2>
        
        <form @submit.prevent="addValue">
            <label for="valueInput">Ajouter une valeur :</label>
            <input type="number" v-model.number="newValue" id="valueInput" />
            <button type="button" @click="addValue">Ajouter</button>
        </form>

        <ul>
            <li v-for="(value, index) in values" :key="index">
                Valeur {{ index + 1 }} : {{ value }}
                <button @click="removeValue(index)">Supprimer</button>
            </li>
        </ul>

        <label for="total">Total :</label>
        <input type="number" :value="total" id="total" readonly />
    </div>
</template>

<script>
export default {
    data() {
        return {
            newValue: 0,  // Valeur temporaire du champ
            values: []    // Tableau pour stocker toutes les valeurs ajoutées
        };
    },
    computed: {
        total() {
            // Calcule le total de toutes les valeurs dans le tableau
            return this.values.reduce((sum, value) => sum + value, 0);
        }
    },
    methods: {
        addValue() {
            // Ajoute la nouvelle valeur au tableau si elle est valide
            if (this.newValue > 0) {
                this.values.push(this.newValue);
                this.newValue = 0; // Réinitialise le champ
            } else {
                alert("Veuillez entrer une valeur positive.");
            }
        },
        removeValue(index) {
            // Supprime une valeur du tableau
            this.values.splice(index, 1);
        }
    }
};
</script>

<style scoped>
form {
    display: flex;
    gap: 0.5em;
    align-items: center;
    margin-bottom: 1em;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: flex;
    gap: 0.5em;
    align-items: center;
}
button {
    cursor: pointer;
}
</style>
