const path = require('path');
require('dotenv').config({path:path.resolve(__dirname,'../../.env')});
module.exports={
    PORT:   process.env.PORT_SERVER || 3000,
    USERNAME_TMI:   process.env.USERNAME_TMI,
    PASSWORD_TMI:   process.env.PASSWORD_TMI,
    CHANNELS_TMI:   process.env.CHANNELS_TMI
}