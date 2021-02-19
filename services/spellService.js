// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
const projectId = 'corded-dragon-304622';
const keyFileName = 'services\My Project-cfc3f1c3a3bb.json';
const translate = new Translate({projectId, keyFileName});

class SpellService {
  constructor() {
  }

	async translateText(spell, target = 'hu') {
		// Translates the text into the target language. "text" can be a string for
		// translating a single piece of text, or an array of strings for translating
		// multiple texts.
		let [translations] = await translate.translate(spell, target);
		return translations = Array.isArray(translations) ? translations : [translations];
	}

  translateSpell(spell) {
    return new Promise((resolve, reject) => {
			resolve(this.translateText(spell));
			reject(console.log(err))
    });
  }

}
module.exports = SpellService;