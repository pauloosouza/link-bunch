import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  }),
);

mongoose.connect(
  'mongodb+srv://devadmin:TipiuzIHxSMmDFmx@cluster0.vhtjier.mongodb.net/link-bunch?retryWrites=true&w=majority'
);

const linksSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  links: [
    linksSchema
  ]
});

const User = mongoose.model('User', userSchema);

app.post('/login', async (req, res) => {
  try {
    const body = req.body;

    const hasUser = await User.findOne({
      password: body.password,
      email: body.email
    });

    if (!hasUser)
      return res.status(401).json({ message: 'Usuário/Senha incorretos' });

    res.json({
      userId: hasUser.id,
      accessToken: jwt.sign({ id: hasUser.id }, 'secret')
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const attrs = req.body;
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) return res.sendStatus(400).json({ message: 'Usuário não existe' });

    user.links = attrs.links;

    await user.save();

    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/users', async (req, res) => {
  try {
    const body = req.body;

    const hasUserWithThisEmail = await User.findOne({ email: body.email })

    if(hasUserWithThisEmail)
      return res.status(401).json({ message: 'Já existe um usuário com este e-mail' });

    const user = await User.create({
      name: body.name,
      password: body.password,
      email: body.email
    });

    res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) res.sendStatus(400).json({ message: 'Usuário não existe' });

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});



app.listen(3001,() => console.log('Server running on port 3001'));
