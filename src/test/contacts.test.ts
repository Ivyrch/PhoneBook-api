import request from 'supertest';
import { app, server } from '../server';


describe('Contacts API', () => {
    afterAll(done => {
        if (server) {
            server.close(done);
        } else {
            done();
        }
    });
    it('should create a new contact', async () => {
        const newContact = {
            firstName: 'Leonardo',
            lastName: 'DiCaprio',
            phone: '123-456-7890'
        };

        const response = await request(app)
            .post('/api/contacts')
            .send(newContact)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('id');
        expect(response.body.firstName).toBe(newContact.firstName);
        expect(response.body.lastName).toBe(newContact.lastName);
        expect(response.body.phone).toBe(newContact.phone);
    });


    it('should get all contacts', async () => {
        const response = await request(app)
            .get('/api/contacts')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toBeInstanceOf(Array);
    });

    it('should update a contact', async () => {
        const newContact = {
            firstName: 'Josh',
            lastName: 'Doe',
            phone: '113-255-3553'
        };

        const createdResponse = await request(app)
            .post('/api/contacts')
            .send(newContact)
            .expect('Content-Type', /json/)
            .expect(200);

        const updatedContact = {
            firstName: 'Josh',
            lastName: 'Smith',
            phone: '113-255-3553'
        };

        const updateResponse = await request(app)
            .put(`/api/contacts/${createdResponse.body.id}`)
            .send(updatedContact)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(updateResponse.body.contact.firstName).toBe(updatedContact.firstName);
        expect(updateResponse.body.contact.lastName).toBe(updatedContact.lastName);
        expect(updateResponse.body.contact.phone).toBe(updatedContact.phone);
    });


    it('should delete a contact', async () => {
        const newContact = {
            firstName: 'Katt',
            lastName: 'Johnson',
            phone: '455-993-6667'
        };

        const createdResponse = await request(app)
            .post('/api/contacts')
            .send(newContact)
            .expect('Content-Type', /json/)
            .expect(200);

        const deleteResponse = await request(app)
            .delete(`/api/contacts/${createdResponse.body.id}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(deleteResponse.body).toHaveProperty('message', 'Contact deleted');
    });

});