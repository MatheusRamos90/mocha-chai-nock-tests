import {expect} from 'chai';
import nock from 'nock';
import {UsersResponse} from '../../app/dto/users-response';
import axios from 'axios';

describe('UsersControllerTest', () => {

    describe('Nock tests', () => {
        it('should be get all users with success when call users API', async () => {
            const usersResponseMock: UsersResponse[] = [
                {
                    id: 1,
                    name: 'John',
                    lastname: 'Jones',
                    email: 'john.jones@jj.com'
                }
            ];

            const scopeNock = nock('http://localhost:5000')
                .get('/api/users')
                .reply(200, usersResponseMock);

            const response = await axios.get('http://localhost:5000/api/users');

            scopeNock.done();
            expect(response.data).not.null;
            expect(response.data.length).equals(1);
            expect(response.data[0].id).equals(1);
            expect(response.data[0].name).equals('John');
            expect(response.data[0].lastname).equals('Jones');
            expect(response.data[0].email).equals('john.jones@jj.com');
        });
    });

});
