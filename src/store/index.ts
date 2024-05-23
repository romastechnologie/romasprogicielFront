import { createStore } from 'vuex'

export default createStore({
  state: {
    personnels: [] as any[],
    categorieDemandes: [] as any[],
    typeConges: [] as any[],
    demandes: [] as any[],
    presences: [] as any[],
    heuresups: [] as any[],
    conges: [] as any[],
    permissions: [] as any[],
    horaires: [] as any[],
    services: [] as any[],
    fonctions: [] as any[],
    contrats: [] as any[],
    horairePersos: [] as any[],
    servicePersos: [] as any[],
    fonctionPersos: [] as any[],
    contratPersos: [] as any[],
    justificatifs: [] as any[]
  },
  getters: {
  },
  mutations: {
    // Personnels
    SET_PERSONNELS(state, payload) {
      state.personnels = payload;
    },
    ADD_PERSONNEL(state, personnels: any) {
      state.personnels.push(personnels);
    },
    UPDATE_PERSONNEL(state, updatedPersonnel) {
      const index = state.personnels.findIndex(personnel => personnel.id === updatedPersonnel.id);
      if (index !== -1) {
        state.personnels.splice(index, 1, updatedPersonnel);
      }
    },
    DELETE_PERSONNEL(state, payload) {
      state.personnels = state.personnels.filter(personnel => personnel.id !== payload.id);
    },

    // CategorieDemande
    SET_CATEGORIEDEMANDES(state, payload) {
      state.categorieDemandes = payload;
    },
    ADD_CATEGORIEDEMANDE(state, categorieDemande: any) {
      state.categorieDemandes.push(categorieDemande);
    },
    UPDATE_CATEGORIEDEMANDE(state, updatedCategorieDemande) {
      const index = state.categorieDemandes.findIndex(categorieDemande => categorieDemande.id === updatedCategorieDemande.id);
      if (index !== -1) {
        state.categorieDemandes.splice(index, 1, updatedCategorieDemande);
      }
    },
    DELETE_CATEGORIEDEMANDE(state, payload) {
      state.categorieDemandes = state.categorieDemandes.filter(categorieDemande => categorieDemande.id !== payload.id);
    },

    // TypeConges
    SET_TYPECONGES(state, payload) {
      state.typeConges = payload;
    },
    ADD_TYPECONGE(state, typeConge: any) {
      state.typeConges.push(typeConge);
    },
    UPDATE_TYPECONGE(state, updatedtypeConges) {
      const index = state.typeConges.findIndex(typeConge => typeConge.id === updatedtypeConges.id);
      if (index !== -1) {
        state.typeConges.splice(index, 1, updatedtypeConges);
      }
    },
    DELETE_TYPECONGE(state, payload) {
      state.typeConges = state.typeConges.filter(typeConge => typeConge.id !== payload.id);
    },

    // Demande
    SET_DEMANDES(state, payload) {
      state.demandes = payload;
    },
    ADD_DEMANDE(state, demande: any) {
      state.demandes.push(demande);
    },
    UPDATE_DEMANDE(state, updatedDemande) {
      const index = state.demandes.findIndex(demande => demande.id === updatedDemande.id);
      if (index !== -1) {
        state.demandes.splice(index, 1, updatedDemande);
      }
    },
    DELETE_DEMANDE(state, payload) {
      state.demandes = state.demandes.filter(demande => demande.id !== payload.id);
    },

    // Presence
    SET_PRESENCES(state, payload) {
      state.presences = payload;
    },
    ADD_PRESENCE(state, presence: any) {
      state.presences.push(presence);
    },
    UPDATE_PRESENCE(state, updatedPresence) {
      const index = state.presences.findIndex(presence => presence.id === updatedPresence.id);
      if (index !== -1) {
        state.presences.splice(index, 1, updatedPresence);
      }
    },
    DELETE_PRESENCE(state, payload) {
      state.presences = state.presences.filter(presence => presence.id !== payload.id);
    },

    // HeureSup
    SET_HEURESUPS(state, payload) {
      state.heuresups = payload;
    },
    ADD_HEURESUP(state, heuresup: any) {
      state.heuresups.push(heuresup);
    },
    UPDATE_HEURESUP(state, updatedHeuresup) {
      const index = state.heuresups.findIndex(heuresup => heuresup.id === updatedHeuresup.id);
      if (index !== -1) {
        state.heuresups.splice(index, 1, updatedHeuresup);
      }
    },
    DELETE_HEURESUP(state, payload) {
      state.heuresups = state.heuresups.filter(heuresup => heuresup.id !== payload.id);
    },

    // Conge
    SET_CONGES(state, payload) {
      state.conges = payload;
    },
    ADD_CONGE(state, conge: any) {
      state.conges.push(conge);
    },
    UPDATE_CONGE(state, updatedconges) {
      const index = state.conges.findIndex(conge => conge.id === updatedconges.id);
      if (index !== -1) {
        state.conges.splice(index, 1, updatedconges);
      }
    },
    DELETE_CONGE(state, payload) {
      state.conges = state.conges.filter(conge => conge.id !== payload.id);
    },

    // Permission
    SET_PERMISSIONS(state, payload) {
      state.permissions = payload;
    },
    ADD_PERMISSION(state, permission: any) {
      state.permissions.push(permission);
    },
    UPDATE_PERMISSION(state, updatedpermission) {
      const index = state.permissions.findIndex(permission => permission.id === updatedpermission.id);
      if (index !== -1) {
        state.permissions.splice(index, 1, updatedpermission);
      }
    },
    DELETE_PERMISSION(state, payload) {
      state.permissions = state.permissions.filter(permission => permission.id !== payload.id);
    },

    // Horaire
    SET_HORAIRES(state, payload) {
      state.horaires = payload;
    },
    // Horaire personnel
    SET_HORAIREPERSOS(state, payload) {
      state.horairePersos = payload;
    },
    ADD_HORAIREPERSO(state, horairePerso: any) {
      state.horairePersos.push(horairePerso);
    },
    UPDATE_HORAIREPERSO(state, updatedhorairePerso) {
      const index = state.horairePersos.findIndex(horairePerso => horairePerso.id === updatedhorairePerso.id);
      if (index !== -1) {
        state.horairePersos.splice(index, 1, updatedhorairePerso);
      }
    },
    DELETE_HORAIREPERSO(state, payload) {
      state.horairePersos = state.horairePersos.filter(horairePerso => horairePerso.id !== payload.id);
    },

    // Service
    SET_SERVICES(state, payload) {
      state.services = payload;
    },
    // Service personnel
    SET_SERVICEPERSOS(state, payload) {
      state.servicePersos = payload;
    },
    ADD_SERVICEPERSO(state, servicePerso: any) {
      state.servicePersos.push(servicePerso);
    },
    UPDATE_SERVICEPERSO(state, updatedservicePerso) {
      const index = state.servicePersos.findIndex(servicePerso => servicePerso.id === updatedservicePerso.id);
      if (index !== -1) {
        state.servicePersos.splice(index, 1, updatedservicePerso);
      }
    },
    DELETE_SERVICEPERSO(state, payload) {
      state.servicePersos = state.servicePersos.filter(servicePerso => servicePerso.id !== payload.id);
    },

    // Fonction
    SET_FONCTIONS(state, payload) {
      state.fonctions = payload;
    },
    // Fonction personnel
    SET_FONCTIONPERSOS(state, payload) {
      state.fonctionPersos = payload;
    },
    ADD_FONCTIONPERSO(state, fonctionPerso: any) {
      state.fonctionPersos.push(fonctionPerso);
    },
    UPDATE_FONCTIONPERSO(state, updatedfonctionPerso) {
      const index = state.fonctionPersos.findIndex(fonctionPerso => fonctionPerso.id === updatedfonctionPerso.id);
      if (index !== -1) {
        state.fonctionPersos.splice(index, 1, updatedfonctionPerso);
      }
    },
    DELETE_FONCTIONPERSO(state, payload) {
      state.fonctionPersos = state.fonctionPersos.filter(fonctionPerso => fonctionPerso.id !== payload.id);
    },

    // Contrat
    SET_CONTRATS(state, payload) {
      state.contrats = payload;
    },
    // Contrat personnel
    SET_CONTRATPERSOS(state, payload) {
      state.contratPersos = payload;
    },
    ADD_CONTRATPERSO(state, contratPerso: any) {
      state.contratPersos.push(contratPerso);
    },
    UPDATE_CONTRATPERSO(state, updatedcontratPerso) {
      const index = state.contratPersos.findIndex(contratPerso => contratPerso.id === updatedcontratPerso.id);
      if (index !== -1) {
        state.contratPersos.splice(index, 1, updatedcontratPerso);
      }
    },
    DELETE_CONTRATPERSO(state, payload) {
      state.contratPersos = state.contratPersos.filter(contratPerso => contratPerso.id !== payload.id);
    },

    // Justificatif
    SET_JUSTIFICATIFS(state, payload) {
      state.justificatifs = payload;
    },
    ADD_JUSTIFICATIF(state, justificatif) {
      state.justificatifs.push(justificatif);
    },
    UPDATE_JUSTIFICATIF(state, updatedJustificatif) {
      const index = state.justificatifs.findIndex(justificatif => justificatif.id === updatedJustificatif.id);
      if (index !== -1) {
        state.justificatifs.splice(index, 1, updatedJustificatif);
      }
    },
    DELETE_JUSTIFICATIF(state, payload) {
      state.justificatifs = state.justificatifs.filter(justificatif => justificatif.id !== payload.id);
    },
    

  },
  actions: {
    /*
    async fetchPersonnels({ commit }) {
      try {
        const response = await axios.get('http://example.com/api/personnels');
        commit('SET_PERSONNELS', response.data);
      } catch (error) {
        console.error('Error fetching personnels:', error);
      }
    },
    async createPersonnel({ commit }, personnel) {
      try {
        const response = await axios.post('http://example.com/api/personnels', personnel);
        commit('ADD_PERSONNEL', response.data);
      } catch (error) {
        console.error('Error creating personnel:', error);
      }
    },
    async updatePersonnel({ commit }, personnel) {
      try {
        const response = await axios.put(`http://example.com/api/personnels/${personnel.id}`, personnel);
        commit('UPDATE_PERSONNEL', response.data);
      } catch (error) {
        console.error('Error updating personnel:', error);
      }
    },
    async deletePersonnel({ commit }, id) {
      try {
        await axios.delete(`http://example.com/api/personnels/${id}`);
        commit('DELETE_PERSONNEL', { id });
      } catch (error) {
        console.error('Error deleting personnel:', error);
      }
    },
    */
  },
  modules: {
  }
})
