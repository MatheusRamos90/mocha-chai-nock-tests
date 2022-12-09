import {UsersResponse} from '../dto/users-response';
import axios from 'axios';

export class UsersService {

    private readonly urlUsersApi = process.env['URL_USERS_API'] as string;

    getAll(): Promise<UsersResponse[]> {
        return axios
            .get(this.urlUsersApi)
            .then(value => {
                const status = value.status.toString();
                if (status.startsWith('2')) {
                    return value.data;
                }
            }).catch(reason => {
                const messageError = `Occurred an error to connect with users service. ${reason}`;
                console.error(messageError);
                throw new Error(messageError);
            });
    }

}
