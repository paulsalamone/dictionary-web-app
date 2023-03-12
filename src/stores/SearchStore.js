import { defineStore } from 'pinia'

export const useSearchStore = defineStore({
    id: 'dictionary',
    state: () => ({
        searchString: '',
        searchResponse: {},
        empty: false,
        invalid: false
    }),

    actions: {
        handleEmpty() {
            this.empty = true;
            this.searchResponse = {}
        },
        handleInvalid() {
            this.invalid = true;
        },
        async searchDictionary(word) {
            console.log('store dict')
            this.empty = false;
            this.invalid = false

            try {
                console.log('store try')
                const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                if (response.status === 404) {
                    console.log("404!!!!!!!!")

                }
                const data = await response.json()

                data ? this.searchResponse = data : null


            } catch (error) {
                console.log(typeof error)

            }

            this.searchString = word;

        }
    }
})
