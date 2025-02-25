import { Router } from "express";
import { saveCompany, getCompanys, getCompanyById, updateCompany, generateReport } from "./company.controller.js";
import { createCompanyValidator, getCompanyByIdValidator, updateCompanyValidator, getCompanyValidator } from "../middlewares/company-validators.js";

const router = Router();

router.post("/addCompany", createCompanyValidator, saveCompany);

router.get("/findCompany/:id", getCompanyByIdValidator, getCompanyById);

router.get("/getCompanys", getCompanyValidator, getCompanys);

router.put("/updateCompany/:id", updateCompanyValidator, updateCompany);

router.get("/generateReport", generateReport);

export default router;