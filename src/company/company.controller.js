'use strict';

import Company from './company.model.js';

export const saveCompany = async (req, res) => {
    try {
        const { companyName, entityType, businessCategory, impactLevel, yearsOfExperience } = req.body;

        const newCompany = new Company({
            companyName,
            entityType,
            businessCategory,
            impactLevel,
            yearsOfExperience
        });

        await newCompany.save();

        res.status(200).json({
            success: true,
            message: "Empresa registrada correctamente",
            company: newCompany
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al registrar la empresa",
            error: error.message
        });
    }
};

export const getCompanys = async(req, res) => {
    try {
        const { limits = 10, from = 0 } = req.query;

        const query = { status: "true" };

        const [total, companys] = await Promise.all([
            Company.countDocuments(query),
            Company.find(query)
                .skip(Number(from))
                .limit(Number(limits))
        ]);

        return res.status(200).json({
            success: true,
            total,
            companys
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al listar las empresas",
            error: err.message
        });
    }
};

export const getCompanyById = async(req, res) => {
    try{
        const { id } = req.params
        const company = await Company.findById(id)

        if(!company){
            return res.status(404).json({
                success: false,
                message: "Empresa no existe",
                error: err.message
            })
        }

        return res.status(200).json({
            success: true,
            company
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener la empresa",
            error: err.message
        })
    }
}

export const deleteCompany = async (req, res) => {
    try{
        const { id } = req. params

        const company =  await Company.findByIdAndDelete(id, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Empresa Eliminada",
            company
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la Empresa",
            error: err.message
        })
    }
}

export const updateCompany = [
    async (req, res) => {
        const { id } = req.params;
        const { companyName, entityType, businessCategory, impactLevel, yearsOfExperience } = req.body;

        let updateData = {};

        if (companyName) updateData.companyName = companyName;
        if (entityType) updateData.entityType = entityType;
        if (businessCategory) updateData.businessCategory = businessCategory;
        if (impactLevel) updateData.impactLevel = impactLevel;
        if (yearsOfExperience) updateData.yearsOfExperience = yearsOfExperience;

        try {
            const updatedCompany = await Company.findByIdAndUpdate(id, updateData, { new: true });

            if (!updatedCompany) {
                return res.status(404).json({ message: "Empresa no encontrada" });
            }

            return res.status(200).json({
                message: "Empresa actualizada correctamente",
                company: updatedCompany
            });
        } catch (err) {
            return res.status(500).json({
                message: "Error al actualizar la empresa",
                error: err.message
            });
        }
    },
];