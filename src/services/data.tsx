import projects from '../assets/data/projects.json';
import quests from '../assets/data/quests.json';
import { DataProjects, Quest } from './inteface';

export class Data {
  getDataProjects = (): DataProjects[] => {
    return (projects as DataProjects[]).filter((project) => !project.hidden);
  };
}

export class DataQuests {
  getDataQuests = (): Quest[] => {
    return quests as Quest[];
  };
}
