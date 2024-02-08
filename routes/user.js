const express = require('express')
const router = express.Router()
const db = require('../data/db')

router.get('/todos/edit/:todoid', async (request,response) => {
  const {todoid} = request.params
  try {
    const [todos,] = await db.execute('SELECT * FROM todos WHERE todoid=?',[todoid])
    response.render("user/todo-edit",{
      title: "todo edit",
      todo: todos[0]
    })
  } catch (error) {
    console.log(error)
  }
})

router.post('/todos/edit/:todoid', async (request,response) => {
  const {category,text} = request.body
  const {todoid} = request.params
  try {
    await db.execute("UPDATE todos SET name=?, category_name=? WHERE todoid=?", [text, category, todoid])
    response.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

router.get('/todos/delete/:todoid',async (request,response) => {
  const {todoid} = request.params
  try {
    const [todos,] = await db.execute('SELECT * FROM todos WHERE todoid=?',[todoid])
    response.render('user/todo-delete',{
      title: "todo delete",
      todo: todos[0]
    }) 
  } catch (error) {
    console.log(error)
  }
})
router.post('/todos/delete/:todoid',async (request,response) => {
  const {todoid} = request.params
  try {
    const [todos,] = await db.execute('DELETE FROM todos WHERE todoid=?',[todoid])
    response.redirect('/')
  } catch (error) {
    console.log(error)
  }
})


router.get('/add-todo', async (request,response) => {
  response.render('user/add-todo',{
    title: 'Add Todo'
  })
})

router.post('/add-todo', async (request,response) => {
  const {category, text} = request.body
  try {
    await db.execute('INSERT INTO todos (name, category_name) VALUES (?, ?)', [text, category])
    response.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

router.get('/', async (request,response) => {
  try {
    const [todos, ] = await db.execute("SELECT todoid,name,is_completed,category_name,DATE_FORMAT(date, '%d.%m.%Y %H:%i') as formated_date FROM todos")
    response.render('user/index',{
      title: 'Home',
      todos: todos,
    })
  } catch (error) {
    console.log(error)
  }
 
})

module.exports = router