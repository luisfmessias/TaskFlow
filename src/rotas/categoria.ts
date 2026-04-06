import { Router } from 'express'
import { CategoriaComController } from '@root/entidades/categoria/controller.js'
import { autenticar } from '@root/middleware/autentica.js'

const router = Router()

router.use(autenticar)

router.post('/', CategoriaComController.criar)
router.get('/', CategoriaComController.buscarTodos)
router.get('/:id', CategoriaComController.buscarPorId)
router.put('/:id', CategoriaComController.atualizar)
router.delete('/:id', CategoriaComController.deletar)

export default router