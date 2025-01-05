import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import validationErrorParser from "src/util/validationErrorParser";
import UserModel from "src/models/user";
import createHttpError from "http-errors";

export const createUser: RequestHandler = async (req, res, next) => {
  // extract any errors that were found by the validator
  const errors = validationResult(req);
  const { name, profilePictureURL } = req.body;

  try {
    // if there are errors, then this function throws an exception
    validationErrorParser(errors);

    const user = await UserModel.create({
      name: name,
      profilePictureURL: profilePictureURL,
    });

    // 201 means a new resource has been created successfully
    // the newly created task is sent back to the user
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getTask: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    // if the ID doesn't exist, then findById returns null
    const task = await UserModel.findById(id);

    if (task === null) {
      throw createHttpError(404, "Task not found.");
    }

    // Set the status code (200) and body (the task object as JSON) of the response.
    // Note that you don't need to return anything, but you can still use a return
    // statement to exit the function early.
    res.status(200).json(task);
  } catch (error) {
    // pass errors to the error handler
    next(error);
  }
};
