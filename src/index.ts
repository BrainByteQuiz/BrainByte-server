import express from "express";
import multer, { Multer } from "multer";
import uploadImageController from "./controllers/image/upload";
import deleteImageController from "./controllers/image/delete";
import cors from "cors";
import { env } from "process";
import type { ApiResponse } from "./controllers/types";
import registerUserController from "./controllers/user/register";
import loginUserController from "./controllers/user/login";
import deleteUserController from "./controllers/user/delete";
import readUserController from "./controllers/user/read";
import createQuizController from "./controllers/quiz/create";
import deleteQuizController from "./controllers/quiz/delete";
import readQuizController from "./controllers/quiz/read";
import updateQuizController from "./controllers/quiz/update";

const app = express();
const upload: Multer = multer({ dest: "uploads/" }); // Destination directory for storing files
const port = env.PORT ?? 3000;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post("/register", registerUserController);
app.post("/login", loginUserController);
app.get("/users/:id", readUserController);
app.delete("/users/:id", deleteUserController);

app.post("/image", upload.single("file"), uploadImageController);
app.delete("/image/:id", deleteImageController);
app.use("/uploads", express.static("uploads"));

app.post("/quiz/create", createQuizController);
app.delete("/quiz/delete/:id", deleteQuizController);
app.get("/quiz/:id/:creatorId", readQuizController);
app.get("/quiz/:creatorId", readQuizController);
app.post("/quiz/update", updateQuizController);

app.use((_req, res) => {
    const response: ApiResponse<{}> = {
        status: "failure",
        data: {},
        error: "No matching endpoint was found.",
    };

    return res.status(404).send(response);
});

if (env.NODE_ENV !== "test") {
    app.listen(port, () => {
        console.log(
            `[${new Date().toISOString()}] RESTful API listening on port ${port}`
        );
    });
}

export default app;
