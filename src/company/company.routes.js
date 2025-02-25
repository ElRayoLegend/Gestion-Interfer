import { Router } from "express";
import { saveCompany, getCompanys, getCompanyById, deleteCompany, updateCompany } from "./company.controller.js";
import { createCompanyValidator, getCompanyByIdValidator, updateCompanyValidator, deleteCompanyValidator, getCompanyValidator } from "../middlewares/company-validators.js";

const router = Router();

router.post("/addCompany", createCompanyValidator, saveCompany);

router.get("/findCompany/:id", getCompanyByIdValidator, getCompanyById);

router.get("/getCompanys", getCompanyValidator, getCompanys);

router.put("/updateCompany/:id", updateCompanyValidator, updateCompany);

router.delete("/deleteCompany/:id", deleteCompanyValidator, deleteCompany);

export default router;