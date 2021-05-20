import axios from 'axios';
import { parseOptionsToAxiosConfig } from '@/services/ServiceUtils';

const API_PATH = "/project/";

class GitService {

    createProject(gitURL: string, options={}) {
        const cfg = Object.assign({ git_url: gitURL }, parseOptionsToAxiosConfig(options));
        return axios.post(API_PATH, cfg)
            .then(response => {
                return response.data;
            });
    }

    listProjects(options: any) {
        return axios.get(API_PATH, parseOptionsToAxiosConfig(options))
        .then(response => {
            return response.data;
        });
    }

    getProjectDetails(projectId: number, options: any) {
        return axios.get(API_PATH + projectId, parseOptionsToAxiosConfig(options))
        .then(response => {
            return response.data;
        });
    }
}

export default new GitService();