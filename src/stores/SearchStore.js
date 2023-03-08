import { defineStore } from 'pinia'

export const useSearchStore = defineStore({
    id: 'dictionary',
    state: () => ({
        searchString: '',
        searchResponse: {}
    }),

    actions: {
        async searchDictionary(word) {
            this.searchString = word;


            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

            const data = await response.json()

            data ? this.searchResponse = data : null


        }
    }
})
