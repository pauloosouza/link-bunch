import { createServer, Model, Registry, Response } from 'miragejs';
import { User } from './types';
import { v4 } from 'uuid';
import jwt from 'jwt-encode';
import Schema from 'miragejs/orm/schema';
import { ModelDefinition } from 'miragejs/-types';

const UserModel: ModelDefinition<User> = Model.extend({});

type AppRegistry = Registry<{ users: typeof UserModel }, Record<string, never>>;
type AppSchema = Schema<AppRegistry>;

export function makeServer({ environment = 'test' } = {}) {
  return createServer({
    models: {
      user: UserModel
    },
    seeds(server) {
      server.db.loadData({
        users: [
          {
            id: 'fda8b9af-acb8-4862-866a-7c062a5bbcef',
            name: 'Athos Paulo',
            email: 'athospaulo@gmail.com',
            password: '123456',
            links: []
          }
        ]
      });
    },
    routes() {
      this.namespace = 'api';

      this.post('/login', (schema: AppSchema, request) => {
        const attrs = JSON.parse(request.requestBody);

        const hasUser = schema.db.users.findBy({
          password: attrs.password,
          email: attrs.email
        });

        if (!hasUser)
          return new Response(401, {}, { message: 'Usuário/Senha incorretos' });

        return new Response(
          200,
          {},
          { userId: hasUser.id, accessToken: jwt({ id: hasUser.id }, 'secret') }
        );
      });

      this.get('/users/:id', (schema: AppSchema, request) => {
        const id = request.params.id;
        console.log('id', id);
        const user = schema.db.users.find(id);

        if (!user)
          return new Response(400, {}, { message: 'Usuário não existe' });

        return new Response(200, {}, user);
      });

      this.put('/users/:id/links', (schema: AppSchema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);

        const user = schema.db.users.find(id);

        if (!user)
          return new Response(400, {}, { message: 'Usuário não existe' });

        const response = schema.db.users.update(id, {
          links: Object.entries(attrs.links)
        });
        console.log('response', response);
        return new Response(200, {}, { user });
      });
    }
  });
}
