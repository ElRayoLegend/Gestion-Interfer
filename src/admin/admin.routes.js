import { Router } from "express"
import { getAdminById, getAdmins, deleteAdmin, updatePassword, updateAdmin, updateProfilePicture } from "./admin.controller.js"
import { getAdminByIdValidator, deleteAdminValidator, updatePasswordValidator, updateAdminValidator, updateProfilePictureValidator } from "../middlewares/admin-validators.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"

const router = Router()

router.get("/findAdmin/:aid", getAdminByIdValidator, getAdminById)

router.get("/", getAdmins)

router.delete("/deleteAdmin/:aid", deleteAdminValidator, deleteAdmin)

router.patch("/updatePassword/:aid", updatePasswordValidator, updatePassword)

router.put("/updateAdmin/:aid", updateAdminValidator, updateAdmin)

router.patch("/updateProfilePicture/:aid", uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator, updateProfilePicture)

export default router
