import projects from '../assets/data/projects.json'
import quests from '../assets/data/quests.json'
import { DataProjects, Quest } from './inteface';

class Data {
    [x: string]: any;
    getDataProjects = (): DataProjects[] => {
        return projects as DataProjects[];
    };
}

class DataQuests {
    getDataQuests = (): Quest[] => {
        return quests as Quest[];
    };
}

export default Data;