import {Router} from "express";
import {CityController} from "../../controllers/AdressControllers/CityController";
import {onlyAdmin} from "../../middlewares";
import {addressRouter} from "./addresses.routes";

export const cityRouter = Router();
addressRouter.use(...onlyAdmin());

cityRouter.post("/add", async (req, res) => {
    await CityController.addCity(req, res);
});

cityRouter.get("/get", async (req, res) => {
    await CityController.getCities(req, res);
});

cityRouter.put("/update", async (req, res) => {
    await CityController.updateCity(req, res);
});

cityRouter.delete("/delete/:id", async (req, res) => {
    await CityController.deleteCity(req, res);
});