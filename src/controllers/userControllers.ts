import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  try {
    return res.json({ user: "Pokedex" }); //! Retorno el usuario
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
