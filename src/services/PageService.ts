import axios from 'axios';
import { parseOptionsToAxiosConfig } from '@/services/ServiceUtils';

const API_PATH = "http://localhost:3000/pages";

class PageService {

    listPages(options: any) {
        return axios.get(API_PATH, parseOptionsToAxiosConfig(options))
        .then(response => {
            return response.data;
        });
    }
}

export default new PageService();