const express = require('express');
const pollRoutes = express.Router();
const {CREATE_POLL, VIEW_POLL, USERS_POLL} = require('../../../utils/config/app-constants').ROUTES.POLL;
const pollController = require('../controllers/poll');
const auth = require('../../../utils/middlewares/token')

pollRoutes.post(CREATE_POLL, auth, pollController.createPoll);
pollRoutes.get(VIEW_POLL, pollController.viewPoll);

pollRoutes.get(USERS_POLL, auth, pollController.userPolls);
pollRoutes.route('/');

pollRoutes
.route('/:id')
.get(pollController.getPoll)
.post(auth, pollController.vote)
.delete(auth, pollController.deletePoll);

module.exports = pollRoutes; 