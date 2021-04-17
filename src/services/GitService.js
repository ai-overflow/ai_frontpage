import axios from 'axios';
import { parseOptionsToAxiosConfig } from '@/services/ServiceUtils';

const API_PATH = "/project/";

class GitService {

    createProject(gitURL, options={}) {
        let cfg = Object.assign({ git_url: gitURL }, parseOptionsToAxiosConfig(options));
        return axios.post(API_PATH, cfg)
            .then(response => {
                return response.data;
            });
    }
}

export default new GitService();