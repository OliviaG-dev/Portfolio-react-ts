import projects from '../assets/data/projects.json';
import quests from '../assets/data/quests.json';
import { DataProjects, Quest } from './inteface';

export class Data {
  [x: string]: any;
  getDataProjects = (): DataProjects[] => {
    return projects as DataProjects[];
  };
}

export class DataQuests {
  getDataQuests = (): Quest[] => {
    return quests as Quest[];
  };
}


