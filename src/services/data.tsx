import projects from '../assets/dataMock/projects.json'
import { DataProjects } from './inteface';

class Data {
    [x: string]: any;
    getDataProjects = (): DataProjects[] => {
        return projects as DataProjects[];
    };
}

export default Data;