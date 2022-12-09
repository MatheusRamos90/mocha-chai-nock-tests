import {assert, expect} from 'chai';
import sinon from 'sinon';
import {UsersService} from '../../app/service/users.service';
import {UsersResponse} from '../../app/dto/users-response';
import axios from 'axios';

describe('UsersServiceTest', () => {
    const usersService = new UsersService();
    const axiosMock = sinon.mock(axios);

    it('should be get all users with success when call users path', async () => {
        const usersResponseMock: { status: number, data: UsersResponse[] } = {
            status: 200,
            data: [
                {
                    id: 1,
                    name: 'John',
                    lastname: 'Jones',
                    email: 'john.jones@jj.com'
                }
            ]
        };
        axiosMock.expects('get').resolves(usersResponseMock);

        const usersResponse = await usersService.getAll();

        assert.equal(usersResponse[0].id, 1);
    });

    it('should be throw when get all users by service', async () => {
        axiosMock.expects('get').rejects();

        try {
            await usersService.getAll();
        } catch (e) {
            expect(() => usersService.getAll()).to.throw(Error);
        }
    });
});
