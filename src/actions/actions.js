// on App.js
export const populateApp = (xmlData) => {
    return {
        type: 'POPULATE_APP',
        xmlData: xmlData
    }
}
