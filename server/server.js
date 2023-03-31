const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {Configuration, OpenAIApi} = require('openai');
require('dotenv').config();
const openaiKey = process.env.openAPIkey
const configuration = new Configuration({
    apiKey: `${openaiKey}`,
});
const openai = new OpenAIApi(configuration);


require('./config/mongoose.config');

const app = express();
const port = 8000;
global.access_token = ''

require('./config/mongoose.config');
app.use(bodyParser.json());
app.use(cors(), express.json(), express.urlencoded({extended: true}));


// -----------------CHATGPT ----------------
app.post('/', async (req, res) =>{
    const messageList = req.body;
    console.log(messageList)
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role:'system', content:'Hello'},
            ...messageList
        ],
    });
    res.json({completion: completion.data.choices[0].message});
});


require('./routes/routes')(app);
const server = app.listen(port, () => console.log(`Listening on port: ${port}`) );


// -------------SOCKETS--------
const io = require('socket.io')(server, {cors: true});

io.on('connection', (socket) =>{
    // console.log(socket.id);

    socket.emit(
        'Congrats! You are the handshake champion of the World!'
    );

    socket.on('chat', (clientInput) =>{
        console.log('the client input is:', clientInput);

        io.emit('post-chat', clientInput);
    });
});

