import { Router } from 'express'
import { UsuarioController } from '@root/entidades/usuario/controller.js'
import { autenticar } from '@root/middleware/autentica.js'

const router = Router()

router.post('/', UsuarioController.cadastrar)
router.post('/login', UsuarioController.login)
router.get('/', autenticar, UsuarioController.buscarTodos)
router.get('/:id', autenticar, UsuarioController.buscarPorId)
router.put('/:id', autenticar, UsuarioController.atualizar)
router.delete('/:id', autenticar, UsuarioController.deletar)

export default router