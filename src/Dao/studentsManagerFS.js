import fs from 'fs';

export default class StudentsManager {
    async getAllStudents(){
        if (fs.existsSync(path)){
            try{
                const studentsFile = await fs.promises.readFile(path, 'utf-8')
                return JSON.parse
            } catch(error){
                console.log(error);
            }
        } else {
            return []
        }
    }

    async createStudent(objStudent){
        const allStudents = await this.getAllStudents()
        let id
        if(allStudents.length===0){
            id=1
        } else {
            id = allStudents[allStudents.length-1].id+1
        }
        const newStudent = {id,...objStudent}
        await fs.promises.writeFile(path,JSON.stringify(allStudents))
        return newStudent
    }
}