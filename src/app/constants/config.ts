import { German } from './languagefiles/de_DE';
import { English } from './languagefiles/en_US';
import { Spanish } from './languagefiles/es_ES';
import { French } from './languagefiles/fr_FR';

export const config = {
    // API_URL: 'http://35.187.63.192:8080',
    API_URL: 'http://localhost:8080',
    LANGUAGES: [{
        NAME: 'German',
        PATH: German
    }, {
        NAME: 'English',
        PATH: English
    }, {
        NAME: 'Spanish',
        PATH: Spanish
    }, {
        NAME: 'French',
        PATH: French
    }],
    IMAGE_UPLOAD_URL: ''
};