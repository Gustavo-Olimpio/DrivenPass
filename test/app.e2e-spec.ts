import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { initializeFactoryPrisma, createUsers, createCredential, createNote, createCards } from './factories';
import { UsersService } from 'src/users/users.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let service: UsersService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    })
      .compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    prisma = app.get(PrismaService)
    service = app.get(UsersService)
    await prisma.cards.deleteMany();
    await prisma.credentials.deleteMany();
    await prisma.notes.deleteMany();
    await prisma.users.deleteMany();
    await app.init();
    initializeFactoryPrisma(prisma);
  });
  describe('/HEALTH ', () => {
    it('get/health', async () => {
      return await request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect('I’m okay!');
    });
  });
  describe('/USERS ', () => {
    describe('/SIGN-UP ', () => {
      it('404 when email or password is not send', async () => {
        return await request(app.getHttpServer())
          .post('/users/sign-up')
          .send({
            email: ""
          })
          .expect(HttpStatus.BAD_REQUEST);
      })
      it('409 when email is already exists', async () => {
        const user = await createUsers()
        return await request(app.getHttpServer())
          .post('/users/sign-up')
          .send({
            email: user.email,
            password: "123456789Aa!"
          })
          .expect(HttpStatus.CONFLICT)
      })
      it('201 when everything is correct', async () => {
        return await request(app.getHttpServer())
          .post('/users/sign-up')
          .send({
            email: "gus@hotmail.com",
            password: "123456789Aa!"
          })
          .expect(HttpStatus.CREATED);
      })
    });
    describe('/SIGN-IN ', () => {
      it('401 when email or password is not registered', async () => {
        return await request(app.getHttpServer())
          .post('/users/sign-in')
          .send({
            email: "gus@hotmail.com",
            password: "123456789Aa!"
          })
          .expect(HttpStatus.UNAUTHORIZED);
      })
      it('200 when email and password is valid', async () => {
        const user = await createUsers()
        return await request(app.getHttpServer())
          .post('/users/sign-in')
          .send({
            email: user.email,
            password: '123456789Aa!'
          })
          .expect(HttpStatus.CREATED);
      })
    });
  });
  describe('/CREDENTIALS ', () => {
    describe('POST ', () => {
      it('401 when token is invalid', async () => {
        return await request(app.getHttpServer())
          .post('/credentials')
          .send({
            Title: "title",
            Url: "google.com",
            Username: "username",
            Password: "123"
          })
          .expect(HttpStatus.UNAUTHORIZED);
      })
      it('409 when credencial is alredy exists', async () => {
        const user = await createUsers()
        const token = await service.login({ email: user.email, password: '123456789Aa!' })
        const cred = await createCredential(user.id)
        return await request(app.getHttpServer())
          .post('/credentials')
          .set('Authorization', `Bearer ${token.token}`)
          .send({
            Title: cred.Title,
            Url: "google.com",
            Username: "username",
            Password: "123"
          })
          .expect(HttpStatus.CONFLICT);
      })
      it('201 when credencial is currently created', async () => {
        const user = await createUsers()
        const token = await service.login({ email: user.email, password: '123456789Aa!' })
        return await request(app.getHttpServer())
          .post('/credentials')
          .set('Authorization', `Bearer ${token.token}`)
          .send({
            Title: "title",
            Url: "google.com",
            Username: "username",
            Password: "123"
          })
          .expect(HttpStatus.CREATED);
      })
    });
    describe('GET ', () => {
      it('401 when token is invalid', async () => {
        const user = await createUsers()
        return await request(app.getHttpServer())
          .get('/credentials/1')
          .expect(HttpStatus.UNAUTHORIZED);
      })
      it('404 when credencial not exists', async () => {
        const user = await createUsers()
        const token = await service.login({ email: user.email, password: '123456789Aa!' })
        return await request(app.getHttpServer())
          .get('/credentials/1')
          .set('Authorization', `Bearer ${token.token}`)
          .expect(HttpStatus.NOT_FOUND);
      })
      it('403 when credencial is from another user', async () => {
        const user = await createUsers()
        const user2 = await createUsers()
        const token = await service.login({ email: user.email, password: '123456789Aa!' })
        const cred = await createCredential(user2.id)
        return await request(app.getHttpServer())
          .get(`/credentials/${cred.id}`)
          .set('Authorization', `Bearer ${token.token}`)
          .expect(HttpStatus.FORBIDDEN);
      })
      it('200 when credencial is from correct user', async () => {
        const user = await createUsers()
        const token = await service.login({ email: user.email, password: '123456789Aa!' })
        const cred = await createCredential(user.id)
        return await request(app.getHttpServer())
          .get(`/credentials/${cred.id}`)
          .set('Authorization', `Bearer ${token.token}`)
          .expect(HttpStatus.OK);
      })
    });
    describe('DELETE ', () => {
      it('401 when token is invalid', async () => {
        const user = await createUsers()
        return await request(app.getHttpServer())
          .delete('/credentials/1')
          .expect(HttpStatus.UNAUTHORIZED);
      })
      it('404 when credencial not exists', async () => {
        const user = await createUsers()
        const token = await service.login({ email: user.email, password: '123456789Aa!' })
        return await request(app.getHttpServer())
          .delete('/credentials/1')
          .set('Authorization', `Bearer ${token.token}`)
          .expect(HttpStatus.NOT_FOUND);
      })
      it('403 when credencial is from another user', async () => {
        const user = await createUsers()
        const user2 = await createUsers()
        const token = await service.login({ email: user.email, password: '123456789Aa!' })
        const cred = await createCredential(user2.id)
        return await request(app.getHttpServer())
          .delete(`/credentials/${cred.id}`)
          .set('Authorization', `Bearer ${token.token}`)
          .expect(HttpStatus.FORBIDDEN);
      })
      it('200 when credencial is from correct user', async () => {
        const user = await createUsers()
        const token = await service.login({ email: user.email, password: '123456789Aa!' })
        const cred = await createCredential(user.id)
        return await request(app.getHttpServer())
          .delete(`/credentials/${cred.id}`)
          .set('Authorization', `Bearer ${token.token}`)
          .expect(HttpStatus.OK);
      })
    });
    describe('/NOTES ', () => {
      describe('/POST ', () => {
        it('400 when Data is wrong', async () => {
          const user = await createUsers()
          const token = await service.login({ email: user.email, password: '123456789Aa!' })
          return await request(app.getHttpServer())
            .post(`/notes`)
            .set('Authorization', `Bearer ${token.token}`)
            .send({
              Tit: "title",
              Text: "texto"
            })
            .expect(HttpStatus.BAD_REQUEST);
        })
        it('401 when token is invalid', async () => {
          const user = await createUsers()
          const token = await service.login({ email: user.email, password: '123456789Aa!' })
          return await request(app.getHttpServer())
            .post(`/notes`)
            .send({
              Title: "title",
              Text: "texto"
            })
            .expect(HttpStatus.UNAUTHORIZED);
        })
        it('409 when Title is already exists', async () => {
          const user = await createUsers()
          const token = await service.login({ email: user.email, password: '123456789Aa!' })
          const note = await createNote(user.id)
          return await request(app.getHttpServer())
            .post(`/notes`)
            .set('Authorization', `Bearer ${token.token}`)
            .send({
              Title: note.Title,
              Text: "texto"
            })
            .expect(HttpStatus.CONFLICT);
        })
      });
      describe('/GET ', () => {
        it('401 when token is invalid', async () => {
          const user = await createUsers()
          const token = await service.login({ email: user.email, password: '123456789Aa!' })
          const note = await createNote(user.id)
          return await request(app.getHttpServer())
            .get(`/notes/1`)
            .expect(HttpStatus.UNAUTHORIZED);
        })
        it('403 when note is from another person', async () => {
          const user = await createUsers()
          const user2 = await createUsers()
          const token = await service.login({ email: user.email, password: '123456789Aa!' })
          const note = await createNote(user2.id)
          return await request(app.getHttpServer())
            .get(`/notes/${note.id}`)
            .set('Authorization', `Bearer ${token.token}`)
            .expect(HttpStatus.FORBIDDEN);
        })
        it('404 when note is not exists', async () => {
          const user = await createUsers()
          const token = await service.login({ email: user.email, password: '123456789Aa!' })
          return await request(app.getHttpServer())
            .get(`/notes/1`)
            .set('Authorization', `Bearer ${token.token}`)
            .expect(HttpStatus.NOT_FOUND);
        })
        it('200 when everything is correct', async () => {
          const user = await createUsers()
          const token = await service.login({ email: user.email, password: '123456789Aa!' })
          const note = await createNote(user.id)
          return await request(app.getHttpServer())
            .get(`/notes/${note.id}`)
            .set('Authorization', `Bearer ${token.token}`)
            .expect(HttpStatus.OK);
        })
      });
      describe('/DELETE ', () => {
        it('401 when token is invalid', async () => {
          const user = await createUsers()
          const note = await createNote(user.id)
          return await request(app.getHttpServer())
            .delete(`/notes/${note.id}`)
            .expect(HttpStatus.UNAUTHORIZED);
        })

        it('403 when note is from another person', async () => {
          const user = await createUsers()
          const user2 = await createUsers()
          const token = await service.login({ email: user.email, password: '123456789Aa!' })
          const note = await createNote(user2.id)
          return await request(app.getHttpServer())
            .delete(`/notes/${note.id}`)
            .set('Authorization', `Bearer ${token.token}`)
            .expect(HttpStatus.FORBIDDEN);
        })
        it('404 when note is not exists', async () => {
          const user = await createUsers()
          const token = await service.login({ email: user.email, password: '123456789Aa!' })
          return await request(app.getHttpServer())
            .delete(`/notes/1`)
            .set('Authorization', `Bearer ${token.token}`)
            .expect(HttpStatus.NOT_FOUND);
        })
        it('200 when everything is correct', async () => {
          const user = await createUsers()
          const token = await service.login({ email: user.email, password: '123456789Aa!' })
          const note = await createNote(user.id)
          return await request(app.getHttpServer())
            .delete(`/notes/${note.id}`)
            .set('Authorization', `Bearer ${token.token}`)
            .expect(HttpStatus.OK);
        })
      });
    });
    describe('/CARDS ', () => {
      describe('/POST ', () => {
        it('400 when Data is wrong', async () => {
          const user = await createUsers()
          const token = await service.login({ email: user.email, password: '123456789Aa!' })
          return await request(app.getHttpServer())
            .post(`/cards`)
            .set('Authorization', `Bearer ${token.token}`)
            .expect(HttpStatus.BAD_REQUEST);
        })
        it('401 when token is invalid', async () => {
          const user = await createUsers()
          return await request(app.getHttpServer())
            .post(`/cards`)
            .send({
              UserId:user.id,
                Title:"titulo",
                Number:123,
                Name:"nome",
                Cvv:1234,
                Date:"22/05",
                Password:"1234",
                Virtual:true,
                Type :"credito"
            })
            .expect(HttpStatus.UNAUTHORIZED);
        })
        it('409 when Title is already exists', async () => {
          const user = await createUsers()
          const token = await service.login({ email: user.email, password: '123456789Aa!' })
          const card = await createCards(user.id)
          return await request(app.getHttpServer())
            .post(`/cards`)
            .set('Authorization', `Bearer ${token.token}`)
            .send({
                Title:card.Title,
                Number:123,
                Name:"nome",
                Cvv:1234,
                Date:"22/05",
                Password:"1234",
                Virtual:true,
                Type :"credito"
            })
            .expect(HttpStatus.CONFLICT);
        })
        it('200 when everything is correct', async () => {
          const user = await createUsers()
          const token = await service.login({ email: user.email, password: '123456789Aa!' })
          return await request(app.getHttpServer())
            .post(`/cards`)
            .set('Authorization', `Bearer ${token.token}`)
            .send({
              UserId:user.id,
                Title:"titulo",
                Number:123,
                Name:"nome",
                Cvv:1234,
                Date:"22/05",
                Password:"1234",
                Virtual:true,
                Type :"credito"
            })
            .expect(HttpStatus.CREATED);
        })
      });
      describe('/GET ', () => {
        it('401 when token is invalid', async () => {
          const user = await createUsers()
          const token = await service.login({ email: user.email, password: '123456789Aa!' })
          const note = await createNote(user.id)
          return await request(app.getHttpServer())
            .get(`/cards/1`)
            .expect(HttpStatus.UNAUTHORIZED);
        })
        it('403 when note is from another person', async () => {
          const user = await createUsers()
          const user2 = await createUsers()
          const token = await service.login({ email: user.email, password: '123456789Aa!' })
          const card = await createCards(user2.id)
          return await request(app.getHttpServer())
            .get(`/cards/${card.id}`)
            .set('Authorization', `Bearer ${token.token}`)
            .expect(HttpStatus.FORBIDDEN);
        })
        it('404 when note is not exists', async () => {
          const user = await createUsers()
          const token = await service.login({ email: user.email, password: '123456789Aa!' })
          return await request(app.getHttpServer())
            .get(`/cards/1`)
            .set('Authorization', `Bearer ${token.token}`)
            .expect(HttpStatus.NOT_FOUND);
        })
        it('200 when everything is correct', async () => {
          const user = await createUsers()
          const token = await service.login({ email: user.email, password: '123456789Aa!' })
          const card = await createCards(user.id)
          return await request(app.getHttpServer())
            .get(`/cards/${card.id}`)
            .set('Authorization', `Bearer ${token.token}`)
            .expect(HttpStatus.OK);
        })   
      });
      describe('/DELETE ', () => {
        it('401 when token is invalid', async () => {
          const user = await createUsers()
          const note = await createNote(user.id)
          return await request(app.getHttpServer())
            .delete(`/cards/${note.id}`)
            .expect(HttpStatus.UNAUTHORIZED);
        })

        it('403 when card is from another person', async () => {
          const user = await createUsers()
          const user2 = await createUsers()
          const token = await service.login({ email: user.email, password: '123456789Aa!' })
          const card = await createCards(user2.id)
          return await request(app.getHttpServer())
            .delete(`/cards/${card.id}`)
            .set('Authorization', `Bearer ${token.token}`)
            .expect(HttpStatus.FORBIDDEN);
        })
        it('404 when card is not exists', async () => {
          const user = await createUsers()
          const token = await service.login({ email: user.email, password: '123456789Aa!' })
          return await request(app.getHttpServer())
            .delete(`/cards/1`)
            .set('Authorization', `Bearer ${token.token}`)
            .expect(HttpStatus.NOT_FOUND);
        })
        it('200 when everything is correct', async () => {
          const user = await createUsers()
          const token = await service.login({ email: user.email, password: '123456789Aa!' })
          const card = await createCards(user.id)
          return await request(app.getHttpServer())
            .delete(`/cards/${card.id}`)
            .set('Authorization', `Bearer ${token.token}`)
            .expect(HttpStatus.OK);
        })
      });
  });
  });
});

