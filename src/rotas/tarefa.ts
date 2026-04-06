import { Router } from 'express'
import { TarefaController } from '@root/entidades/tarefa/controller.js'
import { autenticar } from '@root/middleware/autentica.js'

const router = Router()

router.use(autenticar)

router.post('/', TarefaController.criar)
router.get('/', TarefaController.buscarTodos)
router.get('/:id', TarefaController.buscarPorId)
router.put('/:id', TarefaController.atualizar)
router.patch('/:id/status', TarefaController.atualizarStatus)
router.delete('/:id', TarefaController.deletar)

export default router