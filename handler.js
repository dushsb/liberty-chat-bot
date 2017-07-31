'use strict';

const dispatch = require('./dispatch');

module.exports.intents = (event, context, callback) => {
  try {
    // By default, treat the user request as coming from the America/New_York time zone.
    process.env.TZ = 'America/New_York';
    console.log(`event.bot.name=${event.bot.name}`);

    if (event.bot.name !== 'LibertyChatBot') {
     callback('Invalid Bot Name');
    }

    dispatch(event, (response) => callback(null, response));
  } catch (err) {
    callback(err);
  }
};
