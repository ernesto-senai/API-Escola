const express = require("express");
const app = express();

app.use(express.json());

const alunos = [
  {
    id: 1,
    nome: "Gabriel Bento",
    email: "Gabriel@gmail.com",
  },
  {
    id: 2,
    nome: "Samuel Santos",
    email: "Samuel@gmail.com",
  },
  {
    id: 3,
    nome: "Breno Amaral",
    email: "Breno@gmail.com",
  },
];

const professores = [
  {
    id: 1,
    nome: "Carlos",
    disciplina: "História",
    anoContratacao: 2025,
  },
  {
    id: 2,
    nome: "Raul",
    disciplina: "Geografia",
    anoContratacao: 2026,
  },
];

app.get("/", function (req, res) {
  res.send("Hello world!, você conseguiu!");
});

// Filtrar por nome e ano de contratação
app.get("/alunos", function (req, res) {
  const nome = req.query.nome;

  if (!nome) {
    return res.json(alunos);
  }

  const alunosFiltrados = alunos.filter((a) =>
    a.nome.toLowerCase().includes(nome.toLowerCase()),
  );

  res.json(alunosFiltrados);
});

app.get("/professores", function (req, res) {
  const anoContratacao = parseInt(req.query.anoContratacao);

  if (!anoContratacao) {
    return res.json(professores);
  }

  const professoresFiltrados = professores.filter(
    (a) => a.anoContratacao == anoContratacao,
  );

  res.json(professoresFiltrados);
});

// Verificação alunos e professores
app.post("/alunos", function (req, res) {
  const nomeQueVeioDoCliente = req.body.nome;
  const emailQueVeioDoCliente = req.body.email;

  if (!nomeQueVeioDoCliente || !emailQueVeioDoCliente) {
    return res.status(400).json({ erro: "Nome e e-mail são obrigatorios!" });
  }

  const novoAluno = {
    id: 4,
    nome: nomeQueVeioDoCliente,
    email: emailQueVeioDoCliente,
  };
  alunos.push(novoAluno);

  res.status(201).send();
});

app.post("/professores", function (req, res) {
  const nomeQueVeioDoCliente = req.body.nome;
  const disciplinaQueVeioDoCliente = req.body.disciplina;
  const anoContratacaoQueVeioDoCliente = req.body.anoContratacao;

  if (
    !nomeQueVeioDoCliente ||
    !disciplinaQueVeioDoCliente ||
    !anoContratacaoQueVeioDoCliente
  ) {
    return res.status(400).json({
      erro: "Nome, disciplina e ano de contratação são obrigatórios!",
    });
  }

  const novoProfessor = {
    id: 3,
    nome: nomeQueVeioDoCliente,
    disciplina: disciplinaQueVeioDoCliente,
    anoContratacao: anoContratacaoQueVeioDoCliente,
  };
  professores.push(novoProfessor);

  res.status(201).send();
});

// Procurar por ID
app.get("/alunos/:id", function (req, res) {
  const id = parseInt(req.params.id);

  const aluno = alunos.find((a) => a.id == id);

  if (aluno) {
    return res.json(aluno);
  } else {
    return res.status(404).json("Aluno não encontrado");
  }
});

app.get("/professores/:id", function (req, res) {
  const id = parseInt(req.params.id);

  const professor = professores.find((a) => a.id == id);

  if (professor) {
    return res.json(professor);
  } else {
    return res.status(404).json("Professor não encontrado");
  }
});

// Procurar por anoContratação
app.get("/professores/:anoContratacao", function (req, res) {
  const anoContratacao = parseInt(req.params.anoContratacao);

  const professor = professores.find((a) => a.anoContratacao == anoContratacao);

  if (professor) {
    return res.json(professor);
  }
});

// Verificar se aluno e professor existe
app.put("/alunos/:id", function (req, res) {
  const id = parseInt(req.params.id);
  // const nome = req.body.nome
  // const email = req.body.email

  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ erro: "Nome e e-mail são obrigatórios!" });
  }

  const indexDoAluno = alunos.findIndex((a) => a.id == id);

  if (indexDoAluno === -1) {
    return res.status(404).json("Aluno não encontrado");
  }

  alunos[indexDoAluno].nome = nome;
  alunos[indexDoAluno].email = email;

  return res.json(alunos[indexDoAluno]);
});

app.put("/professores/:id", function (req, res) {
  const id = parseInt(req.params.id);

  const { nome, disciplina, anoContratacao } = req.body;

  if (!nome || !disciplina || !anoContratacao) {
    return res
      .status(400)
      .json({ erro: "Nome, disciplina e ano de contratação são obrigatórios" });
  }

  const indexDoProfessor = professores.findIndex((a) => a.id == id);

  if (indexDoProfessor === -1) {
    return res.status(404).json("Professor não encontrado");
  }

  professores[indexDoProfessor].nome = nome;
  professores[indexDoProfessor].disciplina = disciplina;
  professores[indexDoProfessor].anoContratacao = anoContratacao;

  return res.json(professores[indexDoProfessor]);
});

// Deletar aluno ou professor por ID
app.delete("/alunos/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const index = alunos.findIndex((a) => a.id == id);

  if (index === -1) {
    return res.status(404).json("Aluno não encontrado");
  }

  const alunoRemovido = alunos.splice(index, 1);

  return res.status(204).json("Aluno removido com sucesso!");
});

app.delete("/professores/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const index = professores.findIndex((a) => a.id == id);

  if (index === -1) {
    return res.status(404).json("Professor não encontrado");
  }

  const professorRemovido = professores.splice(index, 1);

  return res.status(204).json("Professor removido com sucesso!");
});

// Editar aluno ou professor
app.put("/professores/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const index = professores.findIndex((a) => a.id == id);

  if (index === -1) {
    return res.status(404).json("Professor não encontrado");
  }

  const nome = req.body.nome;
  const disciplina = req.body.disciplina;
  const anoContratacao = req.body.anoContratacao;

  professores[indexDoProfessor].nome = nome;
  professores[indexDoProfessor].disciplina = disciplina;
  professores[indexDoProfessor].anoContratacao = anoContratacao;

  return res.status(200).json(professores[indexDoProfessor]);
});

// Servidor
app.listen(3000, function () {
  console.log("Servidor rodando na porta 3000!");
});
