import db from './db';
import Cors from 'cors';

// Inicializa o middleware CORS
const cors = Cors({
  origin: '*', // Permitir todas as origens
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

// Função para rodar o CORS como middleware
const runMiddleware = (req, res, fn) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result) => (result instanceof Error ? reject(result) : resolve(result)));
  });

// Função para lidar com as requisições
export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method === 'GET') {
    // Buscar todos os alunos
    db.query('SELECT * FROM alunos', (err, _results) => {  // Ignorando _results
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar alunos' });
      }
      res.status(200).json(_results);
    });
  }

  if (req.method === 'POST') {
    // Criar um novo aluno
    const { nome, turma } = req.body;
    db.query('INSERT INTO alunos (nome, turma) VALUES (?, ?)', [nome, turma], (err, _results) => {  // Ignorando _results
      if (err) {
        return res.status(500).json({ error: 'Erro ao cadastrar aluno' });
      }
      res.status(201).json({ id: _results.insertId, nome, turma });
    });
  }

  if (req.method === 'PUT') {
    // Editar um aluno existente
    const { id, nome, turma } = req.body;
    db.query('UPDATE alunos SET nome = ?, turma = ? WHERE id = ?', [nome, turma, id], (err, _results) => {  // Ignorando _results
      if (err) {
        return res.status(500).json({ error: 'Erro ao atualizar aluno' });
      }
      res.status(200).json({ id, nome, turma });
    });
  }

  if (req.method === 'DELETE') {
    // Deletar um aluno
    const { id } = req.query;
    db.query('DELETE FROM alunos WHERE id = ?', [id], (err, _results) => {  // Ignorando _results
      if (err) {
        return res.status(500).json({ error: 'Erro ao deletar aluno' });
      }
      res.status(200).json({ message: `Aluno com id ${id} deletado com sucesso.` });
    });
  }
}
