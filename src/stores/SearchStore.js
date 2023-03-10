import { defineStore } from 'pinia'

export const useSearchStore = defineStore({
    id: 'dictionary',
    state: () => ({
        searchString: '',
        searchResponse: {},
        nothingFound: false
    }),

    actions: {
        async searchDictionary(word) {
            this.searchString = word;


            try {
                const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

                if (response.status === 404) {
                    console.log("404!!!!!!!!")
                    this.nothingFound = true;
                }
                const data = await response.json()

                data ? this.searchResponse = data : null


            } catch (error) {
                console.log(typeof error)

            }


        }
    }
})
