const express = require("express");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const userData = require("./model");

const getUser = async (req, res) => {
  const users = await userData.find();

  return res.status(200).json(users);
};

async function handleJson(req, res) {
  const { name } = req.body;

  const payload = {
    context: {
      user: {
        avatar: "https:/gravatar.com/avatar/abc123",
        name: req.body.name,
        email: "nik41041@gmail.com",
      },
    },
    aud: "jitsi",
    iss: "phygital_meet",
    sub: "join-meet.maxicus.com",
    room: "*",
  };
  const token = jwt.sign(payload, process.env.SECRET, { algorithm: "HS256" });
  // console.log(`join-meet.maxicus.com/${req.body.name}?jwt=${token}`)

  const meetingLink = `join-meet.maxicus.com/${req.body.name}?jwt=${token}`;

  if (!name) {
    return res.status(400).json({
      message: "Name is missing",
    });
  }

  // const userExists = await userData.findOne({meetingLink})

  // if (userExists) {
  //   return res.status(404).json({
  //     error: "Oops! Someone has already created an account with these details",
  //   });
  // }

  const user = await userData.create({
    name,
    // token,
    meetingLink,
  });

  if (user) {
    return res.status(201).json({
      _id: user.id,
      name: user.name,
      // token:token,
      meetingLink: meetingLink,
    });
  } else {
    return res.status(400);
  }
}

const deleteUser = async (req, res) => {
  const users = await userData.findByIdAndDelete(req.params.id);

  if (!users) {
    return res.status(400);
  }

  await users.remove();

  res.status(200).json({
    message: "....Deleted",
    id: users.id,
    name: users.name,
  });
};
module.exports = { handleJson, deleteUser, getUser };
