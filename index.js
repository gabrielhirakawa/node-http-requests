const express = require("express");
const server = express();

const projects = [{ id: 1, titulo: "teste", tasks: [] }];
let contador = 0;

//declarando uso de JSON no express
server.use(express.json());

function contadorReq(req, res, next) {
  contador++;
  console.log("Requisições: ", contador);
  next();
}

function verificaSeIdExiste(req, res, next) {
  if (!projects[req.params.index]) {
    return res.status(400).json({ error: "id inexistente" });
  }
  return next();
}

server.get("/projects", contadorReq, (req, res) => {
  return res.send(projects);
});

server.post("/projects", contadorReq, (req, res) => {
  const { id, titulo } = req.body;
  const tasks = [];
  projects.push({ id, titulo, tasks });
  return res.send(projects);
});

server.post(
  "/projects/:index/tasks",
  contadorReq,
  verificaSeIdExiste,
  (req, res) => {
    const { index } = req.params;
    const { title } = req.body;
    projects[index].tasks.push(title);
    return res.send(projects);
  }
);

server.put("/projects/:index", contadorReq, verificaSeIdExiste, (req, res) => {
  const { index } = req.params;
  const { id, titulo } = req.body;
  const tasks = [];

  projects[index] = { id, titulo, tasks };

  return res.send(projects);
});

server.delete(
  "/projects/:index",
  contadorReq,
  verificaSeIdExiste,
  (req, res) => {
    const { index } = req.params;
    projects.splice(index, 1);
    return res.json(projects);
  }
);

server.listen(9090);
