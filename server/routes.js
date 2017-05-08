const express = require('express');
const Chats = require('./api/chats');
const Users = require('./api/users');
const routes = express();

routes.get(Chats.GET_CHATS, Chats.getChats);
routes.post(Chats.ADD_CHAT, Chats.addChat);
routes.put(Chats.UPDATE_CHAT, Chats.updateChat);
routes.get(Chats.FIND_CHAT, Chats.findChat);
routes.delete(Chats.REMOVE_CHAT, Chats.removeChat);

routes.get(Users.IS_LOGGED, Users.isLogged);
routes.post(Users.LOGIN, Users.login);
routes.post(Users.LOGOUT, Users.logout);
routes.post(Users.SIGNUP, Users.signup);

module.exports = routes;