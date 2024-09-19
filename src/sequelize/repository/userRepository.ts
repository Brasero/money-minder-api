import db from '../models/index'
interface IUser {
    nom: string,
    prenom: string,
    pseudo: string,
    mail: string,
    mdp: string,
    brithday: Date,
    code_validation: string | null,
}

const utilisateur = db['user']
export function createUserIfNotExist(user: IUser){
    return utilisateur.findOne({
        where: {
            mail: user.mail
        }
    }).then(
        async (user) => {
            if(user){
                return 'User already exist'
            } else {
                try {
                    utilisateur.create({
                        nom: user.nom,
                        prenom: user.prenom,
                        pseudo: user.pseudo,
                        mail: user.mail,
                        mdp: user.mdp,
                        birthday: user.brithday,
                        code_validation: null
                    }).then((user) => {
                        if(user) {
                            return user
                        }
                        return false
                    })
                }catch(reason) {
                    console.log(reason)
                    return false
                }
            }
        }
    )

}

export function findUserById(id: number | string){
    try {
        return utilisateur.findByPk(id).then((user) => {
          if(user){
              return user
          }
          return false
        }, (reason) => {
            console.log(reason)
            return false
        })
    } catch (reason){
        console.log(reason)
        return false
    }
}

export async function updateUser(id : number | string, update: IUser): Promise<boolean | IUser>{
    try{
        return utilisateur.findByIdAndUpdate(id,{...update}).then((user) => {
            if(user) {
                return user
            }
            return false
        }, (reason) => {
            console.log(reason)
            return false
        })
    } catch(e) {
        console.log(e)
        return false
    }
}

export async function deleteUser(id: number | string) {
    try{
        return utilisateur.deleteOne({id:id}).then(() => {
            return true
        }, () => {
            return false
        })
    }catch(e){
        console.log(e)
        return false
    }
}