import http from "../../../http-common";

class TranslateDataService {
  // getAll() {
  //     return http.get('/users')
  // }

  translate(text) {
    return http.post("translate/v2/translate", {
      sourceLanguageCode: "ru",
      targetLanguageCode: "en",
      format: "PLAIN_TEXT",
      texts: [text],
      folderId: "b1gisbvcpmfdmdheh44m",
      model: "string",
      glossaryConfig: {
        glossaryData: {
          glossaryPairs: [
            {
              sourceText: "string",
              translatedText: "string",
            },
          ],
        },
      },
      speller: true,
    });
  }

  // update(id, data) {
  //     return http.put(`/user/${id}`, data)
  // }

  // delete(id) {
  //     return http.delete(`/user/${id}`)
  // }
}
export default new TranslateDataService();
